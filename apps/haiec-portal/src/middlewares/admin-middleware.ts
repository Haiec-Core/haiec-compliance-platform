import { NextResponse } from "next/server";
import { toSiteURL } from "../utils/helpers";
import { isSupabaseUserAppAdmin } from "../utils/isSupabaseUserAppAdmin";
import { middlewareLogger } from "../utils/logger";
import { appAdminPaths } from "./paths";
import { MiddlewareConfig } from "./types";

export const adminMiddleware: MiddlewareConfig = {
  matcher: appAdminPaths,
  middleware: async (req, maybeUser) => {
    middlewareLogger.log("middleware app admin paths", req.nextUrl.pathname);
    const res = NextResponse.next();

    if (!(maybeUser && isSupabaseUserAppAdmin(maybeUser))) {
      middlewareLogger.log(
        "User is not an app admin. Redirecting to dashboard.",
        req.nextUrl.pathname,
      );
      return [
        NextResponse.redirect(toSiteURL("/dashboard"), {
          // 302 stands for temporary redirect
          status: 302,
        }),
        maybeUser,
      ];
    }

    return [res, maybeUser];
  },
};
