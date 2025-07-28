import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      fuchsia: colors.fuchsia,
      neutral: colors.neutral,
      gray: colors.gray,
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "rgb(var(--primary-main)/ <alpha-value>)",
        foreground: "var(--primary-foreground-hex))",
        100: "rgb(var(--primary-lighter)/ <alpha-value>)",
        300: "rgb(var(--primary-light)/ <alpha-value>)",
        500: "rgb(var(--primary-main)/ <alpha-value>)",
        700: "rgb(var(--primary-dark)/ <alpha-value>)",
        900: "rgb(var(--primary-darker)/ <alpha-value>)",
      },
      secondary: {
        DEFAULT: "rgb(var(--secondary-main)/ <alpha-value>)",
        foreground: "var(--secondary-foreground-hex))",
        100: "rgb(var(--secondary-lighter)/ <alpha-value>)",
        300: "rgb(var(--secondary-light)/ <alpha-value>)",
        500: "rgb(var(--secondary-main)/ <alpha-value>)",
        700: "rgb(var(--secondary-dark)/ <alpha-value>)",
        900: "rgb(var(--secondary-darker)/ <alpha-value>)",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      width: {
        extrawide: "max-w-none mx-auto",
        narrow: "max-w-4xl mx-auto",
        contain: "w-full max-w-7xl mx-auto",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "reverse-infinite-scroll": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
        "marquee-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee-left": "marquee-left var(--duration, 40s) linear infinite",
        "marquee-up": "marquee-up var(--duration, 40s) linear infinite",
        "reverse-infinite-scroll":
          "reverse-infinite-scroll 25s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
