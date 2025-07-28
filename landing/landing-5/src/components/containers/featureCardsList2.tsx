import React from "react";
import FeatureCard2 from "./featureCard2";
import { SHOWCASE_FEATURES } from "@/lib/enums";
import Container from "@ui/container";

const FeatureCardsList2 = () => {
  return (
    <Container classNames=" overflow-visible">
      <section className="col-span-12 row-auto grid h-full w-full gap-8 overflow-visible bg-inherit">
        {SHOWCASE_FEATURES.map((feature, idx) => (
          <FeatureCard2 key={feature.title} id={idx + 1} feature={feature} />
        ))}
      </section>
    </Container>
  );
};

export default FeatureCardsList2;
