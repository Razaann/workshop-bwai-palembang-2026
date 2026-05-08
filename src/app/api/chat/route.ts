import { NextRequest, NextResponse } from 'next/server';

const GROQ_MODELS: Record<string, string> = {
  groq_120: 'openai/gpt-oss-120b',
  groq_20: 'openai/gpt-oss-20b',
  llama4: 'meta-llama/llama-4-scout-17b-16e-instruct',
  llama33: 'llama-3.3-70b-versatile',
  llama_8b: 'llama-3.1-8b-instant',
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  try {
    const { model, messages, systemMessage, knowledgeBase, webSearchEnabled, ollamaModel } = await req.json() as {
      model: string;
      messages: ChatMessage[];
      systemMessage: string;
      knowledgeBase: string;
      webSearchEnabled: boolean;
      ollamaModel?: string;
    };

    // Build system prompt — inject KB if present
    let sysPrompt = systemMessage || 'You are a helpful AI assistant for the Build With AI Palembang 2026 workshop.';
    if (knowledgeBase) {
      sysPrompt += `\n\n[KNOWLEDGE BASE - use this to answer relevant questions]\n${knowledgeBase}\n[END KNOWLEDGE BASE]`;
    }

    // Perform Serper web search if toggled on
    let searchResultsText = '';
    if (webSearchEnabled && process.env.SERPER_API_KEY) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
      const query = lastUserMsg?.content ?? '';
      if (query) {
        try {
          searchResultsText = await callSerper(query);
          sysPrompt += `\n\n${searchResultsText}`;
        } catch {
          // Search failed — continue without it
          searchResultsText = '';
        }
      }
    }

    // Limit to last 5 turns (10 messages) for memory
    const ctx = messages.slice(-10);

    let reply = '';

    if (model === 'gemini') {
      reply = await callGemini(sysPrompt, ctx, 'gemini-3-flash-preview');
    } else if (model === 'gemma_4_31b') {
      reply = await callGemini(sysPrompt, ctx, 'gemma-4-31b-it');
    } else if (model === 'ollama') {
      reply = await callOllama(sysPrompt, ctx, ollamaModel ?? 'llama3.2');
    } else {
      reply = await callGroq(sysPrompt, ctx, GROQ_MODELS[model] ?? 'llama-3.3-70b-versatile');
    }

    return NextResponse.json({ reply, searchPerformed: !!searchResultsText });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ── Serper ────────────────────────────────────────────────────────────────────
async function callSerper(query: string): Promise<string> {
  const key = process.env.SERPER_API_KEY;
  if (!key) throw new Error('SERPER_API_KEY not set');

  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': key,
    },
    body: JSON.stringify({ q: query, num: 5, gl: 'id', hl: 'id' }),
  });

  if (!res.ok) throw new Error(`Serper error: ${res.status}`);

  const data = await res.json();

  type SerperResult = { title?: string; snippet?: string; link?: string };
  const results: SerperResult[] = data.organic ?? [];

  if (results.length === 0) return '';

  const lines = results.slice(0, 5).map((r, i) =>
    `${i + 1}. ${r.title ?? 'No title'}\n   ${r.snippet ?? ''}\n   ${r.link ?? ''}`
  );

  return [
    `[WEB SEARCH RESULTS for: "${query}"]`,
    ...lines,
    `[END WEB SEARCH — prioritize these results when answering the user's question. Today's date context is provided by this search.]`,
  ].join('\n');
}

// ── Gemini ────────────────────────────────────────────────────────────────────
async function callGemini(systemPrompt: string, messages: ChatMessage[], modelName = 'gemini-3-flash-preview') {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not set');

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message ?? 'Gemini API error');
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '(no response)';
}

// ── Groq ──────────────────────────────────────────────────────────────────────
async function callGroq(systemPrompt: string, messages: ChatMessage[], modelId: string) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('GROQ_API_KEY not set');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message ?? 'Groq API error');
  return data.choices?.[0]?.message?.content ?? '(no response)';
}

// ── Ollama ────────────────────────────────────────────────────────────────────
async function callOllama(systemPrompt: string, messages: ChatMessage[], modelName: string) {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: modelName,
      stream: false,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? 'Ollama error');
  return data.message?.content ?? '(no response)';
}
