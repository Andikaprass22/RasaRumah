import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderProvider } from "./OrderProvider";
import { OrderSummary } from "./OrderSummary";
import { VariantSelector } from "./VariantSelector";
import { brand, products } from "../../content";

function renderSelector(overrides?: { whatsappNumber?: string }) {
  return render(
    <OrderProvider
      brand={{ ...brand, whatsappNumber: overrides?.whatsappNumber ?? brand.whatsappNumber }}
    >
      <VariantSelector product={products[0]} />
      <OrderSummary />
    </OrderProvider>,
  );
}

describe("alur pesanan", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("memilih varian memperbarui harga", async () => {
    const user = userEvent.setup();
    renderSelector();
    await user.click(screen.getByRole("radio", { name: /150 g/i }));
    expect(screen.getByTestId("order-price")).toHaveTextContent("Rp25.000");
  });

  it("tombol minus nonaktif saat jumlah 1", () => {
    renderSelector();
    expect(screen.getByRole("button", { name: /kurangi/i })).toBeDisabled();
  });

  it("menampilkan ringkasan sebelum membuka WhatsApp", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockReturnValue(null as never);
    renderSelector();
    await user.click(screen.getByRole("button", { name: /pesan via whatsapp/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it("membuka WhatsApp dengan pesan berisi varian, jumlah, dan total", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    renderSelector();
    await user.click(screen.getByRole("radio", { name: /250 g/i }));
    await user.click(screen.getByRole("button", { name: /tambah/i }));
    await user.click(screen.getByRole("button", { name: /pesan via whatsapp/i }));
    await user.click(screen.getByRole("button", { name: /lanjut ke whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const url = open.mock.calls[0][0] as string;
    expect(url.startsWith("https://wa.me/6281234567890?text=")).toBe(true);
    const decoded = decodeURIComponent(url.split("text=")[1]);
    expect(decoded).toContain("Botol 250 gram");
    expect(decoded).toContain("2");
    expect(decoded).toContain("Rp76.000");
  });

  it("menampilkan pesan error bila nomor WhatsApp belum diatur", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    renderSelector({ whatsappNumber: "" });
    await user.click(screen.getByRole("button", { name: /pesan via whatsapp/i }));
    await user.click(screen.getByRole("button", { name: /lanjut ke whatsapp/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });
});
