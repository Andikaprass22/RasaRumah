import { useState } from "react";
import { faq } from "../../content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
          align="center"
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-cream-200 bg-cream-50"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink-800 transition-colors hover:bg-cream-100"
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className={`text-lg text-brand-600 transition-transform motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      ＋
                    </span>
                  </button>
                </h3>
                <div
                  id={`${item.id}-panel`}
                  role="region"
                  aria-label={item.question}
                  hidden={!isOpen}
                  className="px-5 pb-4 text-sm leading-relaxed text-ink-600"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
