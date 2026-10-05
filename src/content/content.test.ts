import { describe, it, expect } from "vitest";
import {
  brand,
  products,
  productDetails,
  reviews,
  faq,
  advantages,
  story,
  shipping,
} from "./index";

describe("konten RasaRumah", () => {
  it("merek punya nama dan nomor WhatsApp yang valid", () => {
    expect(brand.name.length).toBeGreaterThan(0);
    expect(brand.whatsappNumber).toMatch(/^\d{8,15}$/);
  });

  it("setiap produk punya minimal satu varian dengan harga > 0", () => {
    for (const p of products) {
      expect(p.variants.length).toBeGreaterThan(0);
      for (const v of p.variants) {
        expect(v.price).toBeGreaterThan(0);
        expect(v.imageUrl.length).toBeGreaterThan(0);
      }
    }
  });

  it("memiliki tepat satu produk unggulan", () => {
    expect(products.filter((p) => p.isFeatured)).toHaveLength(1);
  });

  it("setiap produk punya detail produk", () => {
    for (const p of products) {
      expect(productDetails.some((d) => d.productId === p.id)).toBe(true);
    }
  });

  it("semua ulasan ditandai sebagai demo", () => {
    for (const r of reviews) {
      expect(r.isDemo).toBe(true);
      expect(r.rating).toBeGreaterThanOrEqual(1);
      expect(r.rating).toBeLessThanOrEqual(5);
    }
  });

  it("id FAQ unik", () => {
    const ids = faq.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(faq.length).toBeGreaterThan(0);
  });

  it("mengisi konten pendukung (keunggulan, cerita, pengiriman)", () => {
    expect(advantages.length).toBeGreaterThan(0);
    expect(story.paragraphs.length).toBeGreaterThan(0);
    expect(story.steps.length).toBeGreaterThan(0);
    expect(shipping.methods.length).toBeGreaterThan(0);
  });
});
