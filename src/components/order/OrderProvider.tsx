import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Brand, Product, ProductVariant } from "../../types/content";
import { clampQuantity } from "../../lib/order";
import { OrderContext } from "./order-context";
import type { OrderContextValue } from "./order-context";

export function OrderProvider({
  brand,
  children,
}: {
  brand: Brand;
  children: ReactNode;
}) {
  const [product, setProductState] = useState<Product | null>(null);
  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantityState] = useState(1);
  const [isSummaryOpen, setSummaryOpen] = useState(false);

  // Memilih produk baru mereset varian ke default dan jumlah ke 1.
  const setProduct = useCallback((next: Product) => {
    setProductState(next);
    setVariant(next.variants[0] ?? null);
    setQuantityState(1);
  }, []);

  const setQuantity = useCallback((next: number) => {
    setQuantityState(clampQuantity(next));
  }, []);

  const openSummary = useCallback(() => setSummaryOpen(true), []);
  const closeSummary = useCallback(() => setSummaryOpen(false), []);

  const value = useMemo<OrderContextValue>(
    () => ({
      brand,
      product,
      variant,
      quantity,
      isSummaryOpen,
      setProduct,
      setVariant,
      setQuantity,
      openSummary,
      closeSummary,
    }),
    [
      brand,
      product,
      variant,
      quantity,
      isSummaryOpen,
      setProduct,
      setQuantity,
      openSummary,
      closeSummary,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
