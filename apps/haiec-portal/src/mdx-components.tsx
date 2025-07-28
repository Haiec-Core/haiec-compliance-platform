import { MDXComponents } from "mdx/types";
import { useMDXComponents as useBaseMDXComponents } from "./components/mdxComponents";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return useBaseMDXComponents(components);
}
