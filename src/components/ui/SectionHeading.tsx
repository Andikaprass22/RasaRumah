export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-2xl font-semibold text-ink-900 sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? (
        <p className="text-base leading-relaxed text-ink-600">{description}</p>
      ) : null}
    </div>
  );
}
