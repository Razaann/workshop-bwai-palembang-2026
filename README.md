# Workshop Build with AI Palembang 2026

> *"Building Intelligence: Integrating LLM APIs into Modern Web Systems"*

![Workshop Banner](Docs/banner.jpg)

Proyek ini adalah repository untuk workshop **Build with AI Palembang 2026** — sebuah sesi hands-on yang dirancang untuk mengajak developer, mahasiswa, dan profesional teknologi untuk membangun aplikasi AI berbasis web secara langsung dari nol, menggunakan teknologi modern seperti **Next.js**, **Google Gemini API**, **Groq**, dan **Ollama**.

Di workshop ini, kita akan membangun sebuah **AI Quest Dashboard** — antarmuka bergaya 8-bit yang berfungsi sebagai chatbot berbasis LLM dengan fitur RAG (Retrieval Augmented Generation) dan Web Intelligence melalui Serper API.

---

## Video Playlist

Versi video dari seluruh modul bisa diakses di playlist YouTube berikut:

> **[COMING SOON!]**

---

##  Workshop Documentation Video

- [Full Workshop Documentation Video](#) — **COMING SOON!**

---

## Daftar Modul

Workshop ini terdiri dari 5 modul yang bersifat **step-by-step dan berkelanjutan**:

| Modul | Judul | Deskripsi Singkat |
|-------|-------|-------------------|
| [Module 0](Module/Module%200/Module%200%20-%20Environment.md) | System Requirements & API Provisioning | Setup environment, install tools, dan dapatkan API Key |
| [Module 1](Module/Module%201/Module%201%20-%20Quickstart.md) | Inference Pipeline: Chat Completion Interface | Tambahkan API Key ke project dan jalankan chatbot pertamamu |
| [Module 2](Module/Module%202/Module%202%20-%20Knowledge%20Augmentation.md) | Grounding Context: Document-Based RAG | Berikan "memori" ke LLM dengan knowledge base dari file CSV |
| [Module 3](Module/Module%203/Module%203%20-%20Web%20Intelligence.md) | Agentic Workflows: Dynamic Search via Tool Calling | Beri kemampuan LLM untuk mencari informasi dari internet |
| [Module 4](Module/Module%204/Module%204%20-%20Production.md) | Deployment & Edge Scaling | Deploy aplikasimu ke Vercel agar bisa diakses publik |

---

## Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| **Next.js 16 (App Router)** | Framework utama — Frontend + Backend API Routes |
| **Google Gemini API** | Model LLM utama (via AI Studio) |
| **Groq Cloud** | Alternatif model LLM open-source (LLaMA, GPT-OSS) |
| **Ollama** | Menjalankan LLM secara lokal |
| **Serper.dev** | Web search API untuk fitur agentic |
| **Vercel** | Platform deployment |
| **TypeScript** | Bahasa pemrograman utama |

---

## Prerequisites

Sebelum mengikuti workshop ini, pastikan kamu sudah menyiapkan hal-hal berikut:

- **[Node.js v18+](https://nodejs.org/)** — Runtime JavaScript. Download sesuai OS kamu.
- **npm** — Sudah termasuk saat install Node.js.
- **[Git](https://git-scm.com/)** — Untuk clone repository.
- **[VS Code](https://code.visualstudio.com/)** *(direkomendasikan)* — Text editor dengan dukungan TypeScript terbaik.
- **Koneksi internet** — Diperlukan untuk memanggil API eksternal.

**Opsional (untuk fitur lanjutan):**
- **[Ollama](https://ollama.com/)** — Untuk menjalankan LLM lokal.

Cek apakah Node.js dan npm sudah terinstall dengan benar:
```bash
node --version
npm --version
```
Kamu seharusnya melihat output versi, contoh: `v20.11.0` dan `10.2.4`.

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Bayhaqieee/workshop-bwai-palembang-2026.git
cd workshop-bwai-palembang-2026
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Salin file template `.env.local`:
```bash
cp .env.local.example .env.local
```

Kemudian isi file `.env.local` dengan API key kamu:
```env
GEMINI_API_KEY=isi_dengan_api_key_kamu
GROQ_API_KEY=isi_dengan_api_key_kamu
SERPER_API_KEY=isi_dengan_api_key_kamu

# Opsional: Aktifkan Secret Login Gate
ADMIN_USERNAME=admin
ADMIN_PASSWORD=rahasia
```

> Cara mendapatkan masing-masing API key dijelaskan secara detail di [Module 0](Module/Module%200/Module%200%20-%20Environment.md).

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: **http://localhost:3000**

---

## Struktur Project

```
workshop-bwai-palembang-2026/
├── public/
│   ├── knowledge/          ← File CSV permanent knowledge base (taruh di sini)
│   │   └── workshop_context.csv
│   ├── ampera_background.png
│   └── hero_*.png          ← Sprite karakter
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/       ← API route LLM (Gemini, Groq, Ollama)
│   │   │   └── knowledge/  ← API route baca file permanent KB
│   │   ├── chat/           ← Halaman chatbot
│   │   ├── about/          ← Halaman Player Stats
│   │   ├── globals.css     ← Design system AAP-64
│   │   └── page.tsx        ← Mission Dashboard
│   ├── components/
│   │   ├── Navigation.tsx  ← Sidebar navigasi
│   │   ├── QuestContainer.tsx
│   │   └── AchievementToast.tsx
│   └── context/
│       └── QuestContext.tsx ← State management quest & achievement
├── Module/                 ← Dokumentasi modul workshop
│   ├── Module 0/
│   ├── Module 1/
│   ├── Module 2/
│   ├── Module 3/
│   └── Module 4/
├── .env.local              ← API keys (jangan di-commit!)
└── .env.local.example      ← Template environment variables
```

---

## Fitur Aplikasi

Aplikasi **AI Quest Dashboard** yang dibangun di workshop ini memiliki fitur:

- **Mission Dashboard** — Progress tracker berbentuk quest board ala RPG
- **Chatbot** — Interaksi langsung dengan model LLM pilihan
- **Multi-Model Selector** — Switch antara Gemini, Groq, dan Ollama dengan dropdown list model spesifik
- **Ollama Auto-Detection** — Otomatis mendeteksi dan menggunakan model lokal yang sudah terinstall di komputermu
- **Permanent Inventory** — Knowledge base hardcoded dari folder `/public/knowledge/`
- **File Upload** — Upload file CSV/TXT langsung ke sesi chat
- **RAG Mode** — Otomatis aktif saat file knowledge base dihubungkan
- **Web Intelligence** — Pencarian internet real-time via Serper API
- **System Prompt Editor** — Kustomisasi persona dan instruksi model
- **Achievement System** — Pop-up notifikasi saat quest diselesaikan
- **Player Stats & Reset Progress** — Halaman profil karakter dengan fitur reset *"Danger Zone"* untuk menghapus progress workshop
- **Secret Login Gate** — Fitur misteri ("NONE SHALL PASS") yang akan mengunci aplikasi jika kredensial admin diisi di `.env.local`

---

## Alur Belajar (Learning Path)

```
Module 0         Module 1         Module 2         Module 3         Module 4
   │                │                │                │                │
Setup &          Tambah API       Upload File      Aktifkan         Deploy ke
Install   ──►   Key & Run   ──►  Knowledge   ──►  Web Search  ──►  Vercel
                 Chatbot          Base (RAG)       (Serper)
```

Setiap modul dirancang untuk **diselesaikan dalam 15–30 menit**. Kamu bisa ikut secara berurutan atau langsung lompat ke modul tertentu jika sudah familiar dengan prerequisite-nya.

---

## Slide Presentasi

> **[Slide](https://bit.ly/adit-bwai-palembang-2026)**

---

## Questions / Issues

Kalau ada pertanyaan atau kendala selama workshop, kamu bisa:
- Submit `Issue` di repository ini
- Tanya langsung ke instruktur saat sesi berlangsung
- Hubungi via email: **adityabayhaqie@gmail.com**

---

## License

Repository ini bersifat **free dan public**. Feel free untuk di-clone, di-fork, atau dijadikan referensi belajar.

---

## Contribution

Kalau kamu menemukan typo, bug pada instruksi, atau ingin menambahkan konten baru — silakan fork repo ini dan buat pull request. Jika repo ini bermanfaat, jangan lupa kasih ⭐ di GitHub biar makin banyak yang bisa belajar bareng! 😊
