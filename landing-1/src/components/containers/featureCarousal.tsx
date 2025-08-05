import clsx from "clsx";

type Props = {
  direction: "reverse" | "default";
};
export default function FeatureCarousel() {
  const FEATURES = [
    { src: "LinkedIn Carousalling", alt: "Facebook" },
    { src: "Add Emoji", alt: "Disney" },
    { src: "Posts for you", alt: "Airbnb" },
    { src: "Post Formatting", alt: "Apple" },
    { src: "Seamless Scheduling", alt: "Spark" },
    { src: '"See more" Preview', alt: "Samsung" },
    { src: "Calendar View", alt: "Quora" },
    { src: "Bold & Italic", alt: "Sass" },
  ];

  return (
    <div className="mb-8 flex w-full flex-col items-start justify-start gap-12 overflow-hidden">
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <AnimatingList features={FEATURES} />
        <AnimatingList features={FEATURES} />
        <AnimatingList features={FEATURES} />
      </div>
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <AnimatingList features={FEATURES} direction="reverse" />
        <AnimatingList features={FEATURES} direction="reverse" />
        <AnimatingList features={FEATURES} direction="reverse" />
      </div>
    </div>
  );
}

const AnimatingList = ({
  features,
  direction = "default",
}: {
  features: { src: string }[];
  direction?: "reverse" | "default";
}) => {
  return (
    <ul
      className={clsx(
        "mx-4 flex items-center justify-center gap-6 py-2 will-change-transform md:justify-start md:py-4",
        direction === "default"
          ? "animate-infinite-scroll"
          : "animate-reverse-infinite-scroll",
      )}
    >
      {features.map((feat: { src: string }) => (
        <li
          className="over:from-gray-300/20 flex w-full min-w-[12rem] cursor-pointer flex-nowrap items-center justify-center rounded-full bg-white bg-gradient-to-t from-gray-50   to-transparent py-2 font-medium text-gray-500 shadow-[1px_-0px_0px_1px,-1px_0px_0px_1px]  shadow-gray-300/40 hover:text-gray-700  hover:shadow-slate-500/20 md:py-4 dark:bg-muted dark:from-gray-900 dark:shadow-gray-600/40 dark:hover:text-gray-400 dark:hover:shadow-slate-300/20"
          key={feat.src}
        >
          {feat.src}
        </li>
      ))}
    </ul>
  );
};
