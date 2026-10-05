# Rencana Implementasi — Template Landing Page UMKM "RasaRumah"

> **Untuk pelaksana:** SUB-SKILL WAJIB: gunakan `superpowers:executing-plans` untuk menjalankan rencana ini tugas demi tugas. Langkah memakai kotak centang (`- [ ]`).
>
> **CATATAN PENTING (dari pengguna):** DILARANG melakukan auto-commit. Semua langkah "commit" pada template rencana ini DIGANTI dengan verifikasi lokal (jalankan test/typecheck). Jangan jalankan `git commit`.

**Tujuan:** Membangun landing page React+TS satu halaman untuk produk UMKM yang dapat dipakai ulang sebagai template, dengan konten terpisah dari tampilan dan alur pemesanan WhatsApp yang berfungsi.

**Arsitektur:** Seluruh konten merek/produk/harga/ulasan hidup di `src/content/*` dan dikonsumsi lewat impor bertipe. Logika murni (format, pesanan, pesan WhatsApp) berada di `src/lib/*` dan diuji unit. Komponen tampilan hanya mengonsumsi konten + state pesanan dari `OrderProvider`.

**Tech Stack:** Vite, React 18/19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Vitest + React Testing Library (jsdom), ESLint.

**Spec:** `docs/superpowers/specs/2026-10-05-rasarumah-landing-page-design.md`

## Global Constraints

- Bahasa konten situs: Bahasa Indonesia.
- Tanpa klaim kesehatan, tanpa sertifikasi, ulasan wajib `isDemo: true`.
- Tanpa `href="#"` dan tanpa tombol mati; sosial/kontak memakai target nyata (wa.me, mailto, Google Maps).
- Komponen tampilan tidak boleh memuat teks/harga/nama merek hardcode.
- Mobile-first, responsif, aksesibel (landmark semantik, `aria-expanded` pada FAQ, fokus terlihat).
- `prefers-reduced-motion` dihormati.
- Nomor WhatsApp placeholder `6281234567890` dengan komentar ganti-nomor.
- Perintah verifikasi: `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run dev`.

## Review Focus

1. **Qty di batas bawah (1):** menekan minus saat qty = 1 harus menonaktifkan tombol, bukan menghasilkan qty 0/negatif.
2. **Nomor WhatsApp kosong/invalid:** konfirmasi pesanan harus menampilkan pesan error yang terlihat, bukan membuka tab kosong.
3. **Popup diblokir:** `window.open` mengembalikan null → fallback `window.location.href`.
4. **Produk tanpa varian / detail hilang:** bagian Detail Produk harus tidak crash (render kondisi kosong).
5. **Perpindahan produk:** memilih produk lain mereset varian & qty ke default yang valid (bukan menyisakan qty lama).

---

## Task 1: Scaffold proyek + tooling

**Files:**
- Create: seluruh scaffold Vite (`package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`)
- Create: `vitest.config.ts` (atau blok `test` dalam `vite.config.ts`), `src/test/setup.ts`
- Modify: `package.json` (scripts), `eslint.config.js`

**Interfaces:**
- Produces: scripts `dev`, `build`, `preview`, `test`, `typecheck`, `lint`; konfigurasi Tailwind v4 aktif; lingkungan uji jsdom siap.

- [ ] **Step 1: Scaffold Vite React-TS di direktori saat ini**

Run: `npm create vite@latest . -- --template react-ts`
Expected: struktur proyek Vite React+TS terbuat di `C:\Landing Page\RasaRumah`.

- [ ] **Step 2: Pasang dependensi**

Run: `npm install` lalu `npm install tailwindcss@latest @tailwindcss/vite@latest` lalu `npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`
Expected: `node_modules` terisi, tidak ada error.

- [ ] **Step 3: Konfigurasikan Tailwind v4 di `vite.config.ts`**

Isi kunci: impor `tailwindcss from "@tailwindcss/vite"` dan tambahkan `tailwindcss()` ke `plugins`. Tambahkan juga blok `test` (environment `jsdom`, `globals: true`, `setupFiles: "./src/test/setup.ts"`).

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
```

- [ ] **Step 4: `src/test/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: `src/index.css` minimal**

```css
@import "tailwindcss";
```

- [ ] **Step 6: Set scripts di `package.json`**

Tambahkan `"test": "vitest run"`, `"typecheck": "tsc --noEmit"`, `"lint": "eslint ."`. Tambahkan tipe vitest/globals ke `tsconfig.app.json` (`"types": ["vitest/globals", "@testing-library/jest-dom"]`).

- [ ] **Step 7: Verifikasi scaffold**

Run: `npm run build`
Expected: build sukses, folder `dist/` terbentuk.

- [ ] **Step 8: Verifikasi tipe**

Run: `npm run typecheck`
Expected: tanpa error.

---

## Task 2: Tipe konten + modul konten RasaRumah

**Files:**
- Create: `src/types/content.ts`, `src/content/brand.ts`, `src/content/products.ts`, `src/content/productDetails.ts`, `src/content/advantages.ts`, `src/content/story.ts`, `src/content/reviews.ts`, `src/content/shipping.ts`, `src/content/faq.ts`, `src/content/index.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: —
- Produces: seluruh interface pada spesifikasi bagian 6 (`Brand`, `Product`, `ProductVariant`, `ProductDetail`, `Advantage`, `Story`, `Review`, `ShippingInfo`, `FaqItem`) dan objek konten: `brand`, `products`, `productDetails`, `advantages`, `story`, `reviews`, `shipping`, `faq`. `brand.whatsappNumber: string`.

- [ ] **Step 1: Tulis test validasi konten yang gagal**

```ts
// src/content/content.test.ts
import { describe, it, expect } from "vitest";
import { brand, products, reviews, productDetails, faq } from "./index";

describe("konten RasaRumah", () => {
  it("merek punya nama dan nomor WhatsApp", () => {
    expect(brand.name.length).toBeGreaterThan(0);
    expect(brand.whatsappNumber).toMatch(/^\d{8,15}$/);
  });
  it("setiap produk punya minimal satu varian dengan harga > 0", () => {
    for (const p of products) {
      expect(p.variants.length).toBeGreaterThan(0);
      for (const v of p.variants) expect(v.price).toBeGreaterThan(0);
    }
  });
  it("semua ulasan ditandai demo", () => {
    for (const r of reviews) expect(r.isDemo).toBe(true);
  });
  it("setiap produk punya detail produk", () => {
    for (const p of products) {
      expect(productDetails.some((d) => d.productId === p.id)).toBe(true);
    }
  });
  it("id FAQ unik", () => {
    const ids = faq.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npm run test -- src/content`
Expected: FAIL — modul `./index` belum ada.

- [ ] **Step 3: Implementasikan `src/types/content.ts`**

Salin interface dari spesifikasi bagian 6 apa adanya (dengan `isDemo: true` sebagai literal pada `Review`).

- [ ] **Step 4: Implementasikan modul konten**

- `brand.ts`: `RasaRumah`, tagline, deskripsi, `city: "Bandung"`, `whatsappNumber: "6281234567890"` (disertai komentar `// GANTI dengan nomor WhatsApp klien`), email, `socials` (Instagram, Facebook, TikTok — URL profil nyata/placeholder yang valid, bukan `#`), `businessInfo`.
- `products.ts`: 4 produk; unggulan `Sambal Bawang Rumahan` (`isFeatured: true`) dengan varian 150 g (Rp 25.000) & 250 g (Rp 38.000); produk lain punya 1–2 varian. `imageUrl` memakai URL Unsplash dengan komentar cara ganti.
- `productDetails.ts`: detail untuk tiap produk — `composition`, `weight`, `storage`, `shelfLife`.
- `advantages.ts`: 4 keunggulan berbasis fakta produk (bahan segar, dibuat per pesanan, tanpa pengawet ditulis netral tanpa klaim kesehatan, dikemas aman) — tanpa klaim kesehatan.
- `story.ts`: heading, 2–3 paragraf cerita, 3 langkah proses.
- `reviews.ts`: 3 ulasan contoh, `isDemo: true`.
- `shipping.ts`: heading, notes, 2–3 metode.
- `faq.ts`: 5 pertanyaan umum (pesan, pengiriman, penyimpanan, pembayaran, kadaluarsa).
- `index.ts`: re-export semua.

- [ ] **Step 5: Jalankan test, pastikan lulus**

Run: `npm run test -- src/content`
Expected: PASS semua.

- [ ] **Step 6: Verifikasi tipe**

Run: `npm run typecheck`
Expected: tanpa error.

---

## Task 3: `src/lib/format.ts`

**Files:**
- Create: `src/lib/format.ts`
- Test: `src/lib/format.test.ts`

**Interfaces:**
- Produces: `formatRupiah(value: number): string` — contoh `formatRupiah(38000) === "Rp38.000"`.

- [ ] **Step 1: Tulis test gagal**

```ts
import { describe, it, expect } from "vitest";
import { formatRupiah } from "./format";

describe("formatRupiah", () => {
  it("memformat ribuan dengan titik", () => {
    expect(formatRupiah(38000)).toBe("Rp38.000");
  });
  it("memformat nol", () => {
    expect(formatRupiah(0)).toBe("Rp0");
  });
  it("memformat jutaan", () => {
    expect(formatRupiah(1250000)).toBe("Rp1.250.000");
  });
});
```

- [ ] **Step 2: Jalankan, pastikan gagal**

Run: `npm run test -- src/lib/format`
Expected: FAIL — modul belum ada.

- [ ] **Step 3: Implementasikan**

```ts
export function formatRupiah(value: number): string {
  return "Rp" + new Intl.NumberFormat("id-ID").format(Math.round(value));
}
```

- [ ] **Step 4: Jalankan, pastikan lulus**

Run: `npm run test -- src/lib/format`
Expected: PASS 3/3.

---

## Task 4: `src/lib/order.ts`

**Files:**
- Create: `src/lib/order.ts`
- Test: `src/lib/order.test.ts`

**Interfaces:**
- Produces:
  - `interface OrderSelection { productId: string; variantId: string; quantity: number; customerName?: string; note?: string }`
  - `calculateTotal(price: number, quantity: number): number`
  - `isOrderValid(order: OrderSelection | null): boolean` — true bila order ada, `variantId` non-kosong, `quantity >= 1`.
  - `clampQuantity(next: number): number` — minimal 1.

- [ ] **Step 1: Tulis test gagal**

```ts
import { describe, it, expect } from "vitest";
import { calculateTotal, isOrderValid, clampQuantity } from "./order";

describe("order", () => {
  it("menghitung total", () => {
    expect(calculateTotal(38000, 3)).toBe(114000);
  });
  it("menolak qty < 1", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-5)).toBe(1);
  });
  it("validasi pesanan", () => {
    expect(isOrderValid(null)).toBe(false);
    expect(isOrderValid({ productId: "p", variantId: "", quantity: 1 })).toBe(false);
    expect(isOrderValid({ productId: "p", variantId: "v", quantity: 0 })).toBe(false);
    expect(isOrderValid({ productId: "p", variantId: "v", quantity: 2 })).toBe(true);
  });
});
```

- [ ] **Step 2: Jalankan, pastikan gagal.** Run: `npm run test -- src/lib/order` → FAIL.
- [ ] **Step 3: Implementasikan sesuai interface.**
- [ ] **Step 4: Jalankan, pastikan lulus.** Run: `npm run test -- src/lib/order` → PASS.

---

## Task 5: `src/lib/whatsapp.ts`

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `src/lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: `OrderSelection` dari `./order`; `formatRupiah` dari `./format`.
- Produces:
  - `buildOrderMessage(input: { brand: { name: string }; productName: string; variantName: string; size: string; price: number; quantity: number; customerName?: string; note?: string }): string`
  - `buildWhatsAppUrl(phone: string, message: string): string`
  - `isPhoneValid(phone: string): boolean`

- [ ] **Step 1: Tulis test gagal**

```ts
import { describe, it, expect } from "vitest";
import { buildOrderMessage, buildWhatsAppUrl, isPhoneValid } from "./whatsapp";

describe("whatsapp", () => {
  const base = {
    brand: { name: "RasaRumah" },
    productName: "Sambal Bawang Rumahan",
    variantName: "250 gram", size: "250 g",
    price: 38000, quantity: 2,
    customerName: "Dewi", note: "Level 3",
  };
  it("memuat produk, varian, jumlah, total", () => {
    const msg = buildOrderMessage(base);
    expect(msg).toContain("Sambal Bawang Rumahan");
    expect(msg).toContain("250 gram");
    expect(msg).toContain("2");
    expect(msg).toContain("Rp76.000");
  });
  it("menandai kosong dengan '-'", () => {
    const msg = buildOrderMessage({ ...base, customerName: undefined, note: undefined });
    expect(msg).toContain("-");
  });
  it("membangun URL wa.me ter-encode", () => {
    const url = buildWhatsAppUrl("6281234567890", "a b\nc");
    expect(url).toBe("https://wa.me/6281234567890?text=" + encodeURIComponent("a b\nc"));
  });
  it("validasi nomor", () => {
    expect(isPhoneValid("6281234567890")).toBe(true);
    expect(isPhoneValid("")).toBe(false);
    expect(isPhoneValid("abc")).toBe(false);
  });
});
```

- [ ] **Step 2: Jalankan, pastikan gagal.** Run: `npm run test -- src/lib/whatsapp` → FAIL.
- [ ] **Step 3: Implementasikan** (`buildOrderMessage` memakai `formatRupiah` untuk total = `price*quantity`; baris "Nama"/"Catatan" memakai `|| "-"`).
- [ ] **Step 4: Jalankan, pastikan lulus.** Run: `npm run test -- src/lib/whatsapp` → PASS.
- [ ] **Step 5: Verifikasi tipe.** Run: `npm run typecheck` → tanpa error.

---

## Task 6: OrderProvider + VariantSelector + OrderSummary

**Files:**
- Create: `src/components/order/OrderProvider.tsx`, `src/components/order/VariantSelector.tsx`, `src/components/order/OrderSummary.tsx`
- Test: `src/components/order/order.test.tsx`

**Interfaces:**
- Consumes: `Product`, `ProductVariant`, `Brand` dari `types/content`; `calculateTotal`, `clampQuantity`, `isOrderValid` dari `lib/order`; `formatRupiah`, `buildOrderMessage`, `buildWhatsAppUrl`, `isPhoneValid` dari `lib/*`.
- Produces:
  - `useOrder(): { product: Product | null; variant: ProductVariant | null; quantity: number; setProduct(p: Product): void; setVariant(v: ProductVariant): void; setQuantity(n: number): void; openSummary(): void; closeSummary(): void; isSummaryOpen: boolean }`
  - `<OrderProvider brand={brand}>{children}</OrderProvider>`
  - `<VariantSelector />` dan `<OrderSummary />` merender berdasarkan konteks.

- [ ] **Step 1: Tulis test perilaku yang gagal**

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderProvider, VariantSelector } from "./OrderProvider";
import { products } from "../../content";
import { brand } from "../../content";

function renderSelector() {
  return render(
    <OrderProvider brand={brand}>
      <VariantSelector product={products[0]} />
    </OrderProvider>
  );
}

describe("alur pesanan", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("memilih varian memperbarui harga", async () => {
    const user = userEvent.setup();
    renderSelector();
    await user.click(screen.getByRole("radio", { name: /150 g/i }));
    expect(screen.getByTestId("order-price")).toHaveTextContent("Rp25.000");
  });

  it("tombol minus nonaktif saat qty 1", async () => {
    renderSelector();
    expect(screen.getByRole("button", { name: /kurangi/i })).toBeDisabled();
  });

  it("menampilkan ringkasan sebelum membuka WhatsApp", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockReturnValue(null as never);
    renderSelector();
    await user.click(screen.getByRole("button", { name: /pesan via whatsapp/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });
});
```

Catatan: ekspor `VariantSelector` dari `OrderProvider.tsx` (atau file terpisah) agar impor test konsisten. SESUAIKAN impor test dengan lokasi file final.

- [ ] **Step 2: Jalankan, pastikan gagal.** Run: `npm run test -- src/components/order` → FAIL.
- [ ] **Step 3: Implementasikan `OrderProvider`** — state: `product`, `variant` (default varian pertama saat `setProduct`), `quantity` (default 1), `isSummaryOpen`. `setQuantity` memakai `clampQuantity`. Sediakan `useOrder()`.
- [ ] **Step 4: Implementasikan `VariantSelector`** — daftar varian sebagai `role="radio"` dalam `role="radiogroup"`, kontrol qty (`kurangi`/`tambah`), tampilan harga `data-testid="order-price"`, total, tombol "Pesan via WhatsApp" → `openSummary()`.
- [ ] **Step 5: Implementasikan `OrderSummary`** — `role="dialog"` (modal), menampilkan produk/varian/jumlah/total, kolom nama & catatan, tombol "Lanjut ke WhatsApp". Saat konfirmasi: bila `!isPhoneValid` → tampilkan error; else `window.open(url, "_blank")`; bila hasil null → `window.location.href = url`.
- [ ] **Step 6: Jalankan, pastikan lulus.** Run: `npm run test -- src/components/order` → PASS.

---

## Task 7: UI primitives + layout

**Files:**
- Create: `src/components/ui/Button.tsx`, `Container.tsx`, `SectionHeading.tsx`, `Reveal.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`
- Test: `src/components/layout/layout.test.tsx`

**Interfaces:**
- Consumes: `brand` (untuk Navbar/Footer), `useOrder` (tombol "Pesan Produk" memanggil `openSummary`).
- Produces:
  - `Button`: props `{ as?: "button"|"a"; href?: string; variant?: "primary"|"ghost"; ... }`
  - `Navbar`: nav dengan anchor ke `#produk`, `#cerita`, `#keunggulan`, `#ulasan`, `#faq`, tombol "Pesan Produk", toggle menu mobile (`aria-expanded`).
  - `Footer`: kontak, sosial (href nyata), informasi bisnis.

- [ ] **Step 1: Tulis test gagal** — menu mobile toggle membuka/menutup (`aria-expanded` berubah), dan tombol "Pesan Produk" memanggil `openSummary` (mock provider).
- [ ] **Step 2: Jalankan, pastikan gagal.** Run: `npm run test -- src/components/layout` → FAIL.
- [ ] **Step 3: Implementasikan primitives** (`Reveal` memakai `IntersectionObserver` + hormati `prefers-reduced-motion`).
- [ ] **Step 4: Implementasikan Navbar & Footer** — semua anchor menuju section yang ada; tidak ada `href="#"`.
- [ ] **Step 5: Jalankan, pastikan lulus.** Run: `npm run test -- src/components/layout` → PASS.

---

## Task 8: Sections halaman

**Files:**
- Create: `src/components/sections/Hero.tsx`, `Story.tsx`, `Advantages.tsx`, `Products.tsx`, `ProductDetail.tsx`, `Reviews.tsx`, `Shipping.tsx`, `Faq.tsx`, `ClosingCta.tsx`
- Test: `src/components/sections/sections.test.tsx`

**Interfaces:**
- Consumes: seluruh modul `content`; `useOrder`; `OrderProvider`; `VariantSelector`.
- Produces: tiap section merender kontennya; `Products` memanggil `setProduct` saat varian/produk dipilih dan men-scroll/arahkan ke `#produk-detail`; `ProductDetail` menampilkan detail produk terpilih; `Faq` accordion dengan `aria-expanded` + `role="region"`.

- [ ] **Step 1: Tulis test gagal** — FAQ toggle buka/tutup; `ProductDetail` menampilkan komposisi produk terpilih; `Products` mengubah produk terpilih saat diklik.
- [ ] **Step 2: Jalankan, pastikan gagal.** Run: `npm run test -- src/components/sections` → FAIL.
- [ ] **Step 3: Implementasikan Hero** — foto besar, nama produk unggulan, deskripsi singkat, harga mulai, tombol "Pesan Sekarang" (ke `#produk`), dan tombol sekunder.
- [ ] **Step 4: Implementasikan Story, Advantages, Reviews, Shipping, ClosingCta** dari konten. Ulasan menampilkan label "Ulasan contoh".
- [ ] **Step 5: Implementasikan Products + ProductDetail** — grid produk, klik produk → `setProduct` + tampilkan `VariantSelector`; detail menampilkan komposisi/berat/penyimpanan/masa simpan dengan guard bila detail tidak ada.
- [ ] **Step 6: Implementasikan Faq** — accordion aksesibel.
- [ ] **Step 7: Jalankan, pastikan lulus.** Run: `npm run test -- src/components/sections` → PASS.

---

## Task 9: Rakit App + tema

**Files:**
- Modify: `src/App.tsx`, `src/index.css`, `src/main.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `OrderProvider`, seluruh section, `brand`.
- Produces: halaman lengkap `<OrderProvider brand={brand}>` membungkus Navbar + main (semua section) + Footer + `OrderSummary`.

- [ ] **Step 1: Tulis test gagal (smoke)** — render App, pastikan ada heading merek, ada bagian FAQ, dan tidak ada anchor `href="#"`.

```tsx
it("tidak punya tautan mati", () => {
  render(<App />);
  const dead = document.querySelectorAll('a[href="#"], a[href=""]');
  expect(dead.length).toBe(0);
});
```

- [ ] **Step 2: Jalankan, pastikan gagal.** Run: `npm run test -- src/App` → FAIL.
- [ ] **Step 3: Definisikan token tema di `index.css`** (`@theme`): warna brand (mis. terracotta/merah bata hangat), accent, font display & body (mis. Plus Jakarta Sans / Fraunces via Google Fonts di `index.html`), radius.
- [ ] **Step 4: Rakit `App.tsx`** dengan landmark `<header>/<main>/<footer>`, semua section, dan `OrderSummary` global.
- [ ] **Step 5: Jalankan, pastikan lulus.** Run: `npm run test -- src/App` → PASS.
- [ ] **Step 6: Verifikasi tipe.** Run: `npm run typecheck` → tanpa error.

---

## Task 10: Verifikasi menyeluruh

**Files:** — (tidak ada file baru)

- [ ] **Step 1: Suite lengkap.** Run: `npm run test` → semua lulus.
- [ ] **Step 2: Typecheck.** Run: `npm run typecheck` → tanpa error.
- [ ] **Step 3: Lint.** Run: `npm run lint` → tanpa error (perbaiki bila ada).
- [ ] **Step 4: Build produksi.** Run: `npm run build` → sukses.
- [ ] **Step 5: Cek tautan mati manual.** Run pencarian `href="#"` di `src/` → tidak ada hasil.
- [ ] **Step 6: Jalankan dev server.** Run: `npm run dev` (background) → buka halaman, pastikan tanpa error konsol; hentikan server setelah selesai.
