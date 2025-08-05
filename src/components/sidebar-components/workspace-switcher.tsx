"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCreateWorkspaceDialog } from "@/contexts/CreateWorkspaceDialogContext";
import { useSafeShortcut } from "@/hooks/useSafeShortcut";
import { SlimWorkspace, SlimWorkspaces } from "@/types";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import { ChevronsUpDown, Home, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { toast } from "sonner";

function WorkspaceToggler({
  workspace,
  index,
  currentWorkspaceId,
  goToWorkspace,
}: {
  workspace: SlimWorkspace;
  index: number;
  currentWorkspaceId: string;
  goToWorkspace: (workspace: SlimWorkspace) => void;
}) {
  const shortcutNumber = index + 1;
  const shortcutCode = `Digit${shortcutNumber}`;
  useSafeShortcut(shortcutCode, (event) => {
    if (event.metaKey) {
      event.preventDefault();
      event.stopPropagation();
      if (currentWorkspaceId !== workspace.id) {
        goToWorkspace(workspace);
      }
    }
  });
  return null;
}

function WorkspaceOption({
  workspace,
  index,
  currentWorkspaceId,
  goToWorkspace,
}: {
  workspace: SlimWorkspace;
  index: number;
  currentWorkspaceId: string;
  goToWorkspace: (workspace: SlimWorkspace) => void;
}) {
  const shortcutNumber = index + 1;

  return (
    <DropdownMenuItem
      key={workspace.id}
      className="gap-2 p-2 capitalize"
      onSelect={() => {
        if (workspace.id !== currentWorkspaceId) {
          goToWorkspace(workspace);
        }
      }}
    >
      {workspace.name}

      <DropdownMenuShortcut>⌘{shortcutNumber}</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export function WorkspaceSwitcher({
  slimWorkspaces,
  currentWorkspaceId,
}: {
  slimWorkspaces: SlimWorkspaces;
  currentWorkspaceId: string;
}) {
  const { openDialog } = useCreateWorkspaceDialog();
  const router = useRouter();
  const currentWorkspace = slimWorkspaces.find(
    (workspace) => workspace.id === currentWorkspaceId,
  );

  function goToWorkspace(workspace: SlimWorkspace) {
    toast.success(`Navigating to ${workspace.name} workspace.`, {
      duration: 1000,
      position: "top-center",
    });
    router.push(getWorkspaceSubPath(workspace, "/home"));
  }
  return (
    <Fragment>
      {slimWorkspaces.map((workspace, index) => (
        <WorkspaceToggler
          key={workspace.id}
          index={index}
          goToWorkspace={goToWorkspace}
          workspace={workspace}
          currentWorkspaceId={currentWorkspaceId}
        />
      ))}
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentWorkspace?.name ?? "Select Workspace"}
                  </span>
                  <span className="truncate text-xs">
                    {currentWorkspace?.membershipType === "solo"
                      ? "Personal"
                      : "Team"}{" "}
                    Workspace
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Workspaces
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {slimWorkspaces.map((workspace, index) => (
                <WorkspaceOption
                  key={workspace.id}
                  index={index}
                  goToWorkspace={goToWorkspace}
                  workspace={workspace}
                  currentWorkspaceId={currentWorkspaceId}
                />
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={openDialog} className="gap-2 p-2">
                <div
                  data-testid="ws-create-workspace-trigger"
                  className="flex size-6 items-center justify-center rounded-md border bg-background"
                >
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Create Workspace
                </div>
                <DropdownMenuShortcut>w</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </Fragment>
  );
}
