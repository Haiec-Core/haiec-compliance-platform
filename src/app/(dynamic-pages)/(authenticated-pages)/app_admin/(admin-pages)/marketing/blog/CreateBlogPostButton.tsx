// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/CreateBlogPostButton.tsx
"use client";
import { Button } from "@/components/ui/button";
import { createBlogPostAction } from "@/data/admin/marketing-blog";
import Chance from "chance";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import slugify from "slugify";
import { toast } from "sonner";

export const CreateBlogPostButton: React.FC = () => {
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const createPostMutation = useAction(createBlogPostAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Creating blog post...", {
        description: "Please wait while we create the post.",
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Blog post created!", {
        id: toastRef.current,
        description: "Please wait while we redirect you to the new post.",
      });
      toastRef.current = undefined;
      if (data) {
        router.push(`/app_admin/marketing/blog/${data.id}`);
      }
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to create blog post: ${error.serverError || "Unknown error"}`,
        {
          id: toastRef.current,
          description: "Please try again.",
        },
      );
      toastRef.current = undefined;
    },
  });

  const handleCreatePost = () => {
    const chance = new Chance();
    const title = chance.sentence({ words: 5 });
    const slug = slugify(title, {
      lower: true,
      strict: true,
      replacement: "-",
    });

    createPostMutation.execute({
      title,
      slug,
      summary: chance.paragraph({ sentences: 2 }),
      content: chance.paragraph({ sentences: 5 }),
      stringified_json_content: JSON.stringify({}),
      stringified_seo_data: JSON.stringify({}),
      status: "draft",
    });
  };

  return (
    <Button
      onClick={handleCreatePost}
      disabled={createPostMutation.status === "executing"}
    >
      <Plus className="mr-2 h-4 w-4" />
      Create Blog Post
    </Button>
  );
};
