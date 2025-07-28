"use client";

import { Label } from "@/components/ui/label";
import { updateChangelogAuthorsAction } from "@/data/admin/marketing-changelog";
import { DBTable } from "@/types";
import { useAction } from "next-safe-action/hooks";
import React, { useRef } from "react";
import Select, { MultiValue } from "react-select";
import { toast } from "sonner";

type AuthorsSelectProps = {
  changelog: {
    id: string;
    marketing_changelog_author_relationship: { author_id: string }[];
  };
  authors: DBTable<"marketing_author_profiles">[];
};

type AuthorOption = {
  value: string;
  label: string;
};

export const AuthorsSelect: React.FC<AuthorsSelectProps> = ({
  changelog,
  authors,
}) => {
  const toastRef = useRef<string | number | undefined>(undefined);

  const updateAuthorsMutation = useAction(updateChangelogAuthorsAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating authors...", {
        description: "Please wait while we update the authors.",
      });
    },
    onSuccess: () => {
      toast.success("Authors updated successfully", { id: toastRef.current });
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to update authors: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const handleAuthorsChange = (selectedOptions: MultiValue<AuthorOption>) => {
    const selectedAuthorIds = selectedOptions.map((option) => option.value);
    updateAuthorsMutation.execute({
      changelogId: changelog.id,
      authorIds: selectedAuthorIds,
    });
  };

  const selectedAuthorIds =
    changelog.marketing_changelog_author_relationship.map((a) => a.author_id);
  const options = authors.map((author) => ({
    value: author.id,
    label: author.display_name,
  }));
  const defaultValue = options.filter((option) =>
    selectedAuthorIds.includes(option.value),
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="authors">Authors</Label>
      <Select
        isMulti
        name="authors"
        options={options}
        value={defaultValue}
        onChange={handleAuthorsChange}
        placeholder="Select authors..."
        classNamePrefix="select"
      />
    </div>
  );
};
