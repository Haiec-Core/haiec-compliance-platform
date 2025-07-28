import Blogs from "@/components/containers/blogs";
import Brands from "@/components/containers/brands";
import ContactCard from "@/components/containers/contact";
import FeatureCardsList from "@/components/containers/featureCardsList";
import Vision from "@/components/containers/vision";
import Hero from "@/components/containers/hero";
import Preview from "@/components/containers/preview";
import Showcase from "@/components/containers/showcase";
import Testimonials from "@/components/containers/testimonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureCardsList />
      <Showcase />
      <Vision />
      <Testimonials />
      <Blogs />
      <ContactCard />
    </main>
  );
}
