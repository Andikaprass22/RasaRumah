import { brand } from "../../content";
import { useOrder } from "../order/order-context";
import { Container } from "../ui/Container";

export function ClosingCta() {
  const { openSummary } = useOrder();

  return (
    <section className="bg-brand-700 py-16 text-cream-50 sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
          Siap memesan untuk keluarga atau oleh-oleh?
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-cream-100/85">
          Isi ringkasan pesanan, lalu lanjutkan ke WhatsApp. Kami akan
          mengonfirmasi ketersediaan dan ongkos kirim.
        </p>
        <button
          type="button"
          onClick={openSummary}
          className="inline-flex items-center justify-center rounded-full bg-cream-50 px-6 py-3 text-base font-semibold text-brand-700 transition-colors hover:bg-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
        >
          Pesan via WhatsApp
        </button>
        <p className="text-sm text-cream-100/70">
          {brand.email} · {brand.city}
        </p>
      </Container>
    </section>
  );
}
