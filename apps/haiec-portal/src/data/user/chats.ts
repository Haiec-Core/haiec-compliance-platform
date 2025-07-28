"use server";

import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { z } from "zod";

const insertChatSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  userId: z.string(),
});

export const insertChatAction = authActionClient
  .schema(insertChatSchema)
  .action(async ({ parsedInput: { id, projectId, userId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const { data, error } = await supabaseClient
      .from("chats")
      .insert({
        id,
        project_id: projectId,
        user_id: userId,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });

const upsertChatSchema = z.object({
  projectId: z.string(),
  payload: z.array(z.any()),
  chatId: z.string(),
});

export const upsertChatAction = authActionClient
  .schema(upsertChatSchema)
  .action(
    async ({
      parsedInput: { projectId, payload, chatId },
      ctx: { userId },
    }) => {
      const supabaseClient = await createSupabaseUserServerActionClient();
      const { data, error } = await supabaseClient
        .from("chats")
        .upsert(
          {
            id: chatId,
            project_id: projectId,
            user_id: userId,
            payload: JSON.stringify({ messages: payload }),
          },
          { onConflict: "id" },
        )
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  );

export const getChatById = async (chatId: string) => {
  const supabase = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const deleteChatSchema = z.object({
  chatId: z.string(),
});

export const deleteChatAction = authActionClient
  .schema(deleteChatSchema)
  .action(async ({ parsedInput: { chatId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const { error } = await supabaseClient
      .from("chats")
      .delete()
      .eq("id", chatId);

    if (error) {
      throw new Error(error.message);
    }
  });

export const getChats = async (userId: string) => {
  const supabase = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getChatsHistory = async (projectId: string, userId: string) => {
  const supabase = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
};
