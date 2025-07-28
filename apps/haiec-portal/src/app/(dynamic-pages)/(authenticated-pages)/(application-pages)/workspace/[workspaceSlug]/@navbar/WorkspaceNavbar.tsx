// https://github.com/vercel/next.js/issues/58272
import { Link } from "@/components/intl-link";
import { T } from "@/components/ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";
import { getCachedWorkspaceBySlug } from "@/rsc-data/user/workspaces";
import { WorkspaceWithMembershipType } from "@/types";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import { workspaceSlugParamSchema } from "@/utils/zod-schemas/params";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<unknown>;
}) {
  try {
    const { workspaceSlug } = workspaceSlugParamSchema.parse(await params);
    const workspace = await getCachedWorkspaceBySlug(workspaceSlug);

    return {
      title: `${workspace.name} | Workspace | Nextbase Ultimate`,
      description: "Organization title",
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

export async function WorkspaceNavbar({
  params,
}: {
  params: Promise<unknown>;
}) {
  try {
    const { workspaceSlug } = workspaceSlugParamSchema.parse(await params);
    console.log("workspaceSlug navbar", workspaceSlug);
    const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
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
    console.error("Error in WorkspaceNavbar", error);
    return notFound();
  }
}
