import { useEffect } from "react";
import type { Product } from "../../types/content";
import { useOrder } from "./order-context";
import { formatRupiah } from "../../lib/format";
import { calculateTotal } from "../../lib/order";
import { Button } from "../ui/Button";

export function VariantSelector({ product }: { product: Product }) {
  const { variant, quantity, setProduct, setVariant, setQuantity, openSummary } =
    useOrder();

  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);

  const activeVariant =
    variant && product.variants.some((item) => item.id === variant.id)
      ? variant
      : product.variants[0];

  if (!activeVariant) {
    return (
      <p className="text-sm text-ink-500">
        Varian untuk produk ini belum tersedia.
      </p>
    );
  }

  const total = calculateTotal(activeVariant.price, quantity);

  return (
    <div className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-700">
          Pilih varian
        </legend>
        <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
          {product.variants.map((item) => {
            const checked = item.id === activeVariant.id;
            return (
              <label
                key={item.id}
                className={`flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-colors ${
                  checked
                    ? "border-brand-500 bg-brand-50"
                    : "border-cream-200 bg-cream-50 hover:border-brand-300"
                }`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={item.id}
                  checked={checked}
                  onChange={() => setVariant(item)}
                  className="sr-only"
                />
                <span className="font-semibold text-ink-800">{item.name}</span>
                <span className="text-sm text-ink-500">{item.size}</span>
                <span className="text-sm font-semibold text-brand-700">
                  {formatRupiah(item.price)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-ink-700">Jumlah</span>
        <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-cream-50 p-1">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold text-ink-700 transition-colors hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span
            className="w-8 text-center text-base font-semibold text-ink-800"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Tambah jumlah"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold text-ink-700 transition-colors hover:bg-cream-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-cream-100 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-500">
            Harga satuan
          </p>
          <p data-testid="order-price" className="text-lg font-semibold text-ink-900">
            {formatRupiah(activeVariant.price)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-ink-500">Total</p>
          <p data-testid="order-total" className="text-lg font-semibold text-brand-700">
            {formatRupiah(total)}
          </p>
        </div>
      </div>

      <Button
        type="button"
        onClick={openSummary}
        className="w-full px-6 py-3 text-base"
      >
        Pesan via WhatsApp
      </Button>
    </div>
  );
}
