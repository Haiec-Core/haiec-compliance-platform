import { getCachedWorkspaceBySlug } from "@/rsc-data/user/workspaces";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import { workspaceSlugParamSchema } from "@/utils/zod-schemas/params";
import { redirect } from "next/navigation";

export default async function WorkspacePage(props: {
  params: Promise<unknown>;
}) {
  const params = await props.params;
  const { workspaceSlug } = workspaceSlugParamSchema.parse(params);
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
  return redirect(getWorkspaceSubPath(workspace, "/home"));
}
