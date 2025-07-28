"use client";

import { useNotificationsContext } from "@/contexts/NotificationsContext";
import { Badge } from "./ui/badge";

export function UnseenNotificationCounterBadge() {
  const { unseenNotificationCount } = useNotificationsContext();
  if (unseenNotificationCount === 0) {
    return null;
  }
  return <Badge variant="destructive">{unseenNotificationCount}</Badge>;
}
