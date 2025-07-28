import { PageHeading } from "@/components/PageHeading";
import { Pagination } from "@/components/Pagination";
import { Search } from "@/components/Search";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkspacesTotalPagesAction } from "@/data/admin/workspaces";
import { Suspense } from "react";
import { WorkspaceList } from "./WorkspaceList";
import { appAdminWorkspacesFiltersSchema } from "./schema";

export const metadata = {
  title: "Workspaces List | Admin Panel | Nextbase",
};

export default async function AdminWorkspacesList(props: {
  searchParams: Promise<unknown>;
}) {
  const searchParams = await props.searchParams;
  const validatedSearchParams =
    appAdminWorkspacesFiltersSchema.parse(searchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);
  const totalPagesActionResult = await getWorkspacesTotalPagesAction(
    validatedSearchParams,
  );

  if (typeof totalPagesActionResult?.data !== "undefined") {
    const totalPages = totalPagesActionResult.data;
    return (
      <div className="space-y-4 max-w-[1296px]">
        <PageHeading
          title="Workspaces"
          subTitle="View all workspaces created by users in your app."
        />
        <div className="flex justify-between space-x-3">
          <Search placeholder="Search Workspaces... " />
          <div />
        </div>
        <Suspense
          key={suspenseKey}
          fallback={<Skeleton className="w-full h-6" />}
        >
          <WorkspaceList filters={validatedSearchParams} />
        </Suspense>
        <Pagination totalPages={totalPages} />
      </div>
    );
  } else {
    if (totalPagesActionResult?.serverError) {
      return <div>{totalPagesActionResult.serverError}</div>;
    } else {
      return <div>Failed to load total pages</div>;
    }
  }
}
