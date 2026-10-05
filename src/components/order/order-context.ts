import { createContext, useContext } from "react";
import type { Brand, Product, ProductVariant } from "../../types/content";

export interface OrderContextValue {
  brand: Brand;
  product: Product | null;
  variant: ProductVariant | null;
  quantity: number;
  isSummaryOpen: boolean;
  setProduct: (product: Product) => void;
  setVariant: (variant: ProductVariant) => void;
  setQuantity: (quantity: number) => void;
  openSummary: () => void;
  closeSummary: () => void;
}

export const OrderContext = createContext<OrderContextValue | null>(null);

export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder harus dipakai di dalam <OrderProvider>.");
  }
  return context;
}
