import { NextResponse } from "next/server";
import { toSiteURL } from "../utils/helpers";
import { middlewareLogger } from "../utils/logger";
import { dashboardRoutes, onboardingPaths } from "./paths";
import { MiddlewareConfig } from "./types";
import { shouldOnboardUser } from "./utils";

export const dashboardOnboardingMiddleware: MiddlewareConfig = {
  matcher: dashboardRoutes,
  middleware: async (req, maybeUser) => {
    middlewareLogger.log(
      "middleware dashboard paths",
      req.nextUrl.pathname,
    );
    const res = NextResponse.next();

    if (!maybeUser) {
      throw new Error("User is not logged in");
    }

    if (shouldOnboardUser(maybeUser)) {
      middlewareLogger.log(
        "User should onboard. Redirecting to onboarding.",
        req.nextUrl.pathname,
      );
      return [
        NextResponse.redirect(toSiteURL("/onboarding")),
        maybeUser,
      ];
    }

    return [res, maybeUser];
  },
};

export const onboardingRedirectMiddleware: MiddlewareConfig = {
  matcher: onboardingPaths,
  middleware: async (req, maybeUser) => {
    middlewareLogger.log(
      "middleware onboarding paths",
      req.nextUrl.pathname,
    );
    const res = NextResponse.next();

    if (!maybeUser) {
      throw new Error("User is not logged in");
    }

    if (!shouldOnboardUser(maybeUser)) {
      middlewareLogger.log(
        "User should not onboard. Redirecting to dashboard.",
        req.nextUrl.pathname,
      );
      return [
        NextResponse.redirect(toSiteURL("/dashboard")),
        maybeUser,
      ];
    }

    return [res, maybeUser];
  },
};
