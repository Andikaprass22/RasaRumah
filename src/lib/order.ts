export interface OrderSelection {
  productId: string;
  variantId: string;
  quantity: number;
  customerName?: string;
  note?: string;
}

/** Total harga dalam rupiah untuk sejumlah kuantitas. */
export function calculateTotal(price: number, quantity: number): number {
  return Math.round(price) * Math.max(0, Math.round(quantity));
}

/** Menjaga kuantitas minimal 1 (tombol minus tidak boleh menghasilkan 0). */
export function clampQuantity(next: number): number {
  if (!Number.isFinite(next)) return 1;
  return Math.max(1, Math.floor(next));
}

/** Pesanan valid bila varian terpilih dan kuantitas minimal 1. */
export function isOrderValid(order: OrderSelection | null): boolean {
  if (!order) return false;
  return (
    order.variantId.trim().length > 0 &&
    Number.isInteger(order.quantity) &&
    order.quantity >= 1
  );
}
