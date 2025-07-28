import { T } from "@/components/ui/Typography";
import { FallbackImage, UserAvatar } from "@/components/UserAvatar";
import { UserFullName } from "@/components/UserFullName";
import { CommentWithUser } from "@/types";
import { format } from "date-fns";
import { Suspense } from "react";

export function CommentList({ comments }: { comments: CommentWithUser[] }) {
  return comments.map((comment) => (
    <div
      key={comment.id}
      className="grid grid-cols-[24px_1fr] items-start gap-3 px-6 py-4"
    >
      <Suspense fallback={<FallbackImage size={24} />}>
        <UserAvatar userId={comment.user_id} size={24} />
      </Suspense>
      <div className="space-y-2">
        <Suspense>
          <UserFullName userId={comment.user_id} />
        </Suspense>
        <T.Small className="m-0">{comment.text}</T.Small>
        {comment.created_at ? (
          <T.Subtle className="text-xs text-muted-foreground">
            {format(new Date(comment.created_at), "PPpp")}
          </T.Subtle>
        ) : null}
      </div>
    </div>
  ));
}
