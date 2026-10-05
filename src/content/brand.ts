import type { Brand } from "../types/content";

// ============================================================================
// KONTEN DEMO — ganti nilai di bawah untuk memakai template ini pada klien lain.
// ============================================================================
export const brand: Brand = {
  name: "RasaRumah",
  tagline: "Masakan rumahan khas, dibuat segar setiap hari",
  shortDescription:
    "RasaRumah mengolah bahan segar dari dapur rumahan di Bandung menjadi sambal, keripik, dan camilan khas yang siap menemani meja makan keluarga.",
  city: "Bandung",
  // GANTI dengan nomor WhatsApp klien (format internasional tanpa '+', contoh 62812xxxxxxx).
  whatsappNumber: "6281234567890",
  email: "halo@rasarumah.example",
  socials: [
    { label: "Instagram", href: "https://instagram.com/rasarumah.example" },
    { label: "Facebook", href: "https://facebook.com/rasarumah.example" },
    { label: "TikTok", href: "https://tiktok.com/@rasarumah.example" },
  ],
  businessInfo: [
    { label: "Nama Usaha", value: "RasaRumah" },
    { label: "Alamat", value: "Jl. Melati No. 12, Bandung, Jawa Barat" },
    { label: "Jam Operasional", value: "Senin–Sabtu, 08.00–18.00 WIB" },
    { label: "Metode Pembayaran", value: "Transfer bank & e-wallet" },
  ],
};
