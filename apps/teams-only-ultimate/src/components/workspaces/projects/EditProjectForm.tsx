"use client";

import { SmartSheet } from "@/components/smart-sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typography } from "@/components/ui/Typography";
import { updateProjectAction } from "@/data/user/projects";
import type { Tables } from "@/lib/database.types";
import { projectStatusEnum } from "@/utils/zod-schemas/enums/projectStatusEnum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  project_status: projectStatusEnum,
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const statusEmojis = {
  draft: "📝",
  pending_approval: "⏳",
  approved: "🏗️",
  completed: "✅",
} as const;

interface ProjectFormProps {
  project: Tables<"projects"> | null;
  onClose: () => void;
  onSuccess?: () => void;
  isWorkspaceAdmin: boolean;
  canModifyProjects: boolean;
}

export function EditProjectForm({
  project,
  onClose,
  onSuccess,
  isWorkspaceAdmin,
  canModifyProjects,
}: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project
      ? {
        name: project.name,
        project_status: project.project_status,
      }
      : undefined,
  });

  const { execute: executeUpdate } = useAction(updateProjectAction, {
    onSuccess: () => {
      toast.success("Project updated successfully");
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      toast.error(error.error?.serverError || "Failed to update project");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    if (!project) return;

    setIsSubmitting(true);
    await executeUpdate({
      projectId: project.id,
      ...values,
    });
  };

  return (
    <SmartSheet
      open={!!project}
      onOpenChange={onClose}
      className="md:max-w-[540px]!"
    >
      <div className="p-2">
        <div className="mb-8">
          <Typography.H2>
            {canModifyProjects ? "Edit Project" : "View Project"}
          </Typography.H2>
          <Typography.Subtle>
            {canModifyProjects
              ? "Edit project details and status."
              : "View project details. You have read-only access."}
          </Typography.Subtle>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project name"
                      {...field}
                      disabled={!canModifyProjects}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormDescription className="text-sm text-muted-foreground mb-2">
                    {isWorkspaceAdmin
                      ? "As a workspace admin, you can modify the project status"
                      : "Only workspace admins and owners can modify the project status"}
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!isWorkspaceAdmin || !canModifyProjects}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectStatusEnum.options.map((status) => (
                        <SelectItem key={status} value={status}>
                          {statusEmojis[status]}{" "}
                          {status.charAt(0).toUpperCase() +
                            status.slice(1).replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isWorkspaceAdmin && project && (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <p className="text-sm text-muted-foreground mb-2">
                  Only workspace admins and owners can modify the project status
                </p>
                <div className="flex items-center gap-2 p-2 rounded-md border">
                  {statusEmojis[project.project_status]}{" "}
                  {project.project_status.charAt(0).toUpperCase() +
                    project.project_status.slice(1).replace("_", " ")}
                </div>
              </FormItem>
            )}

            {canModifyProjects && (
              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </SmartSheet>
  );
}
