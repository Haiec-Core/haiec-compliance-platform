// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/authors/[authorId]/page.tsx
import { getAuthorProfileById } from "@/data/admin/marketing-authors";
import { notFound } from "next/navigation";
import { UpdateMarketingAuthorProfileForm } from "./UpdateMarketingAuthorProfileForm";

export default async function UpdateMarketingAuthorPage(props: {
  params: Promise<{ authorId: string }>;
}) {
  const params = await props.params;
  const author = await getAuthorProfileById(params.authorId);

  if (!author) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Update Marketing Author Profile</h1>
      <UpdateMarketingAuthorProfileForm author={author} />
    </div>
  );
}
