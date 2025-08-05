"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTagAction } from "@/data/admin/marketing-tags";
import { DBTable } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const editTagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});

type EditTagFormProps = {
  tag: DBTable<"marketing_tags">;
};

export const EditTagForm: React.FC<EditTagFormProps> = ({ tag }) => {
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<z.infer<typeof editTagSchema>>({
    resolver: zodResolver(editTagSchema),
    defaultValues: {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      description: tag.description ?? "",
    },
  });

  const watchName = watch("name");

  useEffect(() => {
    if (watchName) {
      setValue("slug", slugify(watchName, { lower: true, strict: true }));
    }
  }, [watchName, setValue]);

  const updateTagMutation = useAction(updateTagAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating tag...", {
        description: "Please wait while we update the tag.",
      });
    },
    onSuccess: () => {
      toast.success("Tag updated successfully", { id: toastRef.current });
      toastRef.current = undefined;
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to update tag: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
      toastRef.current = undefined;
    },
  });

  const onSubmit = (data: z.infer<typeof editTagSchema>) => {
    updateTagMutation.execute(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register("slug")} />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={updateTagMutation.status === "executing"}>
        {updateTagMutation.status === "executing"
          ? "Updating..."
          : "Update Tag"}
      </Button>
    </form>
  );
};
