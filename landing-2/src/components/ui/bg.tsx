import React from "react";

const BackgroundBanner = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-lime-50 dark:bg-gray-950">
      <div
        className="fixed inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem]"
        />
      </div>
      <div
        className="fixed inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none xl:ml-0 xl:mr-[calc(50%-12rem)]"
        />
      </div>
    </div>
  );
};

export default BackgroundBanner;
