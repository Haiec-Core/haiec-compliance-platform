"use client";
import { FormInput } from "@/components/form-components/FormInput";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  updateUserFullNameAction,
  uploadPublicUserAvatarAction,
} from "@/data/user/user";
import type { DBTable } from "@/types";
import { getUserAvatarUrl } from "@/utils/helpers";
import { profileUpdateFormSchema } from "@/utils/zod-schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useOptimisticAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ConfirmDeleteAccountDialog } from "./ConfirmDeleteAccountDialog";

export function AccountSettings({
  userProfile,
  userEmail,
}: {
  userProfile: DBTable<"user_profiles">;
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    userProfile.avatar_url ?? undefined,
  );

  const {
    execute: updateUserName,
    status: updateNameStatus,
    result: updateNameResult,
  } = useOptimisticAction(updateUserFullNameAction, {
    currentState: userProfile.full_name ?? "",
    updateFn: (_, { fullName }) => fullName,
    onExecute: () => {
      toastRef.current = toast.loading("Updating name...");
    },
    onSuccess: () => {
      toast.success("Name updated!", {
        id: toastRef.current,
      });
      toastRef.current = undefined;
      router.refresh();
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError ?? "Failed to update name";
      toast.error(errorMessage, {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
  });

  const { execute: uploadAvatar, status: uploadAvatarStatus } =
    useOptimisticAction(uploadPublicUserAvatarAction, {
      onExecute: () => {
        toastRef.current = toast.loading("Uploading avatar...");
      },
      onSuccess: ({ data }) => {
        setAvatarUrl(data);
        toast.success("Avatar uploaded!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        router.refresh();
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to upload avatar";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      currentState: avatarUrl,
      updateFn: (_, { formData }) => {
        try {
          const file = formData.get("file");
          if (file instanceof File) {
            return URL.createObjectURL(file);
          }
        } catch (error) {
          console.error(error);
        }
        return avatarUrl;
      },
    });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof profileUpdateFormSchema
  >(updateNameResult.validationErrors, { joinBy: "\n" });

  const form = useForm({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      fullName: userProfile.full_name ?? "",
    },
    errors: hookFormValidationErrors,
  });

  const { handleSubmit, control } = form;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadAvatar({
        formData,
        fileName: file.name,
        fileOptions: {
          upsert: true,
        },
      });
    }
  };

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  const avatarUrlWithFallback = getUserAvatarUrl({
    profileAvatarUrl: avatarUrl ?? userProfile.avatar_url,
    email: userEmail,
  });

  return (
    <div className="max-w-sm">
      <div className="space-y-16">
        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={handleSubmit(updateUserName)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="avatar" className="text-sm font-medium">
                    Avatar
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        fill
                        className="rounded-full object-cover"
                        src={avatarUrlWithFallback}
                        alt="User avatar"
                      />
                    </div>
                    <input
                      ref={fileInputRef}
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                      disabled={uploadAvatarStatus === "executing"}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAvatarButtonClick}
                      disabled={uploadAvatarStatus === "executing"}
                    >
                      {uploadAvatarStatus === "executing"
                        ? "Uploading..."
                        : "Change Avatar"}
                    </Button>
                  </div>
                </div>
                <FormInput
                  id="full-name"
                  label="Full Name"
                  control={control}
                  name="fullName"
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    updateNameStatus === "executing" ||
                    uploadAvatarStatus === "executing"
                  }
                >
                  {updateNameStatus === "executing" ? "Saving..." : "Save Name"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="space-y-2">
          <PageHeading
            title="Danger zone"
            titleClassName="text-xl"
            subTitleClassName="text-base -mt-1"
            subTitle="Delete your account. This action is irreversible. All your data will be lost."
          />
          <ConfirmDeleteAccountDialog />
        </div>
      </div>
    </div>
  );
}
