import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";

type Props = {
  onConfirm: () => void;
};

export const ConfirmRejectProjectDialog = ({ onConfirm }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="default">
          <Trash className="mr-2 h-5 w-5" /> Reject Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <Trash className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Reject Project</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to reject this project?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
