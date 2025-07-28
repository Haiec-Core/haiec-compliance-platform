import { T } from "@/components/ui/Typography";
import { cn } from "@/utils/cn";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from 'next/link';

export default function InvitationsNavbar() {
  return (
    <div className={cn("hidden lg:block", "relative ")}>
      <T.P className="my-0">
        <Link href="/user/invitations">
          <span className="space-x-2 flex items-center">
            <ArrowLeftIcon />
            <span>Back to Invitations</span>
          </span>
        </Link>
      </T.P>
    </div>
  );
}
