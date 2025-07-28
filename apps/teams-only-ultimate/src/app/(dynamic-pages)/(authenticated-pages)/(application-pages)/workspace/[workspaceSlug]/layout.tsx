import { WorkspaceLayout } from "@/components/workspaces/WorkspaceLayout";
import { workspaceSlugParamSchema } from "@/utils/zod-schemas/params";
import type { ReactNode } from "react";

export default async function TeamWorkspaceLayout(props: {
  children: ReactNode;
  navbar: ReactNode;
  sidebar: ReactNode;
  params: Promise<unknown>;
}) {
  const params = await props.params;

  const { children, navbar, sidebar } = props;

  const { workspaceSlug } = workspaceSlugParamSchema.parse(params);

  return (
    <WorkspaceLayout
      workspaceSlug={workspaceSlug}
      navbar={navbar}
      sidebar={sidebar}
    >
      {children}
    </WorkspaceLayout>
  );
}
