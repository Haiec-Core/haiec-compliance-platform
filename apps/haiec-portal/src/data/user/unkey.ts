"use server";
import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const generateKeyResponseSchema = z.object({
  keyId: z.string(),
  key: z.string(),
});

function maskKey(key: string): string {
  const start = key.substr(0, 3);
  const end = key.substr(-3);
  const masked = "*".repeat(key.length - 6);
  return start + masked + end;
}

export const generateUnkeyTokenAction = authActionClient.action(
  async ({ ctx: { userId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const response = await axios.post(
      "https://api.unkey.dev/v1/keys.createKey",
      {
        apiId: process.env.UNKEY_API_ID,
        externalId: userId,
        prefix: "st_",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.UNKEY_ROOT_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const { keyId, key } = generateKeyResponseSchema.parse(response.data);

    const { data: insertKeyResponse, error: insertKeyError } =
      await supabaseClient
        .from("user_api_keys")
        .insert({
          key_id: keyId,
          masked_key: maskKey(key),
          user_id: userId,
        })
        .select("*")
        .single();

    if (insertKeyError) {
      throw new Error(insertKeyError.message);
    }

    return {
      keyId,
      key,
      createdAt: insertKeyResponse.created_at,
    };
  },
);

const revokeUnkeyTokenSchema = z.object({
  keyId: z.string(),
});

export const revokeUnkeyTokenAction = authActionClient
  .schema(revokeUnkeyTokenSchema)
  .action(async ({ parsedInput: { keyId } }) => {
    console.log("revoking key", keyId);
    try {
      const response = await axios.post(
        `https://api.unkey.dev/v1/keys.deleteKey`,
        {
          keyId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.UNKEY_ROOT_KEY}`,
          },
        },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          "[Unkey API]: Error revoking key " + error.response?.data,
        );
      }
      throw error;
    }
    const supabaseClient = await createSupabaseUserServerActionClient();
    console.log("revoking key", keyId);
    const { error } = await supabaseClient
      .from("user_api_keys")
      .update({
        is_revoked: true,
      })
      .eq("key_id", keyId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");

    return { ok: true };
  });

export const getActiveDeveloperKeys = async () => {
  const user = await serverGetLoggedInUserVerified();
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("user_api_keys")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_revoked", false);

  if (error) {
    throw error;
  }
  return data;
};

export const getActiveDeveloperKeyCount = async () => {
  const user = await serverGetLoggedInUserVerified();
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { count, error } = await supabaseClient
    .from("user_api_keys")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_revoked", false);

  if (error) {
    console.log(error);
    throw error;
  }
  return count ?? 0;
};

export const getRevokedApiKeyList = async () => {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  const { data, error } = await supabaseClient
    .from("user_api_keys")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_revoked", true);

  if (error) {
    throw error;
  }
  return data;
};
