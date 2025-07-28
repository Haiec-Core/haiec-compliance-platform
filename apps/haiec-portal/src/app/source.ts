import { createMDXSource } from "@fumadocs/content-collections";
import { allDocs, allMetas } from "content-collections";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
export const { getPage, getPages, pageTree, getLanguages } = loader({
  baseUrl: "/docs",
  source: createMDXSource(allDocs, allMetas),

  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});
