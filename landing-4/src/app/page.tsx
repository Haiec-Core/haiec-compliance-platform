import ActionCard from "@/components/containers/actionsCard";
import ContactCard from "@/components/containers/contact";
import FAQ from "@/components/containers/faq";
import FeatureCardsList from "@/components/containers/featureCardsList";
import FeaturedTestimonial from "@/components/containers/featuresTestimonial";
import Hero from "@/components/containers/hero";
import ProcessCardList from "@/components/containers/processCard";

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessCardList />
      <FeatureCardsList />
      <ActionCard/>
      <FeaturedTestimonial />
      <ContactCard />
      <FAQ />
    </>
  );
}
