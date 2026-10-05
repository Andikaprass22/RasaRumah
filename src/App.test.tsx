import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("menampilkan nama merek", () => {
    render(<App />);
    expect(screen.getAllByText(/RasaRumah/).length).toBeGreaterThan(0);
  });

  it("memuat bagian utama halaman", () => {
    render(<App />);
    for (const id of ["atas", "produk", "produk-detail", "cerita", "faq"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("tidak punya tautan kosong", () => {
    render(<App />);
    const dead = document.querySelectorAll('a[href="#"], a[href=""]');
    expect(dead.length).toBe(0);
  });
});
