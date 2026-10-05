import type { Review } from "../types/content";

// SEMUA ulasan di bawah adalah CONTOH untuk keperluan demo template.
// Ganti dengan ulasan asli milik klien sebelum situs dipublikasikan.
export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Dewi",
    location: "Bandung",
    rating: 5,
    text: "Sambalnya pedasnya pas dan rasanya seperti buatan sendiri. Kemasannya rapi, tidak bocor saat dikirim.",
    isDemo: true,
  },
  {
    id: "review-2",
    name: "Rizky",
    location: "Cimahi",
    rating: 4,
    text: "Keripik pisangnya renyah dan tidak berminyak. Cocok untuk teman kerja di kantor.",
    isDemo: true,
  },
  {
    id: "review-3",
    name: "Sari",
    location: "Bandung",
    rating: 5,
    text: "Pesan lewat WhatsApp mudah, dijelaskan varian dan harga dengan jelas. Rempeyeknya garing.",
    isDemo: true,
  },
];
