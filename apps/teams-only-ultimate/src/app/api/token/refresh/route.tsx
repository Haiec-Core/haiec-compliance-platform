import { createSupabaseUserRouteHandlerClient } from "@/supabase-clients/user/createSupabaseUserRouteHandlerClient";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createSupabaseUserRouteHandlerClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!data?.session?.user) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!data.session.refresh_token) {
    return new Response(JSON.stringify({ error: "No refresh token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: refreshResponse, error: refreshError } =
    await supabase.auth.refreshSession({
      refresh_token: data.session?.refresh_token,
    });
  const user = await supabase.auth.getUser();

  return new Response(
    JSON.stringify({ message: "Refreshed", user, refreshResponse }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
