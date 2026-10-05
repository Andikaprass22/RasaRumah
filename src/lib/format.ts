/** Memformat angka menjadi rupiah dengan pemisah ribuan, contoh: 38000 -> "Rp38.000". */
export function formatRupiah(value: number): string {
  return "Rp" + new Intl.NumberFormat("id-ID").format(Math.round(value));
}
