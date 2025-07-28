"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateWorkspaceDialog } from "@/contexts/CreateWorkspaceDialogContext";
import { createWorkspaceAction } from "@/data/user/workspaces";
import { generateWorkspaceSlug } from "@/lib/utils";
import {
  CreateWorkspaceSchema,
  createWorkspaceSchema,
} from "@/utils/zod-schemas/workspaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Network } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function CreateWorkspaceDialog() {
  const { isDialogOpen, closeDialog } = useCreateWorkspaceDialog();
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: createWorkspaceExecute, isPending } = useAction(
    createWorkspaceAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Creating workspace...", {
          description: "Please wait while we create your workspace.",
        });
      },
      onSuccess: ({ data }) => {
        toast.success("Workspace created!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        if (data) {
          router.push(`/workspace/${data}`);
        }
        closeDialog();
      },
      onError: (error) => {
        toast.error("Failed to create workspace.", {
          description: String(error),
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  const onSubmit = (data: CreateWorkspaceSchema) => {
    createWorkspaceExecute({
      name: data.name,
      slug: data.slug,
      workspaceType: "team",
      isOnboardingFlow: false,
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  return (
    <Dialog
      open={isDialogOpen}
      data-testid="create-workspace-dialog"
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <Network className=" w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Create Workspace</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Create a new workspace and get started.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-testid="create-workspace-form"
        >
          <div className="mb-8 space-y-2">
            <div>
              <Label>Workspace Name</Label>
              <Input
                {...register("name")}
                className="mt-1.5 shadow-sm appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 leading-tight focus:outline-hidden focus:shadow-outline text-base"
                id="name"
                data-testid="workspace-name-input"
                type="text"
                onChange={(e) => {
                  setValue("slug", generateWorkspaceSlug(e.target.value), {
                    shouldValidate: true,
                  });
                  setValue("name", e.target.value, { shouldValidate: true });
                }}
                placeholder="Workspace Name"
                disabled={isPending}
              />
            </div>

            <div>
              <Label>Workspace Slug</Label>
              <Input
                {...register("slug")}
                className="mt-1.5 shadow-sm appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 leading-tight focus:outline-hidden focus:shadow-outline text-base"
                id="slug"
                data-testid="workspace-slug-input"
                type="text"
                disabled={isPending}
                placeholder="Workspace Slug"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="w-full"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Create Workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
