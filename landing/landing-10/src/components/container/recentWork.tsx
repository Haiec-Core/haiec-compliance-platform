"use client";
import Image from "next/image";
import Container from "./container";
import { Typography } from "../ui/typography";
import { ImageIcon } from "@radix-ui/react-icons";

const RecentWork = () => {
  return (
    <Container id="recent_work" className="md:py-20 mb-12">
      <div className="px-4 md:px-24">
        <Typography
          variant="h3"
          className="w-full flex items-center justify-start text-start pb-2 text-primary"
        >
          Recent Work
        </Typography>
        <Typography
          variant="p"
          className="w-full font-light flex items-center justify-start text-start pb-10"
        >
          Great, now that we have your attention, let's see some of my recent
          work.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-8 px-4 md:px-24">
        {/* First row */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-[200px] md:h-[300px] bg-white flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width={3540}
              height={440}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px] bg-white flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width={3540}
              height={440}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px] bg-white flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width={3540}
              height={440}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Second row */}
        <div className="w-full h-[200px] md:h-[300px] col-span-1 md:col-span-1 bg-white flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1622050756792-5b1180bbb873?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            width={3540}
            height={440}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Third row */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px] bg-white flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width={3540}
              height={440}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px] bg-white flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width={3540}
              height={440}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px] bg-white flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width={3540}
              height={440}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecentWork;
