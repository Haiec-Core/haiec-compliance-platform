import type { MDXComponents } from "mdx/types";
import { MdxCode } from "./MdxCode";
import { MdxLink } from "./MdxLink";
import {
  MdxTable,
  MdxTableCell,
  MdxTableHeader,
  MdxTableRow,
} from "./MdxTable";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

export const customMDXComponents: MDXComponents = {
  a: MdxLink,
  table: MdxTable,
  th: MdxTableHeader,
  td: MdxTableCell,
  tr: MdxTableRow,
  code: MdxCode,
};

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    ...customMDXComponents,
  };
}
