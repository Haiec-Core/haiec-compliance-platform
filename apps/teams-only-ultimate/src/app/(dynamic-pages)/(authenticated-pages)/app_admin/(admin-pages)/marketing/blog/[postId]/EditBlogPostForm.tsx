// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/[postId]/EditBlogPostForm.tsx
"use client";
import { FormInput } from "@/components/form-components/FormInput";
import { FormSelect } from "@/components/form-components/FormSelect";
import { FormSwitch } from "@/components/form-components/FormSwitch";
import { FormTextarea } from "@/components/form-components/FormTextarea";
import { Tiptap } from "@/components/TipTap";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  updateBlogPostAction,
  uploadBlogCoverImageAction,
} from "@/data/admin/marketing-blog";
import { DBTable } from "@/types";
import { toSafeJSONB } from "@/utils/jsonb";
import { updateMarketingBlogPostSchema } from "@/utils/zod-schemas/marketingBlog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

type FormData = z.infer<typeof updateMarketingBlogPostSchema>;

type EditBlogPostFormProps = {
  post: DBTable<"marketing_blog_posts">;
};

export function EditBlogPostForm({ post }: EditBlogPostFormProps) {
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);
  const [coverImageUrl, setCoverImageUrl] = useState(post.cover_image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateMutation = useAction(updateBlogPostAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating blog post...", {
        description: "Please wait while we update the post.",
      });
    },
    onSuccess: () => {
      toast.success("Blog post updated successfully", {
        description: "The blog post has been updated successfully.",
        id: toastRef.current,
      });
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to update blog post: ${error.serverError || "Unknown error"}`,
        {
          description: "Please try again.",
          id: toastRef.current,
        },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof updateMarketingBlogPostSchema
  >(updateMutation.result.validationErrors, { joinBy: "\n" });

  const form = useForm<FormData>({
    resolver: zodResolver(updateMarketingBlogPostSchema),
    defaultValues: {
      ...post,
      json_content: toSafeJSONB(post.json_content),
      seo_data: toSafeJSONB(post.seo_data),
      cover_image: post.cover_image ?? undefined,
    },
    errors: hookFormValidationErrors,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = form;

  const currentTitle = watch("title");

  useEffect(() => {
    if (currentTitle) {
      setValue(
        "slug",
        slugify(currentTitle, {
          lower: true,
          strict: true,
          replacement: "-",
        }),
      );
    }
  }, [currentTitle]);

  const uploadImageMutation = useAction(uploadBlogCoverImageAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Uploading cover image...", {
        description: "Please wait while we upload the image.",
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Cover image uploaded successfully", {
        description: "The cover image has been uploaded successfully.",
        id: toastRef.current,
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
          description: "Please try again.",
          id: toastRef.current,
        },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const onSubmit = async ({ json_content, seo_data, ...data }: FormData) => {
    await updateMutation.execute({
      ...data,
      stringified_json_content: JSON.stringify(json_content ?? {}),
      stringified_seo_data: JSON.stringify(seo_data ?? {}),
    });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await uploadImageMutation.execute({ formData });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      <svg
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold">
                      Change Cover Image
                    </span>
                  </div>
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

          {errors.cover_image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cover_image.message}
            </p>
          )}
        </div>

        <FormInput
          id="title"
          label="Title"
          control={control}
          name="title"
          description={"This is the title of the blog post."}
        />

        <FormInput
          id="slug"
          label="Slug"
          control={control}
          name="slug"
          description={"This is the slug of the blog post."}
        />

        <div className="nextbase-editor">
          <Label htmlFor="json_content">Content</Label>
          <Controller
            name="json_content"
            control={control}
            render={({ field }) => (
              <Tiptap
                initialContent={{}}
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
          description={"This is the status of the blog post."}
        />

        <FormSwitch
          id="is_featured"
          label="Is Featured"
          control={control}
          name="is_featured"
          description={"This is the featured status of the blog post."}
        />

        <FormTextarea
          id="summary"
          label="Summary"
          control={control}
          name="summary"
          description={"This is the summary of the blog post."}
        />

        <Button type="submit" disabled={updateMutation.status === "executing"}>
          {updateMutation.status === "executing"
            ? "Updating..."
            : "Update Blog Post"}
        </Button>
      </form>
    </Form>
  );
}
