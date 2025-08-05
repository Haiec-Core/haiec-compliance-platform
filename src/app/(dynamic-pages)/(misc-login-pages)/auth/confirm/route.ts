import { createSupabaseUserRouteHandlerClient } from "@/supabase-clients/user/createSupabaseUserRouteHandlerClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log("searchParams", searchParams.toString());
  const token_hash = searchParams.get("token_hash");
  const next = searchParams.get("next") ?? "/dashboard";
  if (token_hash) {
    const supabase = await createSupabaseUserRouteHandlerClient();
    const { error } = await supabase.auth.verifyOtp({
      type: "email",
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
    }
    console.log("error", error);
  }
  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL("/auth/auth-code-error", req.url));
}
