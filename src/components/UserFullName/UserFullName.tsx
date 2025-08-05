import { T } from "@/components/ui/Typography";
import { getUserFullNameClient } from "@/data/user/client/profile";
import { useQuery } from "@tanstack/react-query";

export const UserFullName = ({ userId }: { userId: string }) => {
  const { data: userFullName } = useQuery({
    queryKey: ["user-full-name", userId],
    queryFn: () => getUserFullNameClient(userId),
  });
  return <T.Subtle className="text-xs">{userFullName ?? "User"}</T.Subtle>;
};
