"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/Button";
import { T } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import { updateWorkspaceInfoAction } from "@/data/user/workspaces"; // Assuming this action exists
import { generateWorkspaceSlug } from "@/lib/utils";
import type { WorkspaceWithMembershipType } from "@/types";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import {
  CreateWorkspaceSchema,
  createWorkspaceSchema,
} from "@/utils/zod-schemas/workspaces";

type EditFormProps = {
  workspace: WorkspaceWithMembershipType;
};

export function EditWorkspaceForm({ workspace }: EditFormProps): JSX.Element {
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);

  const { register, handleSubmit, formState, setValue } =
    useForm<CreateWorkspaceSchema>({
      resolver: zodResolver(createWorkspaceSchema),
      defaultValues: {
        name: workspace.name,
        slug: workspace.slug,
      },
    });

  const { execute, status } = useAction(updateWorkspaceInfoAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating workspace information...");
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace information updated!", { id: toastRef.current });
      toastRef.current = undefined;
      if (data?.slug) {
        router.push(getWorkspaceSubPath(workspace, "/home"));
      }
    },
    onError: ({ error }) => {
      const errorMessage =
        error.serverError ?? "Failed to update workspace information";
      toast.error(errorMessage, { id: toastRef.current });
      toastRef.current = undefined;
    },
  });

  const onSubmit: SubmitHandler<CreateWorkspaceSchema> = (data) => {
    execute({
      workspaceId: workspace.id,
      name: data.name,
      slug: data.slug ?? generateWorkspaceSlug(data.name),
      workspaceMembershipType: workspace.membershipType,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <T.H4>Edit Workspace Title</T.H4>
        <T.P className="text-muted-foreground">
          This is the title that will be displayed on the workspace page.
        </T.P>
      </div>
      <form
        data-testid="edit-workspace-title-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
        <Input
          type="text"
          id="organization-title"
          data-testid="edit-workspace-title-input"
          {...register("name")}
          onChange={(e) => {
            setValue("name", e.target.value, { shouldValidate: true });
            setValue("slug", generateWorkspaceSlug(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <div className="space-y-2">
          <T.H4>Edit Workspace Slug</T.H4>
          <T.P className="text-muted-foreground">
            This is the slug that will be displayed in the URL.
          </T.P>
        </div>
        <Input
          type="text"
          id="organization-slug"
          data-testid="edit-workspace-slug-input"
          {...register("slug")}
        />
        <div className="inline-block">
          <Button
            disabled={status === "executing" || !formState.isValid}
            type="submit"
            id="update-workspace-title-button"
          >
            {status === "executing" ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
