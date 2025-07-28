import { WorkspaceLayout } from "@/components/workspaces/WorkspaceLayout";
import type { ReactNode } from "react";

export default async function SoloWorkspaceLayout({
  children,
  navbar,
  sidebar,
}: {
  children: ReactNode;
  navbar: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <WorkspaceLayout
      navbar={navbar}
      sidebar={sidebar}
      workspaceSlug={undefined}
    >
      {children}
    </WorkspaceLayout>
  );
}
