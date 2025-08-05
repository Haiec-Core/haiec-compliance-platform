import { CommentWithUser, DBTable } from "@/types";

export function normalizeComment(
  comments: DBTable<"project_comments"> & {
    user_profiles:
      | DBTable<"user_profiles">
      | Array<DBTable<"user_profiles">>
      | null;
  },
): CommentWithUser {
  const user_profiles = Array.isArray(comments.user_profiles)
    ? comments.user_profiles[0]
    : comments.user_profiles;
  if (!user_profiles) {
    throw new Error("No user profile found for comment");
  }

  return {
    ...comments,
    user_profile: user_profiles,
  };
}
