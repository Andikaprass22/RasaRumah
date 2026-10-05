import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderProvider } from "../order/OrderProvider";
import { OrderSummary } from "../order/OrderSummary";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { brand } from "../../content";

function renderLayout() {
  return render(
    <OrderProvider brand={brand}>
      <Navbar />
      <Footer />
      <OrderSummary />
    </OrderProvider>,
  );
}

describe("layout", () => {
  it("toggle menu mobile mengubah aria-expanded", async () => {
    const user = userEvent.setup();
    renderLayout();
    const toggle = screen.getByTestId("menu-toggle");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("tombol Pesan Produk membuka ringkasan pesanan", async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole("button", { name: /pesan produk/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("footer tidak memuat tautan kosong", () => {
    renderLayout();
    const dead = document.querySelectorAll('a[href="#"], a[href=""]');
    expect(dead.length).toBe(0);
  });
});
