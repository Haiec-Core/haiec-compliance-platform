"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

const CARD_COLORS = ["#266678", "#cb7c7a", "#36a18b", "#cda35f", "#747474"];
const CARD_OFFSET = 5;
const SCALE_FACTOR = 0.06;

interface CardStackProps {
  images: StaticImageData[];
  interval?: number;
}

export const StackedCards: React.FC<CardStackProps> = ({
  images,
  interval = 6000,
}) => {
  const [imageIndices, setImageIndices] = useState<number[]>(
    Array.from({ length: images.length }, (_, i) => i),
  );

  const moveToEnd = () => {
    setImageIndices((prevIndices) => {
      const [first, ...rest] = prevIndices;
      return [...rest, first];
    });
  };

  useEffect(() => {
    const timer = setInterval(moveToEnd, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative flex items-center justify-center">
      <AspectRatio className="relative w-full" ratio={16 / 10}>
        <ul className="relative w-full h-full">
          <AnimatePresence initial={false}>
            {imageIndices.map((imageIndex, displayIndex) => {
              const canDrag = displayIndex === 0;
              const color = CARD_COLORS[displayIndex % CARD_COLORS.length];
              const image = images[imageIndex];

              return (
                <motion.li
                  key={imageIndex}
                  className="absolute inset-0 rounded-lg select-none pointer-events-none border-2 border-foreground list-none origin-top-center"
                  style={{
                    backgroundColor: color,
                    cursor: canDrag ? "grab" : "auto",
                  }}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1 - displayIndex * SCALE_FACTOR,
                    top: displayIndex * -CARD_OFFSET,
                    zIndex: images.length - displayIndex,
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
                      src={image}
                      alt={`Card ${displayIndex + 1}`}
                      fill
                      className="rounded-md object-cover"
                      priority={displayIndex === 0}
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
