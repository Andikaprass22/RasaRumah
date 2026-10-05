import { describe, it, expect } from "vitest";
import { formatRupiah } from "./format";

describe("formatRupiah", () => {
  it("memformat ribuan dengan titik", () => {
    expect(formatRupiah(38000)).toBe("Rp38.000");
  });

  it("memformat nol", () => {
    expect(formatRupiah(0)).toBe("Rp0");
  });

  it("memformat jutaan", () => {
    expect(formatRupiah(1250000)).toBe("Rp1.250.000");
  });
});
