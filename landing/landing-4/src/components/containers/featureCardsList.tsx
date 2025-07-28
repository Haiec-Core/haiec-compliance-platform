import React from "react";
import FeatureCard from "./featureCard";
import { SHOWCASE_FEATURES } from "@/lib/enums";
import Container from "./container";

const FeatureCardsList = () => {
  return (
    <Container classNames="bg-cyan-50 py-10">
      <section className="col-span-12 row-auto grid h-full w-full overflow-visible bg-inherit">
        {SHOWCASE_FEATURES.map((feature, idx) => (
          <FeatureCard key={feature.title} id={idx + 1} feature={feature} />
        ))}
      </section>
    </Container>
  );
};

export default FeatureCardsList;
