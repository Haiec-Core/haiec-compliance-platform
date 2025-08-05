import { StatsCard } from "@/components/containers/statscard";
import Brands from "@/components/containers/brands";
import Hero from "@/components/containers/hero";
import { Showcase } from "@/components/containers/showcase";
import Spacer from "@/components/ui/spacer";
import FeatureList from "@/components/containers/featurelist";
import Testimonials from "@/components/containers/testimonials";
import ContactCard from "@/components/containers/contact";
import Globe from "@/components/containers/globe";
import FAQ from "@/components/containers/faq";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start">
      <Hero />
      <Spacer type="md" />
      <Showcase />
      <Spacer type="md" />
      <Brands />
      <Spacer type="xl" />
      <Globe />
      <Spacer type="lg" />
      <StatsCard />
      <Spacer type="lg" />
      <FeatureList />
      <FAQ />
      <Testimonials />
      <ContactCard />
    </div>
  );
}
