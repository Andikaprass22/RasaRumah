import { useState } from "react";
import { useOrder } from "./order-context";
import { formatRupiah } from "../../lib/format";
import { calculateTotal } from "../../lib/order";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  isPhoneValid,
} from "../../lib/whatsapp";
import type { Brand, Product, ProductVariant } from "../../types/content";
import { Button } from "../ui/Button";

export function OrderSummary() {
  const { brand, product, variant, quantity, isSummaryOpen, closeSummary } =
    useOrder();

  if (!isSummaryOpen) {
    return null;
  }

  return (
    <OrderSummaryDialog
      brand={brand}
      product={product}
      variant={variant}
      quantity={quantity}
      onClose={closeSummary}
    />
  );
}

interface OrderSummaryDialogProps {
  brand: Brand;
  product: Product | null;
  variant: ProductVariant | null;
  quantity: number;
  onClose: () => void;
}

function OrderSummaryDialog({
  brand,
  product,
  variant,
  quantity,
  onClose,
}: OrderSummaryDialogProps) {
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const hasSelection = product !== null && variant !== null;
  const total = hasSelection ? calculateTotal(variant.price, quantity) : 0;

  function handleConfirm() {
    if (!product || !variant) {
      return;
    }
    if (!isPhoneValid(brand.whatsappNumber)) {
      setError(
        "Nomor WhatsApp belum diatur dengan benar. Silakan hubungi kami melalui email.",
      );
      return;
    }
    setError(null);
    const message = buildOrderMessage({
      brand,
      productName: product.name,
      variantName: variant.name,
      size: variant.size,
      price: variant.price,
      quantity,
      customerName,
      note,
    });
    const url = buildWhatsAppUrl(brand.whatsappNumber, message);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/50 p-0 pb-[env(safe-area-inset-bottom)] sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-summary-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream-50 p-6 shadow-xl supports-[height:100dvh]:max-h-[90dvh] sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Ringkasan Pesanan
            </p>
            <h2
              id="order-summary-title"
              className="mt-1 text-xl font-semibold text-ink-900"
            >
              Periksa sebelum lanjut
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup ringkasan"
            className="rounded-full p-2 text-ink-500 transition-colors hover:bg-cream-100"
          >
            ✕
          </button>
        </div>

        {hasSelection ? (
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Produk</dt>
              <dd className="text-right font-medium text-ink-800">
                {product.name}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Varian</dt>
              <dd className="text-right font-medium text-ink-800">
                {variant.name} ({variant.size})
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Harga satuan</dt>
              <dd className="text-right font-medium text-ink-800">
                {formatRupiah(variant.price)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Jumlah</dt>
              <dd className="text-right font-medium text-ink-800">{quantity}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-cream-200 pt-3">
              <dt className="font-semibold text-ink-700">Total</dt>
              <dd className="text-right text-lg font-semibold text-brand-700">
                {formatRupiah(total)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-5 text-sm text-ink-500">
            Pilih varian produk terlebih dahulu.
          </p>
        )}

        <div className="mt-5 grid gap-4">
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-ink-700">Nama (opsional)</span>
            <input
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Nama Anda"
              className="text-base rounded-xl border border-cream-300 bg-white px-3 py-2 text-ink-800 outline-none focus:border-brand-500 sm:text-sm"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-ink-700">Catatan (opsional)</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={2}
              placeholder="Contoh: level pedas, permintaan khusus"
              className="text-base resize-none rounded-xl border border-cream-300 bg-white px-3 py-2 text-ink-800 outline-none focus:border-brand-500 sm:text-sm"
            />
          </label>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-700"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!hasSelection}
            className="px-6 py-3 text-base sm:flex-1"
          >
            Lanjut ke WhatsApp
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="px-6 py-3"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}
