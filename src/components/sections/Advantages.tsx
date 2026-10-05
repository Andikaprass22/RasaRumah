import { advantages } from "../../content";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Advantages() {
  return (
    <section id="keunggulan" className="py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Kenapa RasaRumah"
          title="Dibuat dengan cara yang bisa kami pertanggungjawabkan"
          description="Setiap produk melewati proses sederhana yang kami jaga konsisten dari hari ke hari."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <Reveal key={advantage.title}>
              <article className="flex h-full flex-col gap-2 rounded-2xl border border-cream-200 bg-cream-50 p-6">
                <h3 className="text-lg font-semibold text-ink-900">
                  {advantage.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-600">
                  {advantage.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
