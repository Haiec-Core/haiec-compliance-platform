import React from "react";
import { Typography } from "../ui/typography";

export const StatsCard = () => {
  const STATS = [
    {
      id: 1,
      metric: "1728",
      label: "Active Companies",
    },
    {
      id: 2,
      metric: "7281",
      label: "Links Created",
    },
    {
      id: 3,
      metric: "8721",
      label: "Clicks Tracked",
    },
  ];
  return (
    <div className="dark:bg-gray-800/10 py-0 w-full flex justify-center items-center dark:border-gray-700">
      <div className="w-full flex flex-wrap gap-8 md:gap-16 justify-center items-center px-8 md:px-16 lg:px-32">
        {STATS.map(({ id, metric, label }) => {
          return (
            <div
              key={id}
              className="bg-card dark:bg-slate-900/80 border border-slate-500/10 rounded-md max-w-[366px] flex w-full h-full py-6 flex-col justify-around items-center"
            >
              <Typography
                variant={"h2"}
                className="font-semibold dark:text-gray-300 text-center"
              >
                {metric}
              </Typography>
              <Typography className="font-semibold dark:text-gray-400 text-center">
                {label}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};
