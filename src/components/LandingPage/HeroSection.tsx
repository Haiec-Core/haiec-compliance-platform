import { Link } from "@/components/intl-link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { AvatarCirclesDemo } from "./AvatarCirclesDemo";

export default function HeroSection() {
  return (
    <section className="py-10 lg:py-20 text-left px-6 lg:text-center max-w-5xl mx-auto">
      <div className="flex flex-col gap-10 w-full">
        <div className="space-y-4 flex flex-col  lg:items-center  flex-1">
          <Link href={"#"}>
            <div className="flex items-center  gap-2 py-1 px-3 w-fit rounded-full border border-border dark:border-none bg-secondary">
              <Sparkles size={16} />
              <span className="text-md font-medium lg:text-base">
                Introducing
              </span>
              <ArrowRight size={16} />
            </div>
          </Link>
          <h1 className="font-semibold text-3xl lg:text-5xl">
            Nextbase Ultimate Landing Page
          </h1>
          <p className="text-muted-foreground leading-loose lg:text-lg lg:leading-relaxed max-w-4xl">
            Welcome to Nextbase Ultimate Landing Page: Your Gateway to
            Innovation. Discover the Future of Excellence and Elevate Your
            Experience.
          </p>
          <div className="flex flex-col md:flex-row items-center max-w-md w-full  gap-3 pt-2 ">
            <Button className="w-full" asChild>
              <Link href={"/login"}>
                Log In
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button className="w-full" variant={"secondary"}>
              Learn More
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <AvatarCirclesDemo />
        </div>
        <div className="relative w-full aspect-21/9 rounded-md border-2 border-border shadow-xs overflow-hidden">
          <Image
            alt="Hero Image"
            src="/images/hero.jpeg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
