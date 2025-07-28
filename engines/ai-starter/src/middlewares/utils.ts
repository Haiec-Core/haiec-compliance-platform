
import { User } from "@supabase/supabase-js";
import { match } from "path-to-regexp";
import { authUserMetadataSchema } from "../utils/zod-schemas/authUserMetadata";



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
  return matchers.some((m) => {
    const matchFn = match(m, { decode: decodeURIComponent });
    return matchFn(pathname) !== false;
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

