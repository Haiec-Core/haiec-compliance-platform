"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Layers, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProjectAction } from "@/data/user/projects";
import { generateProjectSlug } from "@/lib/utils";

const createProjectFormSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

type CreateProjectFormData = z.infer<typeof createProjectFormSchema>;

interface CreateProjectDialogProps {
  workspaceId: string;
  onSuccess?: () => void;
}

export function CreateProjectDialog({
  workspaceId,
  onSuccess,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);

  const { register, handleSubmit, setValue } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { execute: executeCreateProject, status } = useAction(
    createProjectAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Creating project...");
      },
      onSuccess: ({ data }) => {
        toast.success("Project created!", { id: toastRef.current });
        toastRef.current = undefined;
        setOpen(false);
        if (data) {
          router.push(`/project/${data.slug}`);
        }
        onSuccess?.();
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to create project";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const onSubmit: SubmitHandler<CreateProjectFormData> = (data) => {
    executeCreateProject({ workspaceId, name: data.name, slug: data.slug });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="default">
          <Plus className="w-5 h-5" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Create Project</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Create a new project and get started.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Project Name</Label>
            <Input
              {...register("name")}
              className="mt-1.5 shadow-sm appearance-none border rounded-lg w-full"
              onChange={(e) => {
                setValue("name", e.target.value);
                setValue("slug", generateProjectSlug(e.target.value), {
                  shouldValidate: true,
                });
              }}
              id="name"
              type="text"
              placeholder="Project Name"
              disabled={status === "executing"}
            />
          </div>
          <div>
            <Label>Project Slug</Label>
            <Input
              {...register("slug")}
              className="mt-1.5 shadow-sm appearance-none border rounded-lg w-full"
              id="slug"
              type="text"
              placeholder="project-slug"
              disabled={status === "executing"}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={status === "executing"}
              className="w-full"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={status === "executing"}
            >
              {status === "executing"
                ? "Creating project..."
                : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
