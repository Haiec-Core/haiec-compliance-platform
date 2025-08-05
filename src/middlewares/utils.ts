import { User } from "@supabase/supabase-js";
import { match } from "path-to-regexp";
import { authUserMetadataSchema } from "../utils/zod-schemas/authUserMetadata";

/**
 * Converts legacy match patterns like `/dashboard(/.*)?` to path-to-regexp v6-compatible format.
 */
function normalizePattern(pattern: string): string {
  // Convert patterns like /dashboard(/.*)? to /dashboard/:rest*
  return pattern.replace(/\(\/\.\*\)\?/g, "/:rest*");
}

/**
 * Checks if a pathname matches one or more path patterns
 * @param matcher - A single path pattern or array of path patterns to match against
 * @param pathname - The pathname to check
 * @returns True if the pathname matches any of the patterns, false otherwise
 * @example
 * matchesPath('/users/:id', '/users/123') // Returns true
 * matchesPath(['/users/:id', '/admin/:id'], '/users/123') // Returns true
 */
export function matchesPath(
  matcher: string | string[],
  pathname: string,
): boolean {
  const matchers = Array.isArray(matcher) ? matcher : [matcher];

  // Sanitize the pathname if it's a full URL
  const urlPath = (() => {
    try {
      const url = new URL(pathname);
      return url.pathname;
    } catch {
      return pathname; // It's a relative path, no need to modify
    }
  })();

  return matchers.some((m) => {
    if (!m.startsWith("/")) {
      console.warn(`[matchesPath] Skipping invalid matcher: "${m}"`);
      return false;
    }

    try {
      const normalizedPattern = normalizePattern(m);
      const matchFn = match(normalizedPattern, { decode: decodeURIComponent });
      return matchFn(urlPath) !== false;
    } catch (err) {
      console.error(`[matchesPath] Failed to create matcher for pattern "${m}":`, err);
      return false;
    }
  });
}

/**
 * Determines if a user needs to complete the onboarding process
 * @param user - The Supabase user object
 * @returns True if any onboarding steps are incomplete, false if all steps are complete
 * @example
 * shouldOnboardUser(user) // Returns true if any onboarding steps are incomplete
 */
export function shouldOnboardUser(user: User) {
  const userMetadata = authUserMetadataSchema.parse(user.user_metadata);
  const {
    onboardingHasAcceptedTerms,
    onboardingHasCompletedProfile,
    onboardingHasCreatedWorkspace,
  } = userMetadata;

  return (
    !onboardingHasAcceptedTerms ||
    !onboardingHasCompletedProfile ||
    !onboardingHasCreatedWorkspace
  );
}
