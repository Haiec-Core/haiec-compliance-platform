import Hero from "@/components/containers/hero";
import Banner from "@/components/containers/banner";
import ContactCard from "@/components/containers/contactCard";
import Testimonials from "@/components/containers/testimonials";
import FeatureCardsList from "@/components/containers/featureCardsList";
import Spacer from "@/components/ui/spacer";
import Pricing from "@/components/containers/pricing";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-between">
      <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] dark:bg-primary-foreground dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)]"></div>
      <Hero />
      <Spacer type="md" />
      <Banner />
      <Spacer type="md" />
      <Testimonials />
      <Spacer type="lg" />
      <FeatureCardsList />
      <Spacer type="lg" />
      <Pricing />
      <ContactCard />
    </main>
  );
}
