import { WorkspaceBilling } from "@/components/workspaces/settings/billing/WorkspaceBilling";
import { getCachedSoloWorkspace } from "@/rsc-data/user/workspaces";

export default async function WorkspaceSettingsBillingPage() {
  const workspace = await getCachedSoloWorkspace();
  return <WorkspaceBilling workspaceSlug={workspace.slug} />;
}
