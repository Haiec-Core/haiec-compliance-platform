import BottomWave from "@/components/containers/bottomwave";
import Brands from "@/components/containers/brands";
import ContactCard from "@/components/containers/contact";
import FeatureCardsList from "@/components/containers/featureCardsList";
import FeaturedTestimonial from "@/components/containers/featuresTestimonial";
import Hero from "@/components/containers/hero";
import Preview from "@/components/containers/preview";
import Showcase from "@/components/containers/showcase";
import TopWave from "@/components/containers/topwave";
import WorkingBrands from "@/components/containers/workingBrands";


export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Preview />
      <BottomWave type="curved-up" />
      <FeatureCardsList />
      <Showcase />
   
      <FeaturedTestimonial />
      <WorkingBrands />
      <ContactCard />
    </>
  );
}
