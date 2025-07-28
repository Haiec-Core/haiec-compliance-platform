"use client";

import { Link } from "@/components/intl-link";
import { SlimWorkspace } from "@/types";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Button } from "./Button";
import { Typography } from "./ui/Typography";
import { AspectRatio } from "./ui/aspect-ratio";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { SidebarMenuButton } from "./ui/sidebar";
export function ProFeatureGateDialog({
  workspace,
  label,
  icon,
}: {
  workspace: SlimWorkspace;
  label: string;
  icon: ReactNode;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="w-full mb-0">
        <SidebarMenuButton>
          {icon}
          <span>{label}</span>
          <span className="text-xs rounded-md px-2 py-1 uppercase font-medium bg-tremor-brand-subtle text-primary-foreground ">
            Pro
          </span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 items-center hide-dialog-close">
        <AspectRatio
          ratio={16 / 9}
          className="rounded-lg overflow-hidden relative h-full "
        >
          <motion.div
            initial={{ scale: 5, filter: "blur(5px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 w-full h-full z-20 flex place-content-center"
          >
            <Image
              src="/assets/feature-pro-text.png"
              alt="Feature Pro"
              fill
              className="z-10"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 2, filter: "blur(2px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 w-full h-full flex place-content-center"
          >
            <Image
              src="/assets/feature-pro.jpeg"
              alt="Feature Pro"
              fill
              className="z-10"
            />
          </motion.div>
        </AspectRatio>
        <div className="mt-4 flex gap-2.5 items-center justify-start">
          <DialogTitle className="mt-0">Upgrade to</DialogTitle>
          <span className="px-2 text-sm text-primary-foreground rounded-md py-1 bg-primary flex place-content-center">
            PRO
          </span>
        </div>
        <Typography.P className="text-muted-foreground text-center mb-4">
          This is a dummy feature gate dialog. You can show this dialog to
          describe the advanced features, unlimited team members, collaborative
          workspace and more and protect access to the feature until the user
          upgrades to PRO.
        </Typography.P>
        <Link
          href={getWorkspaceSubPath(workspace, "/settings/billing")}
          className="w-full"
          onClick={() => setIsDialogOpen(false)}
        >
          <Button className="w-full">Upgrade to Pro</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
