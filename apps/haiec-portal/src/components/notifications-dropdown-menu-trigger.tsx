"use client";

import { useNotificationsContext } from "@/contexts/NotificationsContext";
import { Bell } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { UnseenNotificationCounterBadge } from "./unseen-notification-counter-badge";

export function NotificationsDropdownMenuTrigger() {
  const { setIsDialogOpen } = useNotificationsContext();
  return (
    <DropdownMenuItem
      className="flex items-center justify-between gap-2"
      onClick={() => {
        console.log("clicked");
        setIsDialogOpen(true);
      }}
    >
      <span className="flex items-center gap-2">
        <Bell />
        Notifications
      </span>
      <UnseenNotificationCounterBadge />
    </DropdownMenuItem>
  );
}
