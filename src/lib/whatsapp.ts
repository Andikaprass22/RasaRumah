import { formatRupiah } from "./format";

export interface OrderMessageInput {
  brand: { name: string };
  productName: string;
  variantName: string;
  size: string;
  price: number;
  quantity: number;
  customerName?: string;
  note?: string;
}

/** Menyusun pesan WhatsApp berisi ringkasan pesanan. Fungsi murni, mudah diuji. */
export function buildOrderMessage(input: OrderMessageInput): string {
  const total = input.price * input.quantity;
  const lines = [
    `Halo ${input.brand.name}, saya ingin memesan:`,
    "",
    `Produk : ${input.productName}`,
    `Varian : ${input.variantName} (${input.size})`,
    `Jumlah : ${input.quantity}`,
    `Harga  : ${formatRupiah(input.price)} x ${input.quantity}`,
    `Total  : ${formatRupiah(total)}`,
    "",
    `Nama   : ${input.customerName?.trim() || "-"}`,
    `Catatan: ${input.note?.trim() || "-"}`,
  ];
  return lines.join("\n");
}

/** Membersihkan nomor telepon menjadi hanya digit. */
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/** Nomor valid bila tersisa 8–15 digit. */
export function isPhoneValid(phone: string): boolean {
  return /^\d{8,15}$/.test(normalizePhone(phone));
}

/** Membangun tautan wa.me dengan pesan yang sudah di-encode. */
export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}
