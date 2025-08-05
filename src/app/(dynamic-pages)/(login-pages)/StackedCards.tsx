"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CARD_COLORS = ["#266678", "#cb7c7a", "#36a18b", "#cda35f", "#747474"];
const CARD_OFFSET = 5;
const SCALE_FACTOR = 0.06;

interface CardStackProps {
  images: string[];
  interval?: number;
}

function withSequentialKey(
  imageUrl: string,
  index: number,
  totalImages: number,
) {
  return `${imageUrl}?id=${index * totalImages}`;
}

export const StackedCards: React.FC<CardStackProps> = ({
  images,
  interval = 6000,
}) => {
  const [cards, setCards] = useState<string[]>(() =>
    images.map((url, index) => withSequentialKey(url, index, images.length)),
  );

  const moveToEnd = () => {
    setCards((prevCards) => {
      const [firstCard, ...rest] = prevCards;
      return [...rest, firstCard];
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      moveToEnd();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative flex items-center justify-center">
      <AspectRatio className="relative w-full" ratio={16 / 10}>
        <ul className="relative w-full h-full">
          <AnimatePresence initial={false}>
            {cards.map((imageUrl, index) => {
              const canDrag = index === 0;
              const color = CARD_COLORS[index % CARD_COLORS.length];

              return (
                <motion.li
                  key={imageUrl}
                  className="absolute inset-0 rounded-lg select-none pointer-events-none border-2 border-foreground list-none origin-top-center"
                  style={{
                    backgroundColor: color,
                    cursor: canDrag ? "grab" : "auto",
                  }}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1 - index * SCALE_FACTOR,
                    top: index * -CARD_OFFSET,
                    zIndex: cards.length - index,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="w-full h-full bg-transparent">
                    <Image
                      src={imageUrl}
                      alt={`Card ${index + 1}`}
                      fill
                      className="rounded-md object-cover"
                      loader={({ src }) => src}
                    />
                  </Card>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </AspectRatio>
    </div>
  );
};
