import { Footer } from "./Footer";
import HeroSection from "./HeroSection";
import CTA from "./cta";
import FAQ from "./faq";
import Integration from "./integration";
import LogoCloud from "./logo-cloud";
import Pricing from "./pricing";
import Quotation from "./quotetion";
import Testimonials from "./testimonials";

export const LandingPage = () => {
  return (
    <div className="flex flex-col gap-16">
      <HeroSection />
      <LogoCloud />
      <Integration />
      <Quotation />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};
