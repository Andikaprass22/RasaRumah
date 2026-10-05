export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-cream-50 hover:bg-brand-700",
  secondary:
    "bg-cream-50 text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-cream-100",
  ghost: "text-ink-700 hover:bg-cream-100",
};

/** Kelas tombol yang bisa dipakai ulang baik pada <button> maupun <a>. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  className = "",
): string {
  return `${base} ${variants[variant]} ${className}`;
}
