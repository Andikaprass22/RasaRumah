import { productDetails, products } from "../../content";
import { useOrder } from "../order/order-context";
import { VariantSelector } from "../order/VariantSelector";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";

export function ProductDetail() {
  const { product } = useOrder();
  const selected =
    product ?? products.find((item) => item.isFeatured) ?? products[0];
  const detail = productDetails.find((item) => item.productId === selected.id);

  return (
    <section id="produk-detail" className="py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Detail Produk"
          title={selected.name}
          description={selected.shortDescription}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SmartImage
              src={selected.imageUrl}
              alt={selected.name}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            />
          </Reveal>

          <div className="flex flex-col gap-8">
            <VariantSelector product={selected} />

            {detail ? (
              <div className="rounded-2xl border border-cream-200 bg-cream-50 p-6">
                <h3 className="text-lg font-semibold text-ink-900">
                  Komposisi & Penyimpanan
                </h3>
                <dl className="mt-4 flex flex-col gap-4 text-sm">
                  <div>
                    <dt className="font-semibold text-ink-700">Komposisi</dt>
                    <dd>
                      <ul className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-ink-600">
                        {detail.composition.map((item) => (
                          <li
                            key={item}
                            className="rounded-full bg-cream-200/70 px-2.5 py-0.5"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <dt className="font-semibold text-ink-700">Berat</dt>
                      <dd className="mt-1 text-ink-600">{detail.weight}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-700">Penyimpanan</dt>
                      <dd className="mt-1 text-ink-600">{detail.storage}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-700">Masa simpan</dt>
                      <dd className="mt-1 text-ink-600">{detail.shelfLife}</dd>
                    </div>
                  </div>
                  {detail.notes ? (
                    <p className="text-ink-500">{detail.notes}</p>
                  ) : null}
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
