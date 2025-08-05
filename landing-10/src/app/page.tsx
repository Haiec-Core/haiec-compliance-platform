import Blogs from "@/components/container/blogs";
import Brands from "@/components/container/brands";
import ContactCard from "@/components/container/contact";
import CoreFeatures from "@/components/container/corefeatures";
import FeatureSection from "@/components/container/featureSection";
import Hero from "@/components/container/hero";
import RecentWork from "@/components/container/recentWork";
import Showcase from "@/components/container/showcase";
import Testimonials from "@/components/container/testimonials";

import Pricing from "@/components/container/pricing";
import TestimonialFeatureCard from "@/components/container/testimonialFeatureCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <Hero />
      <Brands/>
      <Showcase />
      <Testimonials />
      <CoreFeatures/>
      <FeatureSection/>
      <RecentWork/>
      <TestimonialFeatureCard/>
      <ContactCard customPlan={false}/>
      <Pricing />
      <ContactCard customPlan={true} />
      <Blogs />
      <ContactCard customPlan={false}/>
    </main>
  );
}
