"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getPaginatedNotifications,
  getUnseenNotificationIds,
  readAllNotifications,
  readNotification,
  seeNotification,
} from "@/data/user/client/notifications";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useSAToastMutation } from "@/hooks/useSAToastMutation";
import { supabaseUserClientComponent } from "@/supabase-clients/user/supabaseUserClientComponent";
import type { DBTable } from "@/types";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * Constant representing the number of notifications to fetch per page.
 */
const NOTIFICATIONS_PAGE_SIZE = 10;

/**
 * Custom hook to fetch unseen notification IDs for a given user.
 * @param userId - The ID of the user whose unseen notifications are to be fetched.
 * @returns The unseen notification IDs.
 */
const useUnseenNotificationIds = (userId: string) => {
  const { data, refetch } = useQuery({
    queryKey: ["unseen-notification-ids", userId],
    queryFn: async () => {
      return getUnseenNotificationIds(userId);
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    const channelId = `user-notifications:${userId}`;
    const channel = supabaseUserClientComponent
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_notifications",
          filter: "user_id=eq." + userId,
        },
        () => {
          refetch();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_notifications",
          filter: "user_id=eq." + userId,
        },
        (payload) => {
          refetch();
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [refetch, userId]);

  return data ?? 0;
};

/**
 * Custom hook to manage notifications for a given user.
 * @param userId - The ID of the user whose notifications are to be managed.
 * @returns An object containing notifications and related state.
 */
export const useNotifications = (userId: string) => {
  const {
    data,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["paginatedNotifications", userId],
    queryFn: async ({ pageParam }) => {
      return getPaginatedNotifications(
        userId,
        pageParam ?? 0,
        NOTIFICATIONS_PAGE_SIZE,
      );
    },
    getNextPageParam: (lastPage, _pages) => {
      const pageNumber = lastPage[0];
      const rows = lastPage[1];

      if (rows.length < NOTIFICATIONS_PAGE_SIZE) return undefined;
      return pageNumber + 1;
    },
    initialPageParam: 0,
    initialData: {
      pageParams: [0],
      pages: [[0, []]],
    },
    // You can disable it here
    refetchOnWindowFocus: false,
  });

  const notifications = data?.pages.flatMap((page) => page[1]) ?? [];
  return {
    notifications,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  };
};

/**
 * Custom hook to mark all notifications as read for a given user.
 * @param userId - The ID of the user whose notifications are to be marked as read.
 * @returns A mutation function to mark all notifications as read.
 */
const useReadAllNotifications = (userId: string) => {
  const router = useRouter();
  return useSAToastMutation(
    async () => {
      return readAllNotifications(userId);
    },
    {
      loadingMessage: "Marking all notifications as read...",
      successMessage: "All notifications marked as read",
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to mark all notifications as read ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return "Failed to mark all notifications as read";
        }
      },
      onSuccess: () => {
        router.refresh();
      },
    },
  );
};

/**
 * Context type for managing notifications state and actions.
 */
type NotificationsContextType = {
  /**
   * List of unseen notification IDs.
   */
  unseenNotificationIds: Array<{
    id: string;
  }>;
  /**
   * List of notifications.
   */
  notifications: DBTable<"user_notifications">[];
  /**
   * Indicates if there are more pages of notifications.
   */
  hasNextPage: boolean | undefined;
  /**
   * Function to fetch the next page of notifications.
   */
  fetchNextPage: () => void;
  /**
   * Indicates if the next page is being fetched.
   */
  isFetchingNextPage: boolean;
  /**
   * Indicates if the notifications are currently loading.
   */
  isLoading: boolean;
  /**
   * Function to refetch notifications.
   */
  refetch: () => void;
  /**
   * Function to mark all notifications as read.
   */
  mutateReadAllNotifications: () => void;
  /**
   * Function to mark a specific notification as seen.
   */
  mutateSeeNotification: (notificationId: string) => void;
  /**
   * Function to mark a specific notification as read.
   */
  mutateReadNotification: (notificationId: string) => void;
  /**
   * Count of unseen notifications.
   */
  unseenNotificationCount: number;
  /**
   * Indicates if the dialog is open.
   */
  isDialogOpen: boolean;
  /**
   * Function to set the dialog open state.
   */
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Context for notifications, providing state and actions.
 */
const NotificationsContext = createContext<NotificationsContextType>(
  {} as NotificationsContextType,
);

/**
 * Provider component for notifications context.
 * @param children - The child components that will have access to the notifications context.
 * @returns The NotificationsProvider component.
 */
export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useLoggedInUser();
  const userId = user.id;
  const unseenNotificationIds = useUnseenNotificationIds(userId);
  const {
    notifications,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useNotifications(userId);
  const { mutate: mutateReadAllNotifications } =
    useReadAllNotifications(userId);
  const router = useRouter();
  const { mutate: mutateSeeNotification } = useMutation({
    mutationFn: async (notificationId: string) =>
      await seeNotification(notificationId),

    onSuccess: () => router.refresh(),
  });

  const { mutate: mutateReadNotification } = useMutation({
    mutationFn: async (notificationId: string) =>
      await readNotification(notificationId),

    onSuccess: () => router.refresh(),
  });

  useEffect(() => {
    refetch();
  }, [unseenNotificationIds, refetch]);
  const unseenNotificationCount = unseenNotificationIds.length;

  const memoizedContextValue = useMemo(
    () => ({
      unseenNotificationIds,
      notifications,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
      isLoading,
      refetch,
      mutateReadAllNotifications,
      mutateSeeNotification,
      mutateReadNotification,
      unseenNotificationCount,
      isDialogOpen,
      setIsDialogOpen,
    }),
    [
      unseenNotificationIds,
      notifications,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
      isLoading,
      refetch,
      mutateReadAllNotifications,
      mutateSeeNotification,
      mutateReadNotification,
      unseenNotificationCount,
      isDialogOpen,
      setIsDialogOpen,
    ],
  );

  return (
    <NotificationsContext.Provider value={memoizedContextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

/**
 * Custom hook to access notifications context.
 * @returns The notifications context.
 * @throws Will throw an error if used outside of NotificationsProvider.
 */
export function useNotificationsContext() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsProvider",
    );
  }
  return context;
}
