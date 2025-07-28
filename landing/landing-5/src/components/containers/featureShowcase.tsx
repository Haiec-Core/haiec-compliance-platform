import React from "react";
import Container from "../ui/container";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";

type CardFeature = {
  title: string;
  description: string;
  imgSrc: string;
};

const Card: React.FC<CardFeature> = ({ title, description, imgSrc }) => (
  <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-start text-start space-y-4">
    <div className="w-full flex justify-center">
      <img src={imgSrc} alt={title} className="w-full h-48 object-cover rounded-lg" />
    </div>
    <Typography variant={"p"} className="text-2xl font-semibold">
      {title}
    </Typography>
    <Typography className="text-base leading-7">
      {description}
    </Typography>
  </div>
);

const FeatureShowcase: React.FC = () => {
  // Array of card data
  const cards: CardFeature[] = [
    {
      title: "Feature 1",
      description: "This is the description for Feature 1.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      title: "Feature 2",
      description: "This is the description for Feature 2.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      title: "Feature 3",
      description: "This is the description for Feature 3.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      title: "Feature 4",
      description: "This is the description for Feature 4.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      title: "Feature 5",
      description: "This is the description for Feature 5.",
      imgSrc: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Container>
      <div className="max-w-7xl w-full mx-auto col-span-12 h-full flex flex-col py-20 items-center space-y-20">
        <div className="w-full flex flex-col justify-start items-center text-center space-y-4">
          <Typography variant={"h1"} className="text-primary md:text-4xl font-bold">
            Get an overview of what&apos;s inside
          </Typography>
          <Typography className="md:text-lg font-base">
            Leverage decades of web development experience to get a head start
            on your next project.
          </Typography>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:col-span-12">
            {cards.slice(0, 3).map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                imgSrc={card.imgSrc}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-12">
            {cards.slice(3, 5).map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                imgSrc={card.imgSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeatureShowcase;
