import { brand, products } from "../../content";
import { formatRupiah } from "../../lib/format";
import { buttonClasses } from "../ui/buttonStyles";
import { Container } from "../ui/Container";
import { SmartImage } from "../ui/SmartImage";

export function Hero() {
  const featured = products.find((item) => item.isFeatured) ?? products[0];
  const startingPrice = Math.min(...featured.variants.map((item) => item.price));

  return (
    <section
      id="atas"
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-ink-900 supports-[height:100svh]:min-h-svh"
    >
      <SmartImage
        src={featured.imageUrl}
        alt={featured.name}
        loading="eager"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Overlay bertingkat halus: menjaga foto tetap terlihat, hanya cukup untuk keterbacaan teks */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900/85 via-ink-900/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink-900/75 via-ink-900/15 to-transparent lg:block"
      />

      <Container className="relative pb-10 pt-24 sm:pb-16 sm:pt-32 lg:pb-24">
        <div className="flex max-w-2xl flex-col gap-4 sm:gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-cream-50 backdrop-blur-sm">
            {brand.city} · Buatan rumahan
          </span>

          <h1 className="font-display text-3xl font-semibold leading-[1.08] text-cream-50 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {brand.tagline}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
            {brand.shortDescription}
          </p>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-sm text-cream-100/75">
              {featured.name} · mulai dari
            </span>
            <span className="text-2xl font-semibold text-brand-200">
              {formatRupiah(startingPrice)}
            </span>
          </div>

          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#produk"
              className={buttonClasses(
                "primary",
                "min-h-12 w-full px-7 py-3.5 text-base sm:w-auto",
              )}
            >
              Pesan Sekarang
            </a>
            <a
              href="#cerita"
              className={buttonClasses(
                "secondary",
                "min-h-12 w-full px-7 py-3.5 text-base sm:w-auto",
              )}
            >
              Kenali Kami
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
