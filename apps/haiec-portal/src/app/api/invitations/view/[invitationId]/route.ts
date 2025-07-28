import { createSupabaseUserRouteHandlerClient } from "@/supabase-clients/user/createSupabaseUserRouteHandlerClient";
import { toSiteURL } from "@/utils/helpers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const paramsSchema = z.object({
  invitationId: z.coerce.string(),
});

export async function GET(
  _req: NextRequest,
  props: {
    params: Promise<undefined>;
  },
) {
  const params = await props.params;
  const { success } = paramsSchema.safeParse(params);
  if (!success) {
    return NextResponse.json({
      error: "Invalid invitation ID",
    });
  }
  const { invitationId } = paramsSchema.parse(params);

  const supabaseClient = await createSupabaseUserRouteHandlerClient();
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    throw error;
  }
  const user = data?.user;

  if (!user) {
    const url = new URL(toSiteURL("/login"));
    url.searchParams.append(
      "next",
      `/user/invitations/${encodeURIComponent(invitationId)}`,
    );
    url.searchParams.append("nextActionType", "invitationPending");
    return redirect(url.toString());
  }

  if (typeof invitationId === "string") {
    redirect(`/user/invitations/${invitationId}`);
  } else {
    return NextResponse.json({
      error: "Invalid invitation ID",
    });
  }
}
