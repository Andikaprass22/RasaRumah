import { useEffect, useState } from "react";
import { useOrder } from "../order/order-context";
import { brand } from "../../content";
import { buttonClasses } from "../ui/buttonStyles";
import { Container } from "../ui/Container";

const navLinks = [
  { href: "#produk", label: "Produk" },
  { href: "#cerita", label: "Cerita" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#ulasan", label: "Ulasan" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { openSummary } = useOrder();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 24,
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        isScrolled
          ? "border-cream-200 bg-cream-50/95 backdrop-blur"
          : "border-transparent bg-gradient-to-b from-ink-900/60 via-ink-900/25 to-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-2 sm:gap-4">
        <a
          href="#atas"
          className={`font-display text-lg font-semibold transition-colors sm:text-xl ${
            isScrolled ? "text-brand-700" : "text-cream-50"
          }`}
        >
          {brand.name}
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-ink-600 hover:text-brand-700"
                  : "text-cream-100/90 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSummary}
            className={buttonClasses("primary", "min-h-11 px-3 py-2 sm:px-4")}
          >
            Pesan Produk
          </button>
          <button
            type="button"
            data-testid="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setIsOpen((value) => !value)}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden ${
              isScrolled
                ? "text-ink-700 hover:bg-cream-100"
                : "text-cream-50 hover:bg-white/10"
            }`}
          >
            <span aria-hidden="true" className="text-xl">
              {isOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </Container>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-cream-200 bg-cream-50 md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-cream-100"
              >
                {link.label}
              </a>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
