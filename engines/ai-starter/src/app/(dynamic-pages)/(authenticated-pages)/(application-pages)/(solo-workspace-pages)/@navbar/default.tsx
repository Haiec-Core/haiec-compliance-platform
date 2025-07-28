// https://github.com/vercel/next.js/issues/58272
import { WorkspaceNavbar } from "./WorkspaceNavbar";

export { /* @next-codemod-error `generateMetadata` export is re-exported. Check if this component uses `params` or `searchParams`*/
generateMetadata } from "./WorkspaceNavbar";
export default WorkspaceNavbar;
