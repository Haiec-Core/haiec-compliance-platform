import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/Typography";
import { getSlimWorkspacesOfUserAction } from "@/data/admin/workspaces";
import { Suspense } from "react";
import { z } from "zod";

const paramsSchema = z.object({
  userId: z.string(),
});

async function WorkspacesTable({ userId }: { userId: string }) {
  const workspacesActionResult = await getSlimWorkspacesOfUserAction({
    userId,
  });

  if (workspacesActionResult?.data) {
    const workspaces = workspacesActionResult.data;
    return (
      <div className="space-y-6">
        <Typography.H2>Workspaces</Typography.H2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workspace Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Membership Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspaces.map((workspace) => (
                <TableRow key={workspace.id}>
                  <TableCell>{workspace.name ?? "-"}</TableCell>
                  <TableCell>{workspace.slug ?? "-"}</TableCell>
                  <TableCell>{workspace.membershipType ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  } else {
    if (workspacesActionResult?.serverError) {
      console.log("***************");
      console.log(workspacesActionResult.serverError);
      return <div>{workspacesActionResult.serverError}</div>;
    } else {
      console.error(workspacesActionResult);
      return <div>Failed to load workspaces for user</div>;
    }
  }
}

export default async function AdminUserPage(props: {
  params: Promise<unknown>;
}) {
  const params = await props.params;
  const { userId } = paramsSchema.parse(params);

  return (
    <Suspense fallback={<Skeleton className="w-full h-6" />}>
      <WorkspacesTable userId={userId} />
    </Suspense>
  );
}
