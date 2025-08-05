import { Footer } from "./Footer";
import HeroSection from "./HeroSection";
import CTA from "./cta";
import FAQ from "./faq";
import Features from "./features";
import Integration from "./integration";
import LogoCloud from "./logo-cloud";
import Pricing from "./pricing";
import Quotetion from "./quotetion";
import Testimonials from "./testimonials";

export const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <LogoCloud />
      <Features />
      <Quotetion />
      <Integration />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};
