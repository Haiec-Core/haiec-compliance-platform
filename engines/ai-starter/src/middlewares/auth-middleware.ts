import { NextResponse } from "next/server";
import { createSupabaseMiddlewareClient } from "../supabase-clients/user/createSupabaseMiddlewareClient";
import { toSiteURL } from "../utils/helpers";
import { middlewareLogger } from "../utils/logger";
import { protectedPaths } from "./paths";
import { MiddlewareConfig } from "./types";

export const authMiddleware: MiddlewareConfig = {
  matcher: protectedPaths,
  middleware: async (request, maybeUser) => {
    middlewareLogger.log(
      "middleware protected paths",
      request.nextUrl.pathname,
    );

    const { supabase, supabaseResponse } =
      createSupabaseMiddlewareClient(request);
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      middlewareLogger.log(
        "Error getting user",
        userError.message,
        request.nextUrl.pathname,
      );
      return [
        NextResponse.redirect(toSiteURL("/login")),
        maybeUser,
      ];
    }

    if (!userData) {
      middlewareLogger.log(
        "User is not logged in. Redirecting to login.",
        request.nextUrl.pathname,
      );
      return [
        NextResponse.redirect(toSiteURL("/login")),
        maybeUser,
      ];
    }

    middlewareLogger.log(
      "User is logged in. Continuing.",
      request.nextUrl.pathname,
    );
    return [supabaseResponse, userData.user];
  },
};
