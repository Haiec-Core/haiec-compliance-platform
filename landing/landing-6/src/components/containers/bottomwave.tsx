import { cn } from "@/lib/utils";
import Image from "next/image";

const BottomWave = ({
  type = "bottom",
}: {
  type?: "top" | "bottom" | "arc-up" | "curved-up" | "curved-bottom";
}) => {
  return (
    <div className="w-full md:h-[140px] relative ">
      <Image
        src='/wave.svg'
        fill
        alt={`${type} wave`}
        className={cn("object-cover")}
      />
    </div>
  );
};

export default BottomWave;
