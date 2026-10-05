import { story } from "../../content";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";

export function Story() {
  return (
    <section id="cerita" className="bg-cream-100/60 py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SmartImage
            src={story.imageUrl}
            alt="Proses pembuatan produk RasaRumah"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
          />
        </Reveal>

        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="Cerita Kami" title={story.heading} />
          <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-600">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ol className="mt-2 flex flex-col gap-4">
            {story.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-cream-50">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink-800">{step.title}</p>
                  <p className="text-sm leading-relaxed text-ink-500">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
