import React from "react";
import Container from "../ui/container";
import { Typography } from "../ui/typography";
import Image from "next/image";

const SecondShowcase = () => {
  return (
    <Container classNames="py-10 bg-primary-100/20 dark:bg-primary-900/10">
      <div className="col-span-12 relative w-full max-w-7xl mx-auto h-full py-10 px-5 grid grid-cols-12 gap-8 lg:gap-12 min-h-96">
        <div className="flex lg:col-span-5 col-span-12 flex-col justify-center items-start text-start">
          <Typography variant={"h2"} className="text-start">
            Create thousands of Unique Starters
          </Typography>
          <Typography className="text-start">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti,
            voluptatem expedita, cumque tempore magni voluptatibus doloribus
            eligendi, minima quibusdam facilis atque cum perferendis mollitia
            nostrum qui maiores harum voluptate quia!
          </Typography>
        </div>
        <div className="hidden lg:flex justify-center w-full h-full col-span-5 relative">
          <Image
            width={425}
            height={425}
            alt="expected"
            className="xl:absolute xl:max-w-2xl 2xl:max-w-3xl drop-shadow-xl  mt-8 [transform:rotateX(40deg)_rotate(40deg)_scale(1)] hover:scale-110 transition-all right-0 rounded-lg bg-gray-300 object-cover shadow-lg"
            src={
              "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1703582349/admin-dashboard_pzonvt.webp"
            }
          />
        </div>
      </div>
    </Container>
  );
};

export default SecondShowcase;
