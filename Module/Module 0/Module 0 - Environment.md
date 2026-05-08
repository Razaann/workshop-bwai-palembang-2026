# Module 0: System Requirements & API Provisioning

> **Tujuan Modul:** Memastikan semua peserta memiliki environment yang siap pakai — Node.js, npm, text editor, dan API Key yang diperlukan untuk menjalankan aplikasi workshop.

---

## Prerequisites

Sebelum memulai, pastikan kamu sudah memiliki:

| Tools | Versi Minimum | Keterangan |
|-------|--------------|------------|
| **Node.js** | v18.0+ | Runtime JavaScript |
| **npm** | v8.0+ | Package manager (sudah termasuk di Node.js) |
| **Git** | Terbaru | Untuk clone repository |
| **VS Code** | Terbaru | Text editor (direkomendasikan) |

Cek versi yang terinstall di terminal:
```bash
node --version
npm --version
git --version
```

> **Tip:** Jika Node.js belum terinstall, download dari [https://nodejs.org](https://nodejs.org) dan pilih versi **LTS**.

---

## Mendapatkan API Keys

Workshop ini membutuhkan 1 API key dan 2 optional keys. Ikuti langkah-langkah berikut untuk mendapatkannya.

---

### Google AI Studio (Gemini API Key)

Google AI Studio adalah platform untuk mendapatkan akses ke Gemini — model LLM utama yang kita gunakan di workshop ini.

**Langkah-langkah:**

1. Buka [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Login dengan akun Google kamu
3. Klik tombol **"Create API Key"**
4. Pilih project Google Cloud (atau buat baru)
5. Salin API key yang dihasilkan — simpan di tempat yang aman!

> **Penting:** Jangan pernah share API key kamu secara publik atau commit ke repository.

**Versi videonya bisa kamu lihat / klik pada thumbnail berikut:**

[![Module 0a: Cara Membuat API Key di Google Studio](COMING_SOON)](COMING_SOON)

![Google AI Studio Dashboard](images/aistudio-dashboard.png)

![Google AI Studio - API Key](images/aistudio-apikey.png)

**Isi di `.env.local`:**
```env
GEMINI_API_KEY=AIza...............
```

---

### Groq Cloud (Groq API Key)

Groq adalah platform inferensi LLM yang sangat cepat, mendukung model open-source seperti LLaMA dan GPT-OSS. Ini digunakan sebagai **alternatif model** di aplikasi kita.

**Langkah-langkah:**

1. Buka [https://console.groq.com](https://console.groq.com)
2. Daftar akun baru atau login jika sudah punya
3. Pergi ke menu **"API Keys"** di sidebar kiri
4. Klik **"Create API Key"**, beri nama (contoh: `bwai-palembang`)
5. Salin API key — ini hanya ditampilkan **satu kali**, jadi pastikan tersimpan!

**Versi videonya bisa kamu lihat / klik pada thumbnail berikut:**

[![Module 0b: Cara Membuat API Key di Groq](COMING_SOON)](COMING_SOON)

![Groq Login Page](images/groq-loginpage.png)

![Groq Dashboard](images/groq-dashboard.png)

![Groq API Key](images/groq-apikey.png)

**Isi di `.env.local`:**
```env
GROQ_API_KEY=gsk_...............
```

**Model yang tersedia (sudah dikonfigurasi di aplikasi):**

| ID di Aplikasi | Model Groq | Keterangan |
|---|---|---|
| GPT-OSS 120B | `openai/gpt-oss-120b` | Model terbesar |
| GPT-OSS 20B | `openai/gpt-oss-20b` | Lebih cepat |
| Llama 4 Scout | `meta-llama/llama-4-scout-17b-16e-instruct` | LLaMA generasi terbaru |
| Llama 3.3 70B | `llama-3.3-70b-versatile` | Sangat capable |
| Llama 3.1 8B | `llama-3.1-8b-instant` | Paling cepat, ringan |

---

### Ollama (Local LLM — Opsional)

Ollama memungkinkan kamu menjalankan LLM secara **lokal di komputermu sendiri**, tanpa membutuhkan koneksi internet atau API key. Ini adalah opsi **opsional** tapi menarik untuk dipelajari.

**Langkah-langkah Install:**

1. Download installer Ollama di [https://ollama.com/download](https://ollama.com/download)
2. Pilih sesuai OS kamu (Windows / macOS / Linux) dan install
3. Buka terminal, jalankan model:
```bash
ollama run llama3.2
```
4. Ollama akan otomatis berjalan di `http://localhost:11434`

Cek apakah Ollama berjalan dengan benar:
```bash
curl http://localhost:11434
# Output yang diharapkan: "Ollama is running"
```

**Versi videonya bisa kamu lihat / klik pada thumbnail berikut:**

[![Module 0c: Cara Instalasi Ollama](https://i.ytimg.com/an_webp/zKmb3QrWoJ4/mqdefault_6s.webp?du=3000&sqp=CO6X8s8G&rs=AOn4CLBigYHWOH5yP3y1JHzpq0leV5cfeQ)](https://youtu.be/zKmb3QrWoJ4?si=mmJtFJ1GfebbVauA)

Untuk Video diatas saya provide dari source luar karena kebetulan saya sudah instalasi di local device saya, tapi arahannya sama persis dengan yang akan kita pelajari hari ini.

![Ollama Main Page](images/ollama-mainpage.png)

![Ollama Download Page](images/ollama-downloadpage.png)

> Ollama **tidak memerlukan API key** — cukup pastikan service-nya berjalan di background saat kamu menggunakan aplikasi.

---

### Serper.dev (Web Search API — Opsional untuk Module 3)

Serper digunakan di **Module 3** untuk memberikan kemampuan mencari internet kepada LLM. Kamu bisa skip ini dulu dan kembali saat modul 3.

**Langkah-langkah:**

1. Buka [https://serper.dev](https://serper.dev)
2. Daftar akun gratis (tersedia 2.500 pencarian gratis per bulan)
3. Di dashboard, pergi ke **"API Key"**
4. Salin API key yang tersedia

**Isi di `.env.local`:**
```env
SERPER_API_KEY=...............
```