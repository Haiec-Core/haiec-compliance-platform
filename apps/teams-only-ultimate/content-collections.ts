import { defineCollection, defineConfig } from "@content-collections/core";
import {
  createDocSchema,
  createMetaSchema,
  transformMDX,
} from "@fumadocs/content-collections/configuration";
import { remarkGfm, remarkHeading } from "fumadocs-core/mdx-plugins";
import { remarkInstall } from "fumadocs-docgen";

const docs = defineCollection({
  name: "docs",
  directory: "src/content/docs",
  include: "**/*.mdx",
  schema: createDocSchema,
  transform: (document, context) =>
    transformMDX(document, context, {
      // options here
      remarkPlugins: [remarkInstall, remarkHeading, remarkGfm],
    }),
});

const metas = defineCollection({
  name: "meta",
  directory: "src/content/docs",
  include: "**/meta.json",
  parser: "json",
  schema: createMetaSchema,
});

export default defineConfig({
  collections: [docs, metas],
});
