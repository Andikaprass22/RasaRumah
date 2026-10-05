import type { ShippingInfo } from "../types/content";

export const shipping: ShippingInfo = {
  heading: "Pengiriman & Cara Pesan",
  notes: [
    "Pesanan dikonfirmasi lewat WhatsApp sebelum diproses.",
    "Ongkos kirim dihitung terpisah sesuai alamat dan berat paket.",
    "Pesanan yang masuk sebelum pukul 14.00 WIB dikirim pada hari yang sama.",
  ],
  methods: [
    {
      title: "Ambil di tempat",
      description: "Dapat diambil langsung di dapur kami di Bandung dengan perjanjian waktu.",
    },
    {
      title: "Kurir instan (area Bandung)",
      description: "Dikirim menggunakan kurir instan, biasanya tiba dalam 1–3 jam setelah dikonfirmasi.",
    },
    {
      title: "Ekspedisi (luar kota)",
      description: "Dikirim via ekspedisi pilihan pembeli, estimasi 1–4 hari kerja tergantung tujuan.",
    },
  ],
};
