"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useNotificationsContext } from "@/contexts/NotificationsContext";
import type { DBTable } from "@/types";
import { parseNotification } from "@/utils/parseNotification";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import moment from "moment";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { NotificationItem } from "./notification-item";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

function Notification({
  notification,
}: {
  notification: DBTable<"user_notifications">;
}) {
  const notificationPayload = parseNotification(notification.payload);
  const handleNotificationClick = useCallback(() => {
    if (notificationPayload.type === "welcome") {
      toast("Welcome to Nextbase");
    }
  }, [notificationPayload]);

  const { mutateSeeNotification } = useNotificationsContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="divide-y grid grid-cols-1"
    >
      <NotificationItem
        key={notification.id}
        title={notificationPayload.title}
        description={notificationPayload.description}
        createdAt={moment(notification.created_at).fromNow()}
        href={
          notificationPayload.actionType === "link"
            ? notificationPayload.href
            : undefined
        }
        onClick={
          notificationPayload.actionType === "button"
            ? handleNotificationClick
            : undefined
        }
        image={notificationPayload.image}
        icon={notificationPayload.icon}
        isRead={notification.is_read}
        isNew={!notification.is_seen}
        notificationId={notification.id}
        onHover={() => {
          if (!notification.is_seen) {
            mutateSeeNotification(notification.id);
          }
        }}
      />
    </motion.div>
  );
}

export const NotificationsDialog = () => {
  const {
    unseenNotificationIds,
    mutateReadAllNotifications,

    notifications,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isDialogOpen,
    setIsDialogOpen,
  } = useNotificationsContext();

  useEffect(() => {
    refetch();
  }, [unseenNotificationIds, refetch]);
  console.log(isDialogOpen);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="md:w-[560px] w-full rounded-xl overflow-hidden">
        <DialogHeader>
          <div className="flex items-center">
            <DialogTitle>Notifications</DialogTitle>
            {unseenNotificationIds?.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => mutateReadAllNotifications()}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Check className="w-4 h-4 mr-1" />
                Mark all as read
              </motion.button>
            )}
          </div>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4"
              >
                <Skeleton className="h-16 mb-2" />
                <Skeleton className="h-16 mb-2" />
                <Skeleton className="h-16" />
              </motion.div>
            ) : notifications?.length > 0 ? (
              notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 text-center text-muted-foreground"
              >
                No notifications yet.
              </motion.div>
            )}
          </AnimatePresence>
          {hasNextPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 text-center"
            >
              {isFetchingNextPage ? (
                <Skeleton className="h-8 w-24 mx-auto" />
              ) : (
                <button
                  onClick={() => fetchNextPage()}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Load more
                </button>
              )}
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
