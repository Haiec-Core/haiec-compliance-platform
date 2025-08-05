"use server";

import { Link } from "@/components/intl-link";
import { Badge } from "@/components/ui/badge";
import { getPendingInvitationCountOfUser } from "@/data/user/invitation";
import { Mail } from "lucide-react";

export async function PendingInvitationCounter() {
  const count = await getPendingInvitationCountOfUser();
  if (count) {
    return (
      <Link href="/user/invitations">
        <Badge className="px-3 w-max h-fit rounded-md py-2" variant="secondary">
          <Mail className="h-4 w-4 mr-2" />
          {count} pending invites
        </Badge>
      </Link>
    );
  }
  return null;
}
