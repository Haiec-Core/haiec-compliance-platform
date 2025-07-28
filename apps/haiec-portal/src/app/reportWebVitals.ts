import { useReportWebVitals } from "next/web-vitals";
import { NextWebVitalsMetric } from "next/app";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ReactGA from "react-ga4";

export function useMyReportWebVitals() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    } catch (error) {
      console.error(error);
      console.error("Could not initialize Google Analytics.");
    }
  }, []);

  useEffect(() => {
    if (pathname) {
      // pageview(pathname);
      try {
        ReactGA.send({
          hitType: "pageview",
          page: pathname,
        });
      } catch (error) {
        console.error(error);
        console.error("Could not send pageview to Google Analytics.");
      }
    }
  }, [pathname]);

  useReportWebVitals(({ id, name, value }: NextWebVitalsMetric) => {
    try {
      ReactGA.event({
        category: "web-vital",
        label: id, // Needed to aggregate events.
        value: Math.round(name === "CLS" ? value * 1000 : value), // Optional
        nonInteraction: true, // avoids affecting bounce rate.
        action: "web-vital",
      });
    } catch (error) {
      console.error(error);
      console.error("Could not send web-vital to Google Analytics.");
    }
  });
}
