import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { anonGetUserProfile } from "@/data/user/elevatedQueries";
import { DBTable } from "@/types";
import { formatDistance } from "date-fns";

export async function FeedbackAvatarServer({
  feedback,
}: {
  feedback: DBTable<"marketing_feedback_threads">;
}) {
  const publicUserName = await anonGetUserProfile(feedback.user_id);
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={publicUserName?.avatarUrl ?? undefined}
          alt="User avatar"
        />
        <AvatarFallback>{publicUserName?.fullName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 text-xs">
        <span className="font-medium">
          {publicUserName?.fullName ?? "New User"}
        </span>
        <span className="text-muted-foreground">
          {formatDistance(new Date(feedback.created_at), new Date(), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}
