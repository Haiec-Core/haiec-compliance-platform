// https://github.com/vercel/next.js/issues/58272
import { T } from "@/components/ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";
import { getCachedSoloWorkspace } from "@/rsc-data/user/workspaces";
import { WorkspaceWithMembershipType } from "@/types";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import Link from 'next/link';
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata() {
  try {
    const workspace = await getCachedSoloWorkspace();

    return {
      title: `${workspace.name} | Workspace | Nextbase Essential`,
      description: "Workspace title",
    };
  } catch (error) {
    return {
      title: "Not found",
    };
  }
}

async function Title({
  workspace,
}: {
  workspace: WorkspaceWithMembershipType;
}) {
  return (
    <div className="capitalize flex items-center gap-2">
      <T.P> {workspace.name} Workspace</T.P>
    </div>
  );
}

export async function WorkspaceNavbar() {
  try {
    const workspace = await getCachedSoloWorkspace();
    return (
      <div className="flex items-center">
        <Link href={getWorkspaceSubPath(workspace, "/home")}>
          <span className="flex items-center space-x-2">
            <Suspense fallback={<Skeleton className="w-16 h-6" />}>
              <Title workspace={workspace} />
            </Suspense>
          </span>
        </Link>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
