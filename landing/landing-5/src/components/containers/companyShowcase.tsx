"use client";
import Image from "next/image";
import Container from "@ui/container";
import { Typography } from "../ui/typography";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { companyShowcase } from "@/lib/enums";
import Marquee from "../ui/marquee";

export default function CompanyShowcase() {
  return (
    <Container classNames="relative">
      <div className="col-span-12 row-span-1 pt-5 pb-2 md:pt-56 md:pb-10 flex flex-col justify-start items-start space-y-16 ">
        <div className="flex flex-col items-start justify-start max-w-[100vw] space-y-8 overflow-hidden">
          <Marquee numberOfCopies={companyShowcase.length - 1} pauseOnHover fade className="py-2">
            {companyShowcase.map((companyItem, index) => (
              <CompanyCard
                key={`${companyItem.company.name}-${index}`}
                company={companyItem.company}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </Container>
  );
}

const CompanyCard = ({ company }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["10deg", "-10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const percX = mouseX / width - 0.5;
    const percY = mouseY / height - 0.5;

    x.set(percX);
    y.set(percY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.figure
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      key={company.name}
      className="max-w-[20rem] p-6 flex justify-between flex-col items-start space-y-4"
    >
      <Image
        width={100}
        height={100}
        className="h-20 w-50 "
        src={company.logo}
        alt={`${company.name} logo`}
      />
  
    </motion.figure>
  );
};
