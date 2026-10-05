import { brand } from "./content";
import { OrderProvider } from "./components/order/OrderProvider";
import { OrderSummary } from "./components/order/OrderSummary";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Story } from "./components/sections/Story";
import { Advantages } from "./components/sections/Advantages";
import { Products } from "./components/sections/Products";
import { ProductDetail } from "./components/sections/ProductDetail";
import { Reviews } from "./components/sections/Reviews";
import { Shipping } from "./components/sections/Shipping";
import { Faq } from "./components/sections/Faq";
import { ClosingCta } from "./components/sections/ClosingCta";

export default function App() {
  return (
    <OrderProvider brand={brand}>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Advantages />
        <Products />
        <ProductDetail />
        <Reviews />
        <Shipping />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
      <OrderSummary />
    </OrderProvider>
  );
}
