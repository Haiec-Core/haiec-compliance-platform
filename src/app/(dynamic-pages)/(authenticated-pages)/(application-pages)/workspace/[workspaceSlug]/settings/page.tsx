import { WorkspaceSettings } from "@/components/workspaces/settings/WorkspaceSettings";
import { workspaceSlugParamSchema } from "@/utils/zod-schemas/params";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "You can edit your organization's settings here.",
};

export default async function EditOrganizationPage(props: {
  params: Promise<unknown>;
}) {
  const params = await props.params;
  const { workspaceSlug } = workspaceSlugParamSchema.parse(params);

  return <WorkspaceSettings workspaceSlug={workspaceSlug} />;
}
