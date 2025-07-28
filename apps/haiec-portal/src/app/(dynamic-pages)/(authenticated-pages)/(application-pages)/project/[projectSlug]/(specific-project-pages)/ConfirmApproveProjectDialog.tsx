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
import { Check } from "lucide-react";
import { useState } from "react";

type Props = {
  onConfirm: () => void;
};

export const ConfirmApproveProjectDialog = ({ onConfirm }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default" className="gap-2">
          <Check className=" h-5 w-5" />
          <span className="hidden sm:inline">Approve Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <Check className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Approve Project</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to approve this project?
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
            variant="default"
            className="w-full"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
