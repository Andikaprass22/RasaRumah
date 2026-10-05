import { describe, it, expect } from "vitest";
import { calculateTotal, isOrderValid, clampQuantity } from "./order";

describe("order", () => {
  it("menghitung total harga", () => {
    expect(calculateTotal(38000, 3)).toBe(114000);
  });

  it("menjaga jumlah minimal 1", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-5)).toBe(1);
    expect(clampQuantity(4)).toBe(4);
  });

  it("memvalidasi pesanan", () => {
    expect(isOrderValid(null)).toBe(false);
    expect(isOrderValid({ productId: "p", variantId: "", quantity: 1 })).toBe(false);
    expect(isOrderValid({ productId: "p", variantId: "v", quantity: 0 })).toBe(false);
    expect(isOrderValid({ productId: "p", variantId: "v", quantity: 2 })).toBe(true);
  });
});
