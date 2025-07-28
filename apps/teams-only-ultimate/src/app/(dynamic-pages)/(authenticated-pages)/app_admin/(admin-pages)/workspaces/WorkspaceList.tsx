"use server";

import { Link } from "@/components/intl-link";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPaginatedWorkspaceListAction } from "@/data/admin/workspaces";
import { format } from "date-fns";
import { AppAdminWorkspacesFiltersSchema } from "./schema";

export async function WorkspaceList({
  filters,
}: {
  filters: AppAdminWorkspacesFiltersSchema;
}) {
  const workspacesActionResult = await getPaginatedWorkspaceListAction(filters);
  console.log("workspacesActionResult", workspacesActionResult);

  if (workspacesActionResult?.data) {
    const workspaces = workspacesActionResult.data;
    return (
      <div className="space-y-2 rounded-lg overflow-hidden border">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workspaces.map((workspace) => (
              <TableRow key={workspace.id}>
                <TableCell>
                  <Link href={`/app_admin/workspaces/${workspace.id}`}>
                    {workspace.name ?? "-"}
                  </Link>
                </TableCell>
                <TableCell>{workspace.slug ?? "-"}</TableCell>
                <TableCell>
                  {format(new Date(workspace.created_at), "PPpp")}
                </TableCell>
                <TableCell>
                  <span className="flex items-center space-x-2">
                    {/* Add actions here if needed */}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadcnTable>
      </div>
    );
  } else {
    if (workspacesActionResult?.serverError) {
      console.log("***************");
      console.log(workspacesActionResult.serverError);
      return <div>{workspacesActionResult.serverError}</div>;
    } else {
      console.error(workspacesActionResult);
      return <div>Failed to load workspaces</div>;
    }
  }
}
