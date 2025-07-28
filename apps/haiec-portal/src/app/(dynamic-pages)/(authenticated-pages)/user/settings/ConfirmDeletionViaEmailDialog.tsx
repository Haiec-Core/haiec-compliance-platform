"use client";
import { Link } from "@/components/intl-link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const ConfirmDeletionViaEmailDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Account Deletion</DialogTitle>
          <DialogDescription>
            You should have received an email with a confirmation link. Clicking
            on this link will permanently delete your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Link href="/logout">
            <Button variant="destructive">Logout</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
