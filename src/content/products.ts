import type { Product } from "../types/content";

// Foto demo memakai Unsplash. Untuk mengganti: salin URL foto baru ke properti
// `imageUrl`, atau ganti seluruh alamat dengan path aset lokal (mis. "/produk/sambal.jpg").
export const products: Product[] = [
  {
    id: "sambal-bawang",
    name: "Sambal Bawang Rumahan",
    shortDescription:
      "Sambal bawang yang ditumbuk harian dengan cabai merah segar dan bawang pilihan. Tersedia beberapa tingkat pedas.",
    imageUrl:
      "https://images.unsplash.com/photo-1680169590313-9a14f3cd8148?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    variants: [
      {
        id: "sambal-150",
        name: "Botol 150 gram",
        size: "150 g",
        price: 25000,
        imageUrl:
          "https://images.unsplash.com/photo-1680169590313-9a14f3cd8148?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sambal-250",
        name: "Botol 250 gram",
        size: "250 g",
        price: 38000,
        imageUrl:
          "https://images.unsplash.com/photo-1680173073730-852e0ec93bec?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "keripik-pisang",
    name: "Keripik Pisang Manis",
    shortDescription:
      "Pisang kepok diiris tipis lalu digoreng garing, dengan rasa manis yang lembut dan renyah.",
    imageUrl:
      "https://images.unsplash.com/photo-1762884601729-0eeeafbdfb8a?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    variants: [
      {
        id: "keripik-200",
        name: "Kemasan 200 gram",
        size: "200 g",
        price: 22000,
        imageUrl:
          "https://images.unsplash.com/photo-1762884601729-0eeeafbdfb8a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "keripik-400",
        name: "Kemasan 400 gram",
        size: "400 g",
        price: 40000,
        imageUrl:
          "https://images.unsplash.com/photo-1775377262388-1fecca04b8c7?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "rempeyek-kacang",
    name: "Rempeyek Kacang Renyah",
    shortDescription:
      "Rempeyek tipis dengan kacang tanah utuh dan daun jeruk, digoreng hingga garing.",
    imageUrl:
      "https://images.unsplash.com/photo-1575399872095-9363bf262e64?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    variants: [
      {
        id: "rempeyek-200",
        name: "Kemasan 200 gram",
        size: "200 g",
        price: 20000,
        imageUrl:
          "https://images.unsplash.com/photo-1575399872095-9363bf262e64?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "rempeyek-300",
        name: "Kemasan 300 gram",
        size: "300 g",
        price: 28000,
        imageUrl:
          "https://images.unsplash.com/photo-1574706052773-943579c15a01?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "bawang-goreng",
    name: "Bawang Goreng Renyah",
    shortDescription:
      "Bawang merah diiris tipis dan digoreng perlahan hingga kuning keemasan. Cocok untuk taburan.",
    imageUrl:
      "https://images.unsplash.com/photo-1730137577515-bd4726a4c3a6?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    variants: [
      {
        id: "bawang-100",
        name: "Toples 100 gram",
        size: "100 g",
        price: 18000,
        imageUrl:
          "https://images.unsplash.com/photo-1730137577515-bd4726a4c3a6?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "bawang-250",
        name: "Toples 250 gram",
        size: "250 g",
        price: 35000,
        imageUrl:
          "https://images.unsplash.com/photo-1646552808120-f237b654da61?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];
