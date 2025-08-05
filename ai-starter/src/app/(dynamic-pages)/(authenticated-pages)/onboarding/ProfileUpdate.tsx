"use client";
import { FormInput } from "@/components/form-components/FormInput";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { getUserAvatarUrl } from "@/utils/helpers";
import { profileUpdateFormSchema } from "@/utils/zod-schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useOnboarding } from "./OnboardingContext";

export function ProfileUpdate() {
  const {
    userProfile,
    userEmail,
    profileUpdateActionState,
    uploadAvatarMutation,
    avatarURLState,
  } = useOnboarding();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarUrlWithFallback = getUserAvatarUrl({
    profileAvatarUrl: avatarURLState ?? userProfile.avatar_url,
    email: userEmail,
  });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof profileUpdateFormSchema
  >(profileUpdateActionState.result.validationErrors, { joinBy: "\n" });

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
      uploadAvatarMutation.execute({
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

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((data) =>
          profileUpdateActionState.execute({
            ...data,
            isOnboardingFlow: true,
          }),
        )}
      >
        <CardHeader>
          <CardTitle data-testid="profile-update-title">
            Create Your Profile
          </CardTitle>
          <CardDescription>
            Let&apos;s set up your personal details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                disabled={uploadAvatarMutation.status === "executing"}
              />
              <Button
                type="button"
                variant="outline"
                data-testid="change-avatar-button"
                size="sm"
                onClick={handleAvatarButtonClick}
                disabled={uploadAvatarMutation.status === "executing"}
              >
                {uploadAvatarMutation.status === "executing"
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
            data-testid="full-name-input"
          />
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={profileUpdateActionState.status === "executing"}
            data-testid="save-profile-button"
          >
            {profileUpdateActionState.status === "executing"
              ? "Saving..."
              : "Save Profile"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
