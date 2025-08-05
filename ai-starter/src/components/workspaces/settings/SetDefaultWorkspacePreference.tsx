"use server";

import { T } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { getMaybeDefaultWorkspace } from "@/data/user/workspaces";
import { getCachedWorkspaceBySlug } from "@/rsc-data/user/workspaces";
import { Check } from "lucide-react";
import { SetDefaultWorkspaceButton } from "./SetDefaultWorkspaceButton";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <T.H3 className="dark:text-white">Default Workspace</T.H3>
        <T.Subtle className="text-sm text-muted-foreground max-w-lg">
          If you have multiple workspaces, you can set a default organization,
          which will be the organization that you are first taken to when you
          log in.
        </T.Subtle>
      </div>
      {children}
    </div>
  );
}

export async function SetDefaultWorkspacePreference({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  const [defaultWorkspace, workspace] = await Promise.all([
    getMaybeDefaultWorkspace(),
    getCachedWorkspaceBySlug(workspaceSlug),
  ]);
  const isDefaultWorkspace = defaultWorkspace?.workspace.id === workspace.id;
  if (isDefaultWorkspace) {
    return (
      <Wrapper>
        <Button className="space-x-2 pointer-events-none select-none">
          <Check className="w-4 h-4 mr-2" />
          <span>This is your default workspace</span>
        </Button>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <SetDefaultWorkspaceButton workspaceId={workspace.id} />
      </Wrapper>
    );
  }
}
