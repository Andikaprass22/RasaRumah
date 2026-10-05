import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { OrderProvider } from "../order/OrderProvider";
import { OrderSummary } from "../order/OrderSummary";
import { Products } from "./Products";
import { ProductDetail } from "./ProductDetail";
import { Faq } from "./Faq";
import { brand, faq, products, productDetails } from "../../content";

function renderWithProvider(ui: ReactNode) {
  return render(
    <OrderProvider brand={brand}>
      {ui}
      <OrderSummary />
    </OrderProvider>,
  );
}

describe("sections", () => {
  it("FAQ dapat dibuka dan ditutup", async () => {
    const user = userEvent.setup();
    renderWithProvider(<Faq />);
    const toggle = screen.getByRole("button", { name: faq[0].question });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("ProductDetail menampilkan komposisi produk unggulan", () => {
    renderWithProvider(<ProductDetail />);
    const featured = products.find((item) => item.isFeatured)!;
    const detail = productDetails.find((item) => item.productId === featured.id)!;
    expect(screen.getByText(detail.composition[0])).toBeInTheDocument();
  });

  it("memilih produk lain memperbarui detail produk", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <>
        <Products />
        <ProductDetail />
      </>,
    );
    const target = products[1];
    await user.click(screen.getByRole("button", { name: new RegExp(target.name, "i") }));
    const detail = productDetails.find((item) => item.productId === target.id)!;
    expect(await screen.findByText(detail.composition[0])).toBeInTheDocument();
  });
});
