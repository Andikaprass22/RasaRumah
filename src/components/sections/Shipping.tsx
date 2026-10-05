import { shipping } from "../../content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function Shipping() {
  return (
    <section id="pengiriman" className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Pengiriman & Pemesanan"
            title={shipping.heading}
          />
          <ul className="flex flex-col gap-3">
            {shipping.notes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-sm leading-relaxed text-ink-600"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4">
          {shipping.methods.map((method) => (
            <div
              key={method.title}
              className="rounded-2xl border border-cream-200 bg-cream-50 p-5"
            >
              <h3 className="text-base font-semibold text-ink-900">
                {method.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
