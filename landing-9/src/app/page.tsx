import Brands from "@/components/containers/brands";
import FeaturedTestimonial from "@/components/containers/featuresTestimonial";
import Hero from "@/components/containers/hero";
import Membership from "@/components/containers/membership";
import Overview from "@/components/containers/overview";
import Pricing from "@/components/containers/pricing";
import RecentWork from "@/components/containers/recentWork";
import Showcase from "@/components/containers/showcase";
import ShowcaseFeatures from "@/components/containers/showcaseFeatures";
import WalkThrough from "@/components/containers/walkthrough";
import FAQ from "@/components/containers/faq";
import CoreFeatures from "@/components/containers/coreFeatures";
import Testimonials from "@/components/containers/testimonial";
import ContactCard from "@/components/containers/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-w-[100vw] overflow-hidden bg-background">
      <Hero />
      <Brands />
      <Showcase />
      <FeaturedTestimonial />
      <CoreFeatures />
      <RecentWork />
      <Testimonials />
      <Pricing />
      <ContactCard customPlan={true} />
      <FAQ />
    </main>
  );
}
