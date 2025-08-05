import { WorkspaceSettings } from "@/components/workspaces/settings/WorkspaceSettings";
import { getCachedSoloWorkspace } from "@/rsc-data/user/workspaces";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "You can edit your organization's settings here.",
};

export default async function EditOrganizationPage() {
  const workspace = await getCachedSoloWorkspace();
  return <WorkspaceSettings workspaceSlug={workspace.slug} />;
}
