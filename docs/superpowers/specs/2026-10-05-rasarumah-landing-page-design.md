# Spesifikasi Desain — Template Landing Page UMKM "RasaRumah"

- **Tanggal:** 2026-10-05
- **Status:** Menunggu persetujuan
- **Topik:** Landing page produk UMKM (makanan lokal) yang dapat dipakai ulang sebagai template untuk berbagai klien.

## 1. Tujuan

Membangun landing page profesional untuk memasarkan produk UMKM, dibangun dengan **Vite + React + TypeScript**, yang dipakai sebagai **template serah-terima**: nama merek, foto, deskripsi, varian, harga, ulasan, dan kontak harus mudah diganti untuk setiap klien tanpa menyentuh komponen tampilan.

Nama merek contoh: **RasaRumah** (produk makanan lokal).

**Kesuksesan berarti:** seorang developer/klien dapat mengganti seluruh konten merek dengan mengedit file di `src/content/` saja, dan alur pemesanan WhatsApp berfungsi penuh (pilih varian → jumlah → ringkasan → buka WhatsApp dengan pesan otomatis).

## 2. Sasaran Pengguna

- **Pemilik UMKM (klien template):** ingin halaman yang terpercaya, terlihat khas, dan mengarahkan pembeli ke WhatsApp.
- **Pembeli:** menjelajah dari ponsel, melihat foto produk, memilih varian, lalu memesan via WhatsApp.
- **Developer/agen:** memasang template untuk banyak klien dengan cepat.

## 3. Ruang Lingkup

**Termasuk:**
- Satu halaman (single page) berisi seluruh bagian.
- Bagian: Navbar, Hero, Cerita Merek, Keunggulan, Pilihan Produk/Varian, Detail Produk, Ulasan Pelanggan, Informasi Pengiriman & Pemesanan, FAQ (accordion), CTA Penutup, Footer.
- Pemilih varian + jumlah yang berfungsi, ringkasan pesanan, dan tombol pesan ke WhatsApp dengan pesan otomatis.
- Pemisahan data konten dari komponen tampilan.
- Responsif (mobile-first) untuk desktop dan mobile.
- Pengujian unit untuk logika inti + build produksi yang bersih.

**Tidak termasuk:**
- Backend, database, atau CMS.
- Multi-halaman / routing.
- Pembayaran online.
- Autentikasi.
- Klaim kesehatan, sertifikasi, atau testimoni terverifikasi.

## 4. Prinsip Desain

- **Foto produk sebagai fokus utama** — foto besar, berkualitas, jadi pusat perhatian.
- **Khas dan terpercaya** — palet hangat dan khas kuliner rumahan, bukan gradien generik/biru korporat.
- **Tata letak rapi** — grid yang konsisten, jarak lega, hierarki jelas.
- **Tipografi mudah dibaca** — font display untuk judul, font body yang lega untuk teks.
- **Hindari:** ornamen berlebihan, teks promosi klise ("No.1!", "terbaik se-Indonesia"), badge generik, ikon tanpa makna.
- **Rasa rumahan:** detail kecil seperti label "buatan rumahan", pemisah bergaya, dan foto proses produksi.

## 5. Arsitektur & Struktur Folder

```
src/
  content/                # SEMUA konten yang bisa diganti klien
    brand.ts              # nama, tagline, deskripsi, logo teks, kontak, sosial, alamat
    products.ts           # daftar produk + varian (id, nama, ukuran, harga, foto)
    productDetails.ts     # komposisi, berat, penyimpanan, masa simpan per produk
    advantages.ts         # daftar keunggulan
    story.ts              # cerita merek + langkah proses
    reviews.ts            # ulasan pelanggan (ditandai demo)
    shipping.ts           # info pengiriman & pemesanan
    faq.ts                # daftar FAQ
    index.ts              # re-export semua konten (satu titik edi)
  types/
    content.ts            # interface untuk seluruh bentuk konten
  lib/
    format.ts             # formatRupiah()
    whatsapp.ts           # buildOrderMessage(), buildWhatsAppUrl() (fungsi murni)
    order.ts              # tipe pesanan, hitung total, validasi
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Story.tsx
      Advantages.tsx
      Products.tsx
      ProductDetail.tsx
      Reviews.tsx
      Shipping.tsx
      Faq.tsx
      ClosingCta.tsx
    order/
      OrderProvider.tsx   # React context: state pesanan
      VariantSelector.tsx
      OrderSummary.tsx     # ringkasan sebelum buka WhatsApp
    ui/
      Button.tsx
      Container.tsx
      SectionHeading.tsx
      Reveal.tsx           # animasi masuk halus (IntersectionObserver)
  App.tsx
  main.tsx
  index.css                # @import tailwindcss + @theme (token warna/font)
```

**Aturan batas:** komponen tampilan **tidak boleh** memuat teks/harga/nama merek secara hardcode; semua nilai berasal dari `content/`. Komponen membaca konten melalui impor dari `content/index.ts` dan/atau melalui `OrderProvider`.

## 6. Model Data Konten (interface inti)

```ts
// types/content.ts
export interface Brand {
  name: string;
  tagline: string;
  shortDescription: string;
  city: string;
  whatsappNumber: string;   // format internasional tanpa '+', contoh "6281234567890"
  email: string;
  socials: { label: string; href: string }[];
  businessInfo: { label: string; value: string }[];
}

export interface ProductVariant {
  id: string;
  name: string;       // contoh "250 gram"
  size: string;       // contoh "250 g"
  price: number;      // rupiah, integer
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  isFeatured: boolean;
  variants: ProductVariant[];
}

export interface ProductDetail {
  productId: string;
  composition: string[];
  weight: string;
  storage: string;
  shelfLife: string;
  notes?: string;
}

export interface Advantage { title: string; description: string; }

export interface StoryStep { title: string; description: string; }

export interface Story {
  heading: string;
  paragraphs: string[];
  steps: StoryStep[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;   // 1..5
  text: string;
  isDemo: true;     // WAJIB: menandai ulasan sebagai contoh
}

export interface ShippingInfo {
  heading: string;
  notes: string[];
  methods: { title: string; description: string }[];
}

export interface FaqItem { id: string; question: string; answer: string; }
```

## 7. Alur Pemesanan (WhatsApp)

1. Pembeli memilih produk (dari bagian Pilihan Produk) → membuka bagian Detail untuk produk tersebut.
2. Pembeli memilih **varian** dan **jumlah** (min 1).
3. Harga satuan dan **total** diperbarui langsung.
4. Tombol **"Pesan via WhatsApp"** membuka **Ringkasan Pesanan** (drawer/modal) yang menampilkan: produk, varian, ukuran, harga satuan, jumlah, total, serta kolom opsional **nama** dan **catatan**.
5. Pembeli menekan **"Lanjut ke WhatsApp"** di dalam ringkasan.
6. Aplikasi membuka deep link `https://wa.me/<nomor>?text=<pesan ter-encode>`.

Pesan otomatis berformat:

```
Halo <Nama Merek>, saya ingin memesan:

Produk : <nama produk>
Varian : <nama varian> (<ukuran>)
Jumlah : <qty>
Harga  : Rp<satuan> x <qty>
Total  : Rp<total>

Nama   : <nama pembeli / ->
Catatan: <catatan / ->
```

**Fungsi murni (diuji unit):**
- `buildOrderMessage(order, brand): string` — tidak menyentuh DOM.
- `buildWhatsAppUrl(phone, message): string` — `wa.me` dengan `encodeURIComponent`.
- `calculateTotal(price, qty): number`
- `isOrderValid(order): boolean` — qty ≥ 1 dan varian terpilih.

## 8. Tema per Klien

- Warna, font, dan radius didefinisikan sebagai token di `index.css` lewat `@theme` Tailwind v4 (contoh `--color-brand`, `--color-accent`, `--font-display`, `--font-body`).
- Mengganti identitas visual klien = mengubah token di `index.css`.
- Mengganti konten klien = mengubah file di `src/content/`.
- **Tidak ada** warna/teks merek yang ditulis langsung di komponen.

## 9. Konten Demo RasaRumah

- **Produk unggulan:** Sambal Bawang Rumahan (level 1–3, ukuran 150 g / 250 g).
- Produk pendukung contoh: Keripik Pisang, Rempeyek Kacang, Bawang Goreng.
- Ulasan: 3–4 ulasan contoh, semuanya berlabel "Ulasan contoh" (`isDemo: true`).
- Foto: URL Unsplash yang terpusat di `content/`, dengan catatan cara mengganti.
- Nomor WhatsApp: placeholder yang jelas, mis. `6281234567890`, dengan komentar "ganti dengan nomor klien".

## 10. Aturan Konten

- **DILARANG** membuat klaim kesehatan ("menyembuhkan", "menyehatkan", "menurunkan kolesterol").
- **DILARANG** menyebut sertifikasi (Halal/BPOM/ISO) seolah sudah terverifikasi.
- Ulasan wajib ditandai sebagai contoh/demo; tidak boleh tampak seperti ulasan terverifikasi.
- **Tidak ada tautan kosong** (`href="#"`) atau tombol yang tidak merespons. Sosial & kontak memakai target nyata (wa.me, mailto, Google Maps search).

## 11. Aksesibilitas & Responsif

- Landmark semantik: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Accordion FAQ: `<button aria-expanded>` + `<div role="region">`, bisa dioperasikan keyboard.
- Fokus terlihat (ring), kontras teks memadai.
- Semua gambar punya `alt` bermakna; gambar dekoratif `alt=""`.
- Navigasi mobile: menu toggle yang berfungsi.
- Breakpoint: mobile (default), `md`, `lg` untuk desktop.

## 12. Penanganan Error & Kasus Tepi

- Jumlah tidak boleh < 1 (tombol minus dinonaktifkan di 1).
- Jika nomor WhatsApp kosong/tidak valid, tampilkan pesan error yang jelas, jangan buka tab kosong.
- Popup blocker: gunakan `window.open` dengan fallback `window.location.href` bila diblokir.
- `prefers-reduced-motion` dihormati oleh animasi Reveal.
- Gambar gagal dimuat: `onError` menampilkan latar placeholder.

## 13. Pengujian

Gunakan **Vitest + React Testing Library (jsdom)**.

Wajib diuji:
- `format.ts` — format Rupiah benar (termasuk ribuan).
- `whatsapp.ts` — pesan memuat produk, varian, jumlah, total; URL ter-encode benar.
- `order.ts` — total, validasi, batas qty.
- Perilaku komponen: memilih varian memperbarui harga; tombol pesan menampilkan ringkasan sebelum membuka WhatsApp; tombol minus nonaktif di qty 1; toggle FAQ buka/tutup; menu mobile toggle.

## 14. Kriteria Penerimaan

- [ ] Semua bagian yang diminta ada dan terisi konten demo RasaRumah.
- [ ] Mengganti `src/content/*` mengubah halaman tanpa mengubah komponen.
- [ ] Pemilih varian & jumlah memperbarui harga dan total secara langsung.
- [ ] Tombol pesan menampilkan ringkasan, lalu membuka WhatsApp dengan pesan berisi produk/varian/jumlah/total.
- [ ] Tidak ada `href="#"` atau tombol mati (diperiksa lewat pencarian + pengujian).
- [ ] Tidak ada klaim kesehatan/sertifikasi; ulasan ditandai demo.
- [ ] `npm run test`, `npm run typecheck`, `npm run lint`, dan `npm run build` semuanya lolos.
- [ ] Tampilan responsif rapi di lebar mobile dan desktop.

## 15. Verifikasi

- `npm run test` → semua lulus.
- `npm run typecheck` (tsc --noEmit) → tanpa error.
- `npm run lint` → tanpa error.
- `npm run build` → build produksi sukses.
- `npm run dev` → halaman dimuat tanpa error konsol; diperiksa manual.

## 16. Risiko & Keputusan Terbuka

- **Foto Unsplash via URL** bergantung jaringan saat demo; dicatat di komentar konten agar mudah diganti aset lokal.
- **Nomor WhatsApp placeholder** harus diganti klien sebelum dipakai produksi; diberi komentar jelas.
