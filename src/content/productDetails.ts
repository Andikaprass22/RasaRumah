import type { ProductDetail } from "../types/content";

export const productDetails: ProductDetail[] = [
  {
    productId: "sambal-bawang",
    composition: [
      "Cabai merah keriting",
      "Bawang merah",
      "Bawang putih",
      "Gula merah",
      "Garam",
      "Minyak kelapa",
    ],
    weight: "150 g / 250 g per botol",
    storage: "Simpan di tempat sejuk dan kering, jauh dari sinar matahari langsung.",
    shelfLife: "Baik digunakan dalam 3–4 minggu setelah dibuka.",
    notes: "Setelah dibuka, simpan di lemari pendingin agar lebih tahan lama.",
  },
  {
    productId: "keripik-pisang",
    composition: ["Pisang kepok", "Minyak kelapa", "Gula", "Garam"],
    weight: "200 g / 400 g per kemasan",
    storage: "Simpan dalam wadah kedap udara pada suhu ruang.",
    shelfLife: "Baik digunakan dalam 4 minggu.",
  },
  {
    productId: "rempeyek-kacang",
    composition: ["Tepung beras", "Kacang tanah", "Daun jeruk", "Santan", "Garam"],
    weight: "200 g / 300 g per kemasan",
    storage: "Simpan dalam wadah kedap udara, jauh dari kelembapan.",
    shelfLife: "Baik digunakan dalam 3 minggu.",
  },
  {
    productId: "bawang-goreng",
    composition: ["Bawang merah", "Minyak kelapa", "Garam"],
    weight: "100 g / 250 g per toples",
    storage: "Simpan dalam wadah tertutup pada suhu ruang.",
    shelfLife: "Baik digunakan dalam 6 minggu.",
  },
];
