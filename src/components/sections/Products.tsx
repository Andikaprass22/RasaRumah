import { products } from "../../content";
import { formatRupiah } from "../../lib/format";
import { useOrder } from "../order/order-context";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";

export function Products() {
  const { product: selected, setProduct } = useOrder();

  function handleSelect(productId: string) {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      return;
    }
    setProduct(product);
    document
      .getElementById("produk-detail")
      ?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="produk" className="bg-cream-100/60 py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Pilihan Produk"
          title="Pilih varian sesuai kebutuhan"
          description="Semua produk dibuat dalam batch kecil. Tekan salah satu produk untuk melihat varian dan detailnya."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const startingPrice = Math.min(
              ...product.variants.map((item) => item.price),
            );
            const isActive = selected?.id === product.id;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => handleSelect(product.id)}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-cream-50 text-left transition-colors ${
                  isActive
                    ? "border-brand-500 ring-2 ring-brand-200"
                    : "border-cream-200 hover:border-brand-300"
                }`}
              >
                <SmartImage
                  src={product.imageUrl}
                  alt={product.name}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-ink-900">
                      {product.name}
                    </h3>
                    {product.isFeatured ? (
                      <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cream-50">
                        Unggulan
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-500">
                    {product.shortDescription}
                  </p>
                  <p className="mt-auto pt-2 text-sm font-semibold text-brand-700">
                    Mulai dari {formatRupiah(startingPrice)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
