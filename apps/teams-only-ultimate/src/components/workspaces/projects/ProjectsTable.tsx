"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/compact-table";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import FacetedFilter from "@/components/FacetedFilter";
import { ReactTablePagination } from "@/components/react-table-pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/Typography";
import { getProjectsClient } from "@/data/user/client/projects";
import type { Enums, Tables } from "@/lib/database.types";
import { Enum } from "@/types";
import { getIsWorkspaceAdmin } from "@/utils/workspaces";
import {
  projectsFilterSchema,
  type ProjectsFilterSchema,
} from "@/utils/zod-schemas/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarDays, ChevronsUpDown, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ConfirmDeleteProjectsDialog } from "./ConfirmDeleteProjectsDialog";
import { EditProjectForm } from "./EditProjectForm";
const statusEmojis = {
  draft: "📝",
  pending_approval: "⏳",
  approved: "🏗️",
  completed: "✅",
} as const;

const STATUS_OPTIONS: {
  label: string;
  value: Enum<"project_status">;
  icon?: React.ComponentType<{ className?: string }>;
}[] = [
    { label: "Draft", value: "draft", icon: undefined },
    { label: "Pending Approval", value: "pending_approval", icon: undefined },
    { label: "Approved", value: "approved", icon: undefined },
    { label: "Completed", value: "completed", icon: undefined },
  ];

interface ProjectsTableProps {
  workspaceId: string;
  workspaceRole: Enums<"workspace_member_role_type">;
}

export function ProjectsTable({
  workspaceId,
  workspaceRole,
}: ProjectsTableProps) {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [editingProject, setEditingProject] =
    useState<Tables<"projects"> | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<
    Set<Enum<"project_status">>
  >(new Set());
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const queryClient = useQueryClient();
  const isWorkspaceAdmin = getIsWorkspaceAdmin(workspaceRole);

  const form = useForm<ProjectsFilterSchema>({
    resolver: zodResolver(projectsFilterSchema),
    defaultValues: {
      query: "",
      page: 1,
      perPage: 10,
      sorting: [],
    },
  });

  const { watch, register, setValue } = form;
  const query = watch("query");

  useEffect(() => {
    setValue("sorting", sorting);
  }, [sorting, setValue]);

  useEffect(() => {
    setValue("page", pageIndex + 1);
    setValue("perPage", pageSize);
  }, [pageIndex, pageSize, setValue]);

  const {
    data: projectsData,
    isLoading,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: [
      "projects",
      workspaceId,
      query,
      sorting,
      pageIndex,
      pageSize,
      Array.from(selectedStatuses),
    ],
    queryFn: () =>
      getProjectsClient({
        workspaceId,
        filters: {
          query,
          sorting,
          page: form.getValues("page"),
          perPage: form.getValues("perPage"),
          statuses: Array.from(selectedStatuses),
        },
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  const projects = projectsData?.data ?? [];
  const totalProjects = projectsData?.count ?? 0;

  const columns: ColumnDef<Tables<"projects">>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-semibold">Name</span>
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => {
              router.push(`/project/${row.original.slug}`);
            }}
          >
            <span className="text-primary hover:underline">
              {row.getValue("name")}
            </span>
          </Button>
        );
      },
    },
    {
      accessorKey: "project_status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-semibold">Status</span>
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue(
          "project_status",
        ) as keyof typeof statusEmojis;
        const formattedStatus = status
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <div className="flex items-center space-x-1.5 text-sm">
            <span>{statusEmojis[status]}</span>
            <span>{formattedStatus}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-semibold">Created</span>
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-1 h-3 w-3" />
          {format(new Date(row.getValue("created_at")), "dd MMM yyyy")}
        </div>
      ),
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-semibold">Updated</span>
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {format(new Date(row.getValue("updated_at")), "dd MMM yyyy")}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    state: {
      rowSelection,
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    pageCount: Math.ceil(totalProjects / pageSize),
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Check if user can modify projects (not readonly)
  const canModifyProjects = workspaceRole !== "readonly";

  return (
    <div className="">
      <div className="bg-background p-2 mb-2 flex justify-between items-end">
        <div>
          <Typography.H2 className="my-0">Projects</Typography.H2>
          <Typography.Subtle>
            {canModifyProjects
              ? "Manage your projects here. You can double click on a project to view and edit it."
              : "View projects here. You have read-only access to this workspace."}
            {isWorkspaceAdmin &&
              " You can delete projects by selecting them and choosing the delete action."}
          </Typography.Subtle>
        </div>
        <Link href={`/workspace/${workspaceId}/projects`}>
          <Button variant="link" size="sm">
            <span className="text-xs underline">View All</span>
          </Button>
        </Link>
      </div>
      <div className="space-y-2">
        <Form {...form}>
          <div className="">
            <div className="flex items-center space-x-2 justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex w-[300px] items-center space-x-2">
                  <Input
                    className="h-8"
                    placeholder="Search projects..."
                    {...register("query")}
                  />
                </div>
                <FacetedFilter
                  title="Status"
                  options={STATUS_OPTIONS}
                  selectedValues={selectedStatuses}
                  onSelectCb={(values) => {
                    setSelectedStatuses(new Set(values));
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                {isWorkspaceAdmin && Object.keys(rowSelection).length > 0 && (
                  <ConfirmDeleteProjectsDialog
                    selectedCount={Object.keys(rowSelection).length}
                    projectIds={Object.keys(rowSelection).map(
                      (index) => projects[parseInt(index)].id,
                    )}
                    onSuccess={() => {
                      setRowSelection({});
                      refetchProjects();
                    }}
                  />
                )}
                {canModifyProjects && (
                  <CreateProjectDialog
                    workspaceId={workspaceId}
                    onSuccess={() => {
                      queryClient.invalidateQueries({
                        queryKey: [
                          "projects",
                          workspaceId,
                          query,
                          sorting,
                          pageIndex,
                          pageSize,
                        ],
                      });
                      refetchProjects();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Form>
        <div className="overflow-x-auto">
          <div className="table-container">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onDoubleClick={() => setEditingProject(row.original)}
                      className="cursor-pointer rounded-none!"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No projects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="">
            <ReactTablePagination
              page={pageIndex + 1}
              pageSize={pageSize}
              totalItems={totalProjects}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))
              }
              onPageSizeChange={(size) =>
                setPagination((prev) => ({ ...prev, pageSize: size }))
              }
            />
          </div>
        </div>
      </div>

      <EditProjectForm
        project={editingProject}
        key={editingProject?.id}
        onClose={() => setEditingProject(null)}
        onSuccess={refetchProjects}
        isWorkspaceAdmin={isWorkspaceAdmin}
        canModifyProjects={canModifyProjects}
      />
    </div>
  );
}
