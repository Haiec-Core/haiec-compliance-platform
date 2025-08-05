export const dynamic = "force-dynamic";

import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const paramsSchema = z.object({
  token: z.string().nullable(),
});

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<unknown>;
  },
) {
  const params = await props.params;
  const token = paramsSchema.parse(params)?.token;

  if (!token) {
    return new NextResponse("Token is required", { status: 400 });
  }

  // Check if the token exists in the account_delete_tokens table
  const { data: tokenData, error: tokenError } = await supabaseAdminClient
    .from("account_delete_tokens")
    .select("user_id")
    .eq("token", token)
    .single();

  if (tokenError) {
    const message = "Failed to get token " + tokenError.message;
    return new NextResponse(message, { status: 500 });
  }

  if (!tokenData) {
    return new NextResponse("Invalid or expired token", { status: 404 });
  }

  // Use the user_id from the tokenData to delete the account
  const { error: deleteUserError } =
    await supabaseAdminClient.auth.admin.deleteUser(tokenData.user_id);

  if (deleteUserError) {
    console.error("Failed to delete user account", deleteUserError);
    return new NextResponse("Failed to delete user account", { status: 500 });
  }

  return new NextResponse("User account deleted successfully", { status: 200 });
}
