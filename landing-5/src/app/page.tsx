import Brands from "@/components/containers/brands";
import CallToAction from "@/components/containers/callToAction";
import ContactCard from "@/components/containers/contact";
import FAQ from "@/components/containers/faq";
import FeatureCardsList from "@/components/containers/featureCardsList";
import FeatureCardsList2 from "@/components/containers/featureCardsList2";
import FeatureShowcase from "@/components/containers/featureShowcase";
import Hero from "@/components/containers/hero";
import Pricing from "@/components/containers/pricing";
import Promotion from "@/components/containers/promotion";
import Showcase from "@/components/containers/showcase";
import SecondShowcase from "@/components/containers/showcasev2";
import Testimonials from "@/components/containers/testimonials";
import CompanyShowcase from "@/components/containers/companyShowcase";
export default function Home() {
  return (
    <main>
      <Hero />
      <CompanyShowcase/>
      <Showcase />
      <FeatureShowcase />
      <FeatureCardsList/>
      <ContactCard />
      <FeatureCardsList2/>
      <Testimonials />
      
      <Pricing />
      <FAQ />
    
    </main>
  );
}
