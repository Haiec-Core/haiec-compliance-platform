"use client";
import { generateImageAction } from "@/data/user/dalle";
import { updateUserProfilePictureAction } from "@/data/user/user";
import { GenerateImageSchemaType } from "@/utils/zod-schemas/dalle";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, Copy, Loader, Wand2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormInput } from "./form-components/FormInput";
import { FormSelect } from "./form-components/FormSelect";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import { Skeleton } from "./ui/skeleton";

const generateImageSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  size: z.string(),
});

export const DallE = () => {
  const [images, setImages] = useState<string[]>([]);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: updateProfilePicture, isPending: isUpdatingProfilePicture } =
    useAction(updateUserProfilePictureAction, {
      onExecute: () => {
        toastRef.current = toast.loading("Updating profile picture...");
      },
      onSuccess: () => {
        toast.success("Profile picture updated successfully", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Error updating profile picture";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    });

  const { execute: generateImage, status: generateImageStatus } = useAction(
    generateImageAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Generating image...");
      },
      onSuccess: async ({ data }) => {
        toast.success("Image generated successfully", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        if (data) {
          setImages((images) => [...images, ...data]);
        }
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Error generating image";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  const form = useForm<GenerateImageSchemaType>({
    defaultValues: {
      prompt: "",
      size: "512x512",
    },
    resolver: zodResolver(generateImageSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: GenerateImageSchemaType) => {
    generateImage(data);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>AI Image Generator</CardTitle>
        <CardDescription>
          Create stunning images with DALL-E AI. Simply enter a prompt and
          choose your desired image size.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              id="prompt"
              label="Image Prompt"
              control={control}
              name="prompt"
              inputProps={{
                placeholder:
                  "E.g., A serene landscape with mountains and a lake at sunset",
              }}
            />

            <FormSelect
              id="size"
              label="Image Size"
              control={control}
              name="size"
              options={[
                { label: "Large (1024x1024)", value: "1024x1024" },
                { label: "Medium (512x512)", value: "512x512" },
                { label: "Small (256x256)", value: "256x256" },
              ]}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={generateImageStatus === "executing"}
            >
              {generateImageStatus === "executing" ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8">
          {!images.length && generateImageStatus !== "executing" && (
            <p className="text-center text-muted-foreground">
              Your generated images will appear here. Start by entering a prompt
              above!
            </p>
          )}
          {generateImageStatus === "executing" ? (
            <Skeleton className="w-full aspect-square max-w-md mx-auto bg-background flex items-center justify-center">
              <Loader className="h-8 w-8 animate-spin" />
            </Skeleton>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.map((image) => (
                <Card key={image}>
                  <CardContent className="p-4">
                    <div className="relative aspect-square w-full mb-4">
                      <Image
                        src={image}
                        className="rounded-lg object-cover"
                        alt="Generated Image"
                        fill
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        className="flex-1 flex items-center justify-center"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(image);
                          toast.success("Image URL copied to clipboard");
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Copy URL
                      </Button>
                      <Button
                        className="flex-1 flex items-center justify-center"
                        disabled={isUpdatingProfilePicture}
                        onClick={() =>
                          updateProfilePicture({ avatarUrl: image })
                        }
                      >
                        <CircleUserRound className="mr-2 h-4 w-4" /> Set as
                        Profile Picture
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
