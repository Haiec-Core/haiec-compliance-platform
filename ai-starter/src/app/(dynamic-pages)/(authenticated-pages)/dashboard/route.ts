import { getMaybeDefaultWorkspace } from "@/data/user/workspaces";
import { toSiteURL } from "@/utils/helpers";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const initialWorkspace = await getMaybeDefaultWorkspace();
    if (!initialWorkspace) {
      return NextResponse.redirect(toSiteURL("/server-error"));
    }
    console.log("initialWorkspace", initialWorkspace.workspace.membershipType);
    return NextResponse.redirect(
      new URL(
        getWorkspaceSubPath(initialWorkspace.workspace, "/home"),
        req.url,
      ),
    );
  } catch (error) {
    console.error("Failed to load dashboard:", error);
    // Redirect to an error page or show an error message
    return NextResponse.redirect(toSiteURL("/server-error"));
  }
}
