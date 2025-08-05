"use client";

import { FormInput } from "@/components/form-components/FormInput";
import { FormSelect } from "@/components/form-components/FormSelect";
import { Tiptap } from "@/components/TipTap";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  updateChangelogAction,
  uploadChangelogCoverImageAction,
} from "@/data/admin/marketing-changelog";
import { DBTable } from "@/types";
import { toSafeJSONB } from "@/utils/jsonb";
import { updateMarketingChangelogSchema } from "@/utils/zod-schemas/marketingChangelog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AuthorsSelect } from "./AuthorsSelect";

type FormData = z.infer<typeof updateMarketingChangelogSchema>;

type EditChangelogFormProps = {
  changelog: DBTable<"marketing_changelog"> & {
    marketing_changelog_author_relationship: { author_id: string }[];
  };
  authors: DBTable<"marketing_author_profiles">[];
};

export const EditChangelogForm: React.FC<EditChangelogFormProps> = ({
  changelog,
  authors,
}) => {
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);
  const [coverImageUrl, setCoverImageUrl] = useState(
    changelog.cover_image || "",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateMutation = useAction(updateChangelogAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating changelog...", {
        description: "Please wait while we update the changelog.",
      });
    },
    onSuccess: () => {
      toast.success("Changelog updated successfully", {
        id: toastRef.current,
        description: "Your changes have been saved.",
      });
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to update changelog: ${error.serverError || "Unknown error"}`,
        {
          id: toastRef.current,
          description:
            "There was an issue saving your changes. Please try again.",
        },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof updateMarketingChangelogSchema
  >(updateMutation.result.validationErrors, { joinBy: "\n" });

  const form = useForm<FormData>({
    resolver: zodResolver(updateMarketingChangelogSchema),
    defaultValues: {
      ...changelog,
      created_at: changelog.created_at ?? undefined,
      updated_at: changelog.updated_at ?? undefined,
      json_content: toSafeJSONB(changelog.json_content),
    },
    errors: hookFormValidationErrors,
  });

  const { handleSubmit, control, setValue } = form;

  const uploadImageMutation = useAction(uploadChangelogCoverImageAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Uploading cover image...", {
        description: "Please wait while we upload the image.",
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Cover image uploaded successfully", {
        id: toastRef.current,
        description: "Your new cover image has been successfully uploaded.",
      });
      if (data) {
        setCoverImageUrl(data);
        setValue("cover_image", data);
      }
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to upload cover image: ${error.serverError || "Unknown error"}`,
        {
          id: toastRef.current,
          description:
            "There was an issue uploading your cover image. Please try again.",
        },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const onSubmit = async ({ json_content, ...data }: FormData) => {
    updateMutation.execute({
      ...data,
      stringified_json_content: JSON.stringify(json_content ?? {}),
    });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImageMutation.execute({ formData });
    }
  };

  return (
    <div className="flex gap-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grow space-y-6">
          <div>
            <Label htmlFor="cover_image">Cover Image</Label>
            <div className="bg-black rounded-lg 2xl:py-12 2xl:px-2">
              <div
                className="mt-2 relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-full max-w-4xl">
                  <AspectRatio ratio={16 / 9}>
                    {coverImageUrl ? (
                      <Image
                        src={coverImageUrl}
                        alt="Cover image"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">
                          Click to upload image
                        </span>
                      </div>
                    )}
                  </AspectRatio>
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <FormInput
            id="title"
            label="Title"
            control={control}
            name="title"
            description="Enter the title of the changelog"
          />

          <div className="nextbase-editor overflow-hidden max-w-full">
            <Label htmlFor="json_content">Content</Label>
            <Controller
              name="json_content"
              control={control}
              render={({ field }) => (
                <Tiptap
                  initialContent={field.value}
                  onUpdate={({ editor }) => {
                    field.onChange(editor.getJSON());
                  }}
                />
              )}
            />
          </div>

          <FormSelect
            id="status"
            label="Status"
            control={control}
            name="status"
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ]}
            placeholder="Select status"
            description="Select the status of the changelog"
          />

          <Button
            type="submit"
            disabled={updateMutation.status === "executing"}
          >
            {updateMutation.status === "executing"
              ? "Updating..."
              : "Update Changelog"}
          </Button>
        </form>
      </Form>

      <div className="w-96 space-y-6 shrink-0">
        <AuthorsSelect changelog={changelog} authors={authors} />
      </div>
    </div>
  );
};
