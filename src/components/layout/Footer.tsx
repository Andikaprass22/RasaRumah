import { brand } from "../../content";
import { Container } from "../ui/Container";

export function Footer() {
  const whatsapp = brand.whatsappNumber.replace(/[^\d]/g, "");
  const mapQuery = encodeURIComponent(`${brand.name}, ${brand.city}`);

  return (
    <footer className="border-t border-white/10 bg-ink-900 text-cream-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold text-cream-50">
            {brand.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream-200/80">
            {brand.shortDescription}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cream-50">
            Kontak
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand-300"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="transition-colors hover:text-brand-300"
              >
                {brand.email}
              </a>
            </li>
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand-300"
              >
                Lihat lokasi
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cream-50">
            Media Sosial
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {brand.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand-300"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cream-50">
            Informasi Usaha
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {brand.businessInfo.map((item) => (
              <li key={item.label}>
                <span className="text-cream-200/70">{item.label}: </span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <Container className="text-xs text-cream-200/60">
          © {new Date().getFullYear()} {brand.name}. Konten demo — ganti seluruh
          data di folder <span className="font-mono">src/content</span>.
        </Container>
      </div>
    </footer>
  );
}
