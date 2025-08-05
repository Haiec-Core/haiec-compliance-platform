// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/authors/page.tsx
import { Typography } from "@/components/ui/Typography";
import { getAllAuthorProfiles } from "@/data/admin/marketing-authors";
import { AuthorsList } from "./AuthorsList";

export default async function MarketingAuthorsPage() {
  const authors = await getAllAuthorProfiles();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Typography.H1 className="text-3xl font-bold tracking-tight">
          Marketing Authors
        </Typography.H1>
        <Typography.P className="text-muted-foreground">
          Manage and view all marketing author profiles.
        </Typography.P>
      </div>
      <AuthorsList authors={authors} />
    </div>
  );
}
