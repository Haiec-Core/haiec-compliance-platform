import { Json } from "@/lib/database.types";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { UserNotificationPayloadType } from "@/utils/zod-schemas/notifications";
import { getFeedbackStakeholdersExceptMentionedUser } from "../feedback";
import { createAdminNotification } from "./elevatedQueries";

export const createNotification = async (
  userId: string,
  payload: UserNotificationPayloadType,
) => {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data: notification, error } = await supabaseClient
    .from("user_notifications")
    .insert({
      user_id: userId,
      payload,
    });
  if (error) throw error;
  return notification;
};

export async function createMultipleNotifications(
  notifications: Array<{ userId: string; payload: Json }>,
) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data: notificationsData, error } = await supabaseClient
    .from("user_notifications")
    .insert(
      notifications.map(({ userId, payload }) => ({
        user_id: userId,
        payload,
      })),
    );

  if (error) throw error;
  return notificationsData;
}

export const createAcceptedWorkspaceInvitationNotification = async (
  userId: string,
  {
    workspaceId,
    workspaceSlug,
    inviteeFullName,
  }: {
    workspaceId: string;
    workspaceSlug: string;
    inviteeFullName: string;
  },
) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "acceptedWorkspaceInvitation";
    }
  > = {
    workspaceId,
    type: "acceptedWorkspaceInvitation",
    userFullName: inviteeFullName,
    workspaceSlug,
  };

  return await createNotification(userId, payload);
};

export const createWorkspaceInvitationNotification = async (
  userId: string,
  {
    workspaceId,
    workspaceName,
    inviterFullName,
    invitationId,
  }: {
    workspaceId: string;
    workspaceName: string;
    inviterFullName: string;
    invitationId: string;
  },
) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "invitedToWorkspace";
    }
  > = {
    workspaceId,
    workspaceName,
    inviterFullName,
    invitationId,
    type: "invitedToWorkspace",
  };

  return await createNotification(userId, payload);
};

export const createReceivedFeedbackNotification = async ({
  feedbackId,
  feedbackTitle,
  feedbackCreatorFullName,
  feedbackCreatorId,
}: {
  feedbackId: string;
  feedbackTitle: string;
  feedbackCreatorFullName: string;
  feedbackCreatorId: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "receivedFeedback";
    }
  > = {
    type: "receivedFeedback",
    feedbackId,
    feedbackTitle,
    feedbackCreatorFullName,
  };

  return await createAdminNotification({
    payload,
    excludedAdminUserId: feedbackCreatorId,
  });
};

export const createFeedbackReceivedCommentNotification = async ({
  feedbackId,
  feedbackTitle,
  commenterId,
  commenterName,
  comment,
}: {
  feedbackId: string;
  feedbackTitle: string;
  comment: string;
  commenterId: string;
  commenterName: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "feedbackReceivedComment";
    }
  > = {
    type: "feedbackReceivedComment",
    feedbackId,
    feedbackTitle,
    comment,
    commenterName,
  };
  const feedbackStakeholders = await getFeedbackStakeholdersExceptMentionedUser(
    { feedbackId, excludedUserId: commenterId },
  );

  const [adminNotificaitonData, stakeholdersNotificationData] =
    await Promise.all([
      createMultipleNotifications(
        feedbackStakeholders?.map((userId) => ({ userId, payload })),
      ),
      createAdminNotification({ payload, excludedAdminUserId: commenterId }),
    ]);

  console.log("createFeedbackReceivedCommentNotification", {
    commenterId,
    adminNotificaitonData,
    stakeholdersNotificationData,
  });

  return {
    adminNotificaitonData,
    stakeholdersNotificationData,
  };
};

export const createFeedbackStatusChangedNotification = async ({
  feedbackId,
  newStatus,
  oldStatus,
  feedbackOwnerId,
  statusUpdaterId, //is always admin
}: {
  feedbackId: string;
  newStatus: string;
  oldStatus: string;
  feedbackOwnerId: string;
  statusUpdaterId: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "feedbackStatusChanged";
    }
  > = {
    type: "feedbackStatusChanged",
    feedbackId,
    newStatus,
    oldStatus,
  };

  if (feedbackOwnerId === statusUpdaterId) {
    //owner == admin, in which case notify all other admins
    return await createAdminNotification({
      payload,
      excludedAdminUserId: feedbackOwnerId,
    });
  } else {
    // if owner is not admin then notify all the other admins and the owner
    const [adminNotificaitonData, stakeholdersNotificationData] =
      await Promise.all([
        createNotification(feedbackOwnerId, payload),
        createAdminNotification({
          payload,
          excludedAdminUserId: statusUpdaterId,
        }),
      ]);

    return {
      adminNotificaitonData,
      stakeholdersNotificationData,
    };
  }
};

export const createFeedbackPriorityChangedNotification = async ({
  feedbackId,
  oldPriority,
  newPriority,
  feedbackOwnerId,
  priorityUpdaterId, //is always admin
}: {
  feedbackId: string;
  oldPriority: string;
  newPriority: string;
  feedbackOwnerId: string;
  priorityUpdaterId: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "feedbackPriorityChanged";
    }
  > = {
    type: "feedbackPriorityChanged",
    feedbackId,
    oldPriority,
    newPriority,
  };

  if (feedbackOwnerId === priorityUpdaterId) {
    //owner == admin, in which case notify all other admins
    return await createAdminNotification({
      payload,
      excludedAdminUserId: feedbackOwnerId,
    });
  } else {
    // if owner is not admin then notify all the other admins and the owner
    const [adminNotificaitonData, stakeholdersNotificationData] =
      await Promise.all([
        createNotification(feedbackOwnerId, payload),
        createAdminNotification({
          payload,
          excludedAdminUserId: priorityUpdaterId,
        }),
      ]);

    return {
      adminNotificaitonData,
      stakeholdersNotificationData,
    };
  }
};

export const createFeedbackTypeUpdatedNotification = async ({
  feedbackId,
  oldType,
  newType,
  feedbackOwnerId,
  typeUpdaterId, //is always admin
}: {
  feedbackId: string;
  oldType: string;
  newType: string;
  feedbackOwnerId: string;
  typeUpdaterId: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "feedbackTypeUpdated";
    }
  > = {
    type: "feedbackTypeUpdated",
    feedbackId,
    oldType,
    newType,
  };

  if (feedbackOwnerId === typeUpdaterId) {
    //owner == admin, in which case notify all other admins
    return await createAdminNotification({
      payload,
      excludedAdminUserId: feedbackOwnerId,
    });
  } else {
    // if owner is not admin then notify all the other admins and the owner
    const [adminNotificaitonData, stakeholdersNotificationData] =
      await Promise.all([
        createNotification(feedbackOwnerId, payload),
        createAdminNotification({
          payload,
          excludedAdminUserId: typeUpdaterId,
        }),
      ]);

    return {
      adminNotificaitonData,
      stakeholdersNotificationData,
    };
  }
};

export const createFeedbackAddedToRoadmapUpdatedNotification = async ({
  feedbackId,
  isInRoadmap,
  updaterId,
}: {
  feedbackId: string;
  isInRoadmap: boolean;
  updaterId: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "feedbackIsInRoadmapUpdated";
    }
  > = {
    type: "feedbackIsInRoadmapUpdated",
    feedbackId,
    isInRoadmap,
  };

  // notify all the app admins except the updater
  return await createAdminNotification({
    payload,
    excludedAdminUserId: updaterId,
  });
};

export const createUpdateFeedbackOpenForCommentsNotification = async ({
  feedbackId,
  isOpenForComments,
  updaterId,
}: {
  feedbackId: string;
  isOpenForComments: boolean;
  updaterId: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "feedbackFeedbackOpenForCommentUpdated";
    }
  > = {
    type: "feedbackFeedbackOpenForCommentUpdated",
    feedbackId,
    isOpenForComments,
  };

  // notify all the app admins except the updater
  return await createAdminNotification({
    payload,
    excludedAdminUserId: updaterId,
  });
};

export const createFeedbackVisibilityUpdatedNotification = async ({
  feedbackId,
  isPubliclyVisible,
  updaterId,
}: {
  feedbackId: string;
  isPubliclyVisible: boolean;
  updaterId: string;
}) => {
  const payload: Extract<
    UserNotificationPayloadType,
    {
      type: "feedbackVisibilityUpdated";
    }
  > = {
    type: "feedbackVisibilityUpdated",
    feedbackId,
    isPubliclyVisible,
  };

  // notify all the app admins except the updater
  return await createAdminNotification({
    payload,
    excludedAdminUserId: updaterId,
  });
};
