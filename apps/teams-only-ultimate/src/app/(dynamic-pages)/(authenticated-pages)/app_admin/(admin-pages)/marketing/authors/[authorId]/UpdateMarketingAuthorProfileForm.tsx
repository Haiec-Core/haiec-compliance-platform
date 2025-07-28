// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/authors/[authorId]/UpdateMarketingAuthorProfileForm.tsx
"use client";

import { AvatarUpload } from "@/components/AvatarUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  updateAuthorProfileAction,
  uploadMarketingAuthorImageAction,
} from "@/data/admin/marketing-authors";
import { DBTable } from "@/types";
import { updateMarketingAuthorProfileSchema } from "@/utils/zod-schemas/marketingAuthors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

type FormData = z.infer<typeof updateMarketingAuthorProfileSchema>;

interface UpdateMarketingAuthorProfileFormProps {
  author: DBTable<"marketing_author_profiles">;
}

export const UpdateMarketingAuthorProfileForm: React.FC<
  UpdateMarketingAuthorProfileFormProps
> = ({ author }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(author.avatar_url);
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(updateMarketingAuthorProfileSchema),
    defaultValues: {
      id: author.id,
      slug: author.slug,
      display_name: author.display_name,
      bio: author.bio,
      avatar_url: author.avatar_url,
      website_url: author.website_url ?? undefined,
      twitter_handle: author.twitter_handle ?? undefined,
      facebook_handle: author.facebook_handle ?? undefined,
      linkedin_handle: author.linkedin_handle ?? undefined,
    },
  });

  const displayName = watch("display_name");

  useEffect(() => {
    if (displayName) {
      const slug = slugify(displayName, {
        lower: true,
        strict: true,
        replacement: "-",
      });
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [displayName, setValue]);

  const updateProfileMutation = useAction(updateAuthorProfileAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating profile...", {
        description: "Please wait while we update the profile.",
      });
    },
    onSuccess: () => {
      toast.success("Profile updated!", { id: toastRef.current });
      router.refresh();
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to update profile: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
      toastRef.current = undefined;
    },
  });

  const uploadAvatarMutation = useAction(uploadMarketingAuthorImageAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Uploading avatar...", {
        description: "Please wait while we upload your avatar.",
      });
    },
    onSuccess: ({ data }) => {
      if (!data) {
        throw new Error("No data returned from upload");
      }
      setAvatarUrl(data);
      setValue("avatar_url", data);
      toast.success("Avatar uploaded!", {
        description: "Your avatar has been successfully uploaded.",
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      toast.error(
        `Error uploading avatar: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
      toastRef.current = undefined;
    },
  });

  const onSubmit = (data: FormData) => {
    updateProfileMutation.execute(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6">
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="avatar-upload" className="sm:text-right">
            Avatar <span className="text-destructive">*</span>
          </Label>
          <div className="sm:col-span-3">
            <AvatarUpload
              avatarUrl={avatarUrl}
              onFileChange={(file) => {
                const formData = new FormData();
                formData.append("file", file);
                uploadAvatarMutation.execute({ formData });
              }}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="slug" className="sm:text-right">
            Slug <span className="text-destructive">*</span>
          </Label>
          <Input id="slug" className="sm:col-span-3" {...register("slug")} />
        </div>
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="display_name" className="sm:text-right">
            Display Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="display_name"
            className="sm:col-span-3"
            {...register("display_name")}
          />
        </div>
        <div className="grid sm:grid-cols-4 items-start gap-4">
          <Label htmlFor="bio" className="sm:text-right pt-2">
            Bio <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="bio"
            className="sm:col-span-3 min-h-[100px]"
            {...register("bio")}
          />
        </div>
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="website_url" className="sm:text-right">
            Website URL{" "}
            <span className="text-muted-foreground text-sm">(optional)</span>
          </Label>
          <Input
            id="website_url"
            className="sm:col-span-3"
            {...register("website_url")}
          />
        </div>
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="twitter_handle" className="sm:text-right">
            Twitter Handle{" "}
            <span className="text-muted-foreground text-sm">(optional)</span>
          </Label>
          <Input
            id="twitter_handle"
            className="sm:col-span-3"
            {...register("twitter_handle")}
          />
        </div>
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="facebook_handle" className="sm:text-right">
            Facebook Handle{" "}
            <span className="text-muted-foreground text-sm">(optional)</span>
          </Label>
          <Input
            id="facebook_handle"
            className="sm:col-span-3"
            {...register("facebook_handle")}
          />
        </div>
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="linkedin_handle" className="sm:text-right">
            LinkedIn Handle{" "}
            <span className="text-muted-foreground text-sm">(optional)</span>
          </Label>
          <Input
            id="linkedin_handle"
            className="sm:col-span-3"
            {...register("linkedin_handle")}
          />
        </div>
        <div className="grid sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="instagram_handle" className="sm:text-right">
            Instagram Handle{" "}
            <span className="text-muted-foreground text-sm">(optional)</span>
          </Label>
          <Input
            id="instagram_handle"
            className="sm:col-span-3"
            {...register("instagram_handle")}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={updateProfileMutation.status === "executing"}
        >
          {updateProfileMutation.status === "executing"
            ? "Updating..."
            : "Update Profile"}
        </Button>
      </div>
    </form>
  );
};
