// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/[postId]/TagsSelect.tsx
"use client";
import { Label } from "@/components/ui/label";
import { updateBlogPostTagsAction } from "@/data/admin/marketing-blog";
import { DBTable } from "@/types";
import { useAction } from "next-safe-action/hooks";
import React, { useRef } from "react";
import Select, { MultiValue } from "react-select";
import { toast } from "sonner";
import { reactSelectStyles } from "./reactSelectStyles";

type TagsSelectProps = {
  post: {
    id: string;
    marketing_blog_post_tags_relationship?: DBTable<"marketing_blog_post_tags_relationship">[];
  };
  tags: DBTable<"marketing_tags">[];
};

type TagOption = {
  value: string;
  label: string;
};

export const TagsSelect: React.FC<TagsSelectProps> = ({ post, tags }) => {
  const toastRef = useRef<string | number | undefined>(undefined);

  const updateTagsMutation = useAction(updateBlogPostTagsAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating tags...", {
        description: "Please wait while we update the tags.",
      });
    },
    onSuccess: () => {
      toast.success("Done!", {
        description: `Post ${post.id} tags updated successfully`,
        id: toastRef.current,
      });
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to update tags: ${error.serverError || "Unknown error"}`,
        {
          description: `Post ${post.id} tags update failed`,
          id: toastRef.current,
        },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const handleTagsChange = (selectedOptions: MultiValue<TagOption>) => {
    const selectedTagIds = selectedOptions.map((option) => option.value);
    updateTagsMutation.execute({ postId: post.id, tagIds: selectedTagIds });
  };

  const selectedTagIds =
    post.marketing_blog_post_tags_relationship?.map((t) => t.tag_id) || [];
  const options = tags.map((tag) => ({ value: tag.id, label: tag.name }));
  const defaultValue = options.filter((option) =>
    selectedTagIds.includes(option.value),
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags</Label>
      <Select
        isMulti
        name="tags"
        options={options}
        value={defaultValue}
        onChange={(options) =>
          handleTagsChange(options as MultiValue<TagOption>)
        }
        placeholder="Select tags..."
        classNamePrefix="select"
        styles={reactSelectStyles}
      />
    </div>
  );
};
