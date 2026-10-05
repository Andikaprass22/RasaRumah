export interface SocialLink {
  label: string;
  href: string;
}

export interface BusinessInfoItem {
  label: string;
  value: string;
}

export interface Brand {
  name: string;
  tagline: string;
  shortDescription: string;
  city: string;
  /** Format internasional tanpa '+', contoh "6281234567890". */
  whatsappNumber: string;
  email: string;
  socials: SocialLink[];
  businessInfo: BusinessInfoItem[];
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  /** Harga dalam rupiah (bilangan bulat). */
  price: number;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  isFeatured: boolean;
  variants: ProductVariant[];
}

export interface ProductDetail {
  productId: string;
  composition: string[];
  weight: string;
  storage: string;
  shelfLife: string;
  notes?: string;
}

export interface Advantage {
  title: string;
  description: string;
}

export interface StoryStep {
  title: string;
  description: string;
}

export interface Story {
  heading: string;
  paragraphs: string[];
  steps: StoryStep[];
  imageUrl: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  /** Selalu true — menandai ulasan sebagai contoh, bukan testimoni terverifikasi. */
  isDemo: true;
}

export interface ShippingMethod {
  title: string;
  description: string;
}

export interface ShippingInfo {
  heading: string;
  notes: string[];
  methods: ShippingMethod[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
