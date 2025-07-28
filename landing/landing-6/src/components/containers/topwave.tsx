import { cn } from "@/lib/utils";
import Image from "next/image";

const TopWave = () => {
  return (
    <div className="w-full h-[140px] relative ">
      <Image
        src={`wave-haikei-top.svg`}
        fill
        alt={`Top wave`}
        className={cn("object-cover")}
      />
    </div>
  );
};

export default TopWave;
