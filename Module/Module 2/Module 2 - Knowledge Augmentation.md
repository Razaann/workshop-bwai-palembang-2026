# Module 2: Grounding Context — Document-Based RAG

> **Tujuan Modul:** Memberikan "memori" khusus kepada LLM dengan mengintegrasikan **Knowledge Base** dari file CSV. LLM akan menggunakan data dari file tersebut sebagai referensi saat menjawab pertanyaan.

> **Estimasi Waktu:** 15–30 menit

---

## Apa yang Akan Kamu Pelajari

- Apa itu **RAG (Retrieval Augmented Generation)** dan mengapa penting
- Cara kerja **Permanent Inventory** — knowledge base yang selalu tersedia
- Cara **upload file langsung** ke sesi chat
- Bagaimana konten file **diinjeksikan ke System Prompt** sebelum dikirim ke LLM

---

## Apa itu RAG?

RAG (Retrieval Augmented Generation) adalah teknik di mana kita **memberikan dokumen atau data eksternal** kepada LLM sebagai konteks tambahan, sehingga LLM bisa menjawab pertanyaan berdasarkan informasi spesifik yang kita berikan — bukan hanya dari data training-nya.

**Analogi sederhana:**
> Bayangkan kamu memberikan buku catatan kepada AI sebelum kamu bertanya. AI akan membaca catatan itu dulu, lalu menjawab berdasarkan isi catatanmu.

**Alur kerja RAG di aplikasi ini:**
```
[File CSV/TXT]
      ↓
[Dibaca sebagai teks]
      ↓
[Dimasukkan ke System Prompt]
      ↓
[Dikirim ke LLM bersama pesan user]
      ↓
[LLM menjawab berdasarkan isi file]
```

> *Diagram RAG — lihat gambar di bawah:*

```mermaid
flowchart LR
    LLM["LLM Models\n(Gemini / Groq / Ollama)"]

    subgraph pipeline["Inference Pipeline"]
        A(["User"]) --> B["Ask Question"]
        B --> C["Data Wrangling"]
        C --> D["Prompt Formulation"]
        D --> E["Formulates Answer"]
        E --> F["Receives Answer"]
    end

    subgraph rag["Knowledge Base"]
        Doc["Document"] --> KS["Knowledge Store"]
    end

    LLM -. provides model .-> E
    KS --> C
```

---

## Permanent Inventory vs Upload File

Aplikasi ini memiliki **dua cara** untuk menggunakan knowledge base:

| Fitur | Permanent Inventory | Upload File |
|-------|--------------------|----|
| **Lokasi file** | `public/knowledge/` (hardcoded di project) | Upload langsung di sesi chat |
| **Persistent** | Selalu ada, bisa diaktifkan kapanpun | Hilang saat refresh |
| **Bisa dihapus?** | Tidak dari UI (harus hapus file) | Ada tombol hapus (×) |
| **Quest terkait** | Main Quest: "Information Society" | Side Quest: "Upload file directly" |
| **Tujuan** | Data referensi tetap workshop | Data situasional / eksperimen |

---

## Hardcode Knowledge Base ke Permanent Inventory

Permanent Inventory membaca file dari folder **`public/knowledge/`** di project kamu.

### Cara Menambahkan File Permanent

1. Buka folder `public/knowledge/` di project kamu
2. Tambahkan file `.csv` atau `.txt` ke folder tersebut
3. Restart development server (`Ctrl+C` lalu `npm run dev`)
4. File akan otomatis muncul di panel **PERMANENT INVENTORY** di halaman chatbot

### Format File yang Disarankan

File CSV dengan kolom `topic` dan `description` adalah format yang paling mudah dibaca:

```csv
topic,description,contoh
LLM,Large Language Models adalah sistem AI yang dilatih dengan data teks besar,GPT-4 dan Gemini
RAG,Retrieval Augmented Generation menggabungkan LLM dengan basis pengetahuan eksternal,Upload dokumen ke chatbot
Prompt Engineering,Seni membuat instruksi yang efektif untuk memandu output LLM,System prompt yang spesifik
```

> File contoh sudah disediakan di: `public/knowledge/workshop_context.csv`

### Cara Mengaktifkan Permanent Inventory

1. Buka halaman **CHATBOT**
2. Di panel kiri, scroll ke bagian **PERMANENT INVENTORY**
3. Klik pada nama file untuk **mengaktifkan / menonaktifkan**
4. File yang aktif ditandai dengan border kuning dan tanda ✓
5. Kamu bisa mengaktifkan **beberapa file sekaligus**

![Permanent Inventory](images/Web-Permanentinventory.png)

> Mengaktifkan file permanent untuk pertama kali akan menyelesaikan **Main Quest: "Activate Permanent Knowledge Base"**!

---

## Upload File Langsung ke Chat

Selain permanent inventory, kamu bisa upload file langsung ke sesi chat yang sedang berjalan.

### Cara Upload File

1. Di panel kiri chatbot, scroll ke bagian **📤 UPLOAD FILE**
2. Klik area upload untuk memilih file dari komputermu
3. Pilih file `.csv` atau `.txt`
4. File akan langsung muncul di daftar dengan tombol **×** untuk menghapus
5. File ini otomatis aktif sebagai knowledge base untuk chat selanjutnya

> *Screenshot upload file panel — COMING SOON!*
> ![Upload File Panel](images/Web-Permanentinventory.png)

> Mengupload file akan menyelesaikan **Side Quest: "Upload file directly to chatbot"**!

### Menghapus File yang Diupload

Klik tombol **×** (merah) di sebelah kanan nama file untuk menghapusnya dari sesi. File akan langsung tidak aktif.

---

## Complete The Quest — Chat dengan Knowledge Base kamu!

### Main Quest: "Information Society"

Untuk menyelesaikan quest utama ini, kamu perlu:

1. Aktivasi minimal satu file di **Permanent Inventory** (quest "Activate Permanent Knowledge Base")
2. Kirim **minimal 1 pesan** saat knowledge base sedang aktif (quest "Communicate with RAG chatbot")

**Contoh pertanyaan yang bisa kamu coba (dengan `workshop_context.csv` aktif):**
```
Apa itu RAG?
Jelaskan perbedaan antara LLM biasa dan RAG.
Apa kegunaan Prompt Engineering?
```

> *Video demo RAG mode — COMING SOON!*
> [![Demo RAG Module 2](COMING_SOON)](COMING_SOON)

Saat knowledge base aktif, kamu akan melihat indikator **✦ RAG ACTIVE** di panel chat counter.

### Side Quest: "Upload file directly to chatbot"

Upload satu file CSV atau TXT langsung ke sesi chat (bukan dari permanent inventory). Quest ini selesai secara otomatis setelah file berhasil diupload.

---

## Tips Membuat Knowledge Base yang Efektif

1. **Gunakan format CSV** — Lebih mudah dibaca dan diparse oleh LLM
2. **Beri header yang jelas** — Kolom `topic`, `description`, `contoh` membantu LLM memahami struktur
3. **Jangan terlalu panjang** — LLM memiliki batas context window. Usahakan file di bawah 50KB
4. **Gunakan bahasa yang konsisten** — Jika datanya Indonesia, system prompt-nya juga sebaiknya Indonesia
5. **Test dengan pertanyaan spesifik** — Tanyakan sesuatu yang hanya ada di file kamu untuk memastikan RAG bekerja

---

## Troubleshooting

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| File tidak muncul di Permanent Inventory | File tidak ada di `public/knowledge/` | Tambahkan file ke folder tersebut & restart server |
| AI tidak menggunakan isi file | File tidak diaktifkan | Klik nama file hingga border berubah kuning |
| Respons tidak akurat | File terlalu besar atau format tidak jelas | Perkecil file atau gunakan format CSV dengan header |
| Upload file gagal | Format file tidak didukung | Gunakan hanya `.csv` atau `.txt` |

---

## Verifikasi Modul 2

Checklist sebelum lanjut ke Module 3:

- [ ] Ada minimal 1 file di `public/knowledge/`
- [ ] Bisa mengaktifkan/menonaktifkan file dari Permanent Inventory
- [ ] Sudah chat minimal 1 kali dengan RAG mode aktif
- [ ] Quest "Information Society" selesai di Mission Dashboard
- [ ] (Bonus) Sudah mencoba upload file langsung ke chat

---

> **Kembali ke:** [Module 1 — Quickstart](../Module%201/Module%201%20-%20Quickstart.md)
> **Selanjutnya:** [Module 3 — Web Intelligence](../Module%203/Module%203%20-%20Web%20Intelligence.md)