import { NextResponse } from 'next/server';

// Patterns that identify embedding / non-chat models — filter these out
const EMBEDDING_PATTERNS = [
  'embedding', 'embed', 'mpnet', 'paraphrase',
  'e5-', 'bge-', 'nomic-embed', 'minilm',
];

function isEmbeddingModel(name: string): boolean {
  const lower = name.toLowerCase();
  return EMBEDDING_PATTERNS.some(p => lower.includes(p));
}

// Pings Ollama at localhost:11434, returns all CHAT models (embedding models filtered out)
export async function GET() {
  try {
    const res = await fetch('http://localhost:11434/api/tags', {
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) {
      return NextResponse.json({ available: false, model: null, models: [] });
    }

    const data = await res.json() as { models?: { name: string }[] };
    const allModels = data.models ?? [];

    // Only keep chat-capable models
    const chatModels = allModels
      .map(m => m.name)
      .filter(name => !isEmbeddingModel(name));

    if (chatModels.length === 0) {
      return NextResponse.json({ available: true, model: null, models: [], noModels: true });
    }

    return NextResponse.json({
      available: true,
      model:  chatModels[0],   // first chat model as default
      models: chatModels,       // full list for the dropdown
    });

  } catch {
    return NextResponse.json({ available: false, model: null, models: [] });
  }
}
