import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { authUserMetadataSchema } from "@/utils/zod-schemas/authUserMetadata";
import { NextRequest, NextResponse } from "next/server";

// created this for testing onboarding paths
export async function GET(req: NextRequest) {
  const userId = `a1df77aa-49ca-44c7-8340-12aa4f388017`;

  try {
    // Get all workspaces for the user
    const { data: workspaces, error: fetchError } = await supabaseAdminClient
      .from("workspace_members")
      .select("workspace_id")
      .eq("workspace_member_id", userId);

    if (fetchError) {
      throw fetchError;
    }

    if (!workspaces || workspaces.length === 0) {
      return NextResponse.json({ message: "No workspaces found for the user" });
    }

    const workspaceIds = workspaces.map((workspace) => workspace.workspace_id);

    // Delete all workspaces
    const { error: deleteError } = await supabaseAdminClient
      .from("workspaces")
      .delete()
      .in("id", workspaceIds);

    if (deleteError) {
      console.error("Error deleting workspaces:", deleteError);
      throw deleteError;
    }

    const { error: updateError } =
      await supabaseAdminClient.auth.admin.updateUserById(userId, {
        user_metadata: authUserMetadataSchema.parse({
          onboardingHasAcceptedTerms: false,
          onboardingHasCompletedProfile: false,
          onboardingHasCreatedWorkspace: false,
        }),
      });

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      message: `Successfully deleted ${workspaceIds.length} workspaces for user ${userId}`,
    });
  } catch (error) {
    console.error("Error deleting workspaces:", error);
    return NextResponse.json(
      { error: "Failed to delete workspaces" },
      { status: 500 },
    );
  }
}
