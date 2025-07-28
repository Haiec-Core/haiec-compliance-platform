// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/[postId]/reactSelectStyles.ts
import { StylesConfig } from "react-select";

export const reactSelectStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "hsl(var(--background))",
    borderColor: state.isFocused ? "hsl(var(--ring))" : "hsl(var(--input))",
    boxShadow: state.isFocused ? "0 0 0 2px hsl(var(--ring))" : "none",
    "&:hover": {
      borderColor: "hsl(var(--input))",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--background))",
    border: "1px solid hsl(var(--border))",
    boxShadow: "var(--shadow)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "hsl(var(--primary))"
      : state.isFocused
        ? "hsl(var(--accent))"
        : "transparent",
    color: state.isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    "&:active": {
      backgroundColor: "hsl(var(--accent))",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--accent))",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "hsl(var(--accent-foreground))",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "hsl(var(--accent-foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
};
