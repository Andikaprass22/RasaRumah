import { describe, it, expect } from "vitest";
import { buildOrderMessage, buildWhatsAppUrl, isPhoneValid } from "./whatsapp";

const base = {
  brand: { name: "RasaRumah" },
  productName: "Sambal Bawang Rumahan",
  variantName: "Botol 250 gram",
  size: "250 g",
  price: 38000,
  quantity: 2,
  customerName: "Dewi",
  note: "Minta level 3",
};

describe("whatsapp", () => {
  it("memuat produk, varian, jumlah, dan total", () => {
    const msg = buildOrderMessage(base);
    expect(msg).toContain("Sambal Bawang Rumahan");
    expect(msg).toContain("Botol 250 gram");
    expect(msg).toContain("250 g");
    expect(msg).toContain("2");
    expect(msg).toContain("Rp76.000");
  });

  it("menandai data kosong dengan '-'", () => {
    const msg = buildOrderMessage({
      ...base,
      customerName: undefined,
      note: undefined,
    });
    expect(msg).toContain("-");
  });

  it("membangun URL wa.me yang ter-encode", () => {
    const url = buildWhatsAppUrl("6281234567890", "a b\nc");
    expect(url).toBe(
      "https://wa.me/6281234567890?text=" + encodeURIComponent("a b\nc"),
    );
  });

  it("memvalidasi nomor telepon", () => {
    expect(isPhoneValid("6281234567890")).toBe(true);
    expect(isPhoneValid("")).toBe(false);
    expect(isPhoneValid("abc")).toBe(false);
    expect(isPhoneValid("+62 812-3456-7890")).toBe(true);
  });
});
