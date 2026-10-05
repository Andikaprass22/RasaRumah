import { reviews } from "../../content";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Reviews() {
  return (
    <section id="ulasan" className="bg-cream-100/60 py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Ulasan Pelanggan"
          title="Kata mereka setelah mencoba"
          description="Ulasan berikut adalah contoh untuk keperluan demo template dan belum diverifikasi."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Reveal key={review.id}>
              <figure className="flex h-full flex-col gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-brand-500" aria-hidden="true">
                    {"★".repeat(review.rating)}
                    <span className="text-cream-300">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </span>
                  <span className="text-xs text-ink-500">
                    {review.rating} dari 5
                  </span>
                  <span className="rounded-full bg-cream-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-600">
                    Ulasan contoh
                  </span>
                </div>
                <blockquote className="text-sm leading-relaxed text-ink-700">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-auto text-sm font-semibold text-ink-800">
                  {review.name}
                  <span className="font-normal text-ink-500">
                    {" "}
                    · {review.location}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
