import { Chakra_Petch, Plus_Jakarta_Sans } from "next/font/google";

export const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-body",
});
