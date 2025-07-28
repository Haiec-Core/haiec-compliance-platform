import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (
  title: string,
  {
    withNanoIdSuffix = true,
    prefix = "",
  }: {
    withNanoIdSuffix?: boolean;
    prefix?: string;
  } = {},
) => {
  const slug = slugify(title, {
    lower: true,
    strict: true,
    replacement: "-",
  });
  const withSuffix = withNanoIdSuffix ? `${slug}-${simpleNanoid()}` : slug;
  return prefix ? `${prefix}-${withSuffix}` : withSuffix;
};

export const generateOrganizationSlug = (title: string) => {
  return generateSlug(title, {
    prefix: "s",
    withNanoIdSuffix: true,
  });
};

export const generateWorkspaceSlug = (title: string) => {
  return generateSlug(title, {
    prefix: "w",
    withNanoIdSuffix: true,
  });
};

export const generateProjectSlug = (title: string) => {
  return generateSlug(title, {
    prefix: "p",
    withNanoIdSuffix: true,
  });
};

export const simpleNanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); //
