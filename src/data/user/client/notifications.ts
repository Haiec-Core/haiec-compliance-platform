// @/src/data/user/client/notifications.ts
"use client";
import { supabaseUserClientComponent } from "@/supabase-clients/user/supabaseUserClientComponent";
import type { DBTable, SAPayload } from "@/types";

export const readNotification = async (notificationId: string) => {
  const { data: notification, error } = await supabaseUserClientComponent
    .from("user_notifications")
    .update({ is_read: true })
    .match({ id: notificationId })
    .select("*");
  if (error) throw error;
  return notification;
};

export const readAllNotifications = async (
  userId: string,
): Promise<SAPayload<DBTable<"user_notifications">[]>> => {
  const { data: notifications, error } = await supabaseUserClientComponent
    .from("user_notifications")
    .update({ is_read: true, is_seen: true })
    .match({ user_id: userId })
    .select("*");

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    data: notifications,
  };
};

export const seeNotification = async (notificationId: string) => {
  const { data: notification, error } = await supabaseUserClientComponent
    .from("user_notifications")
    .update({ is_seen: true })
    .match({ id: notificationId })
    .select("*");
  if (error) throw error;
  return notification;
};

export const getPaginatedNotifications = async (
  userId: string,
  pageNumber: number,
  limit: number,
): Promise<[number, Array<DBTable<"user_notifications">>]> => {
  const { data: notifications, error } = await supabaseUserClientComponent
    .from("user_notifications")
    .select("*")
    .match({ user_id: userId })
    .order("created_at", { ascending: false })
    .range(pageNumber * limit, (pageNumber + 1) * limit - 1);
  if (error) throw error;
  return [pageNumber, notifications];
};

export const getUnseenNotificationIds = async (userId: string) => {
  const { data: notifications, error } = await supabaseUserClientComponent
    .from("user_notifications")
    .select("id")
    .eq("is_seen", false)
    .eq("user_id", userId);
  if (error) throw error;
  return notifications;
};
