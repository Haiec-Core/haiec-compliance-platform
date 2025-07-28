
/**
 * Public paths are paths that are accessible to everyone.
 * They don't require the user to be logged in.
 */
export const publicPaths = [
  `/`,
  `/changelog`,
  `/feedback(/.*)?`,
  `/roadmap`,
  `/auth(/.*)?`,
  `/confirm-delete-user(/.*)?`,
  `/forgot-password(/.*)?`,
  `/login(/.*)?`,
  `/sign-up(/.*)?`,
  `/update-password(/.*)?`,
  `/roadmap`,
  `/version2`,
  `/blog(/.*)?`,
  `/docs(/.*)?`,
  `/terms`,
  `/waitlist(/.*)?`,
  `/500(/.*)?`,
];

/**
 * Dashboard routes are paths that are accessible to logged in users.
 * They require the user to be logged in.
 */
export const dashboardRoutes = [
  `/dashboard(/.*)?`,
  `/settings(/.*)?`,
  `/profile(/.*)?`,
  `/workspace(/.*)?`,
  `/project(/.*)?`,
  `/home(/.*)?`,
  `/settings(/.*)?`,
  `/user(/.*)?`,
  `/logout`,
];

/**
 * Onboarding paths are paths that are accessible to users who are not onboarded.
 * They require the user to be logged in.
 * However, if the user is not onboard, the dashboard routes are not accessible.
 */
export const onboardingPaths = [`/onboarding(/.*)?`];

/**
 * App admin paths are paths that are accessible to app admins.
 * They require the user to be logged in.
 */
const appAdminPaths = [`/app_admin(/.*)?`];

/**
 * All routes which require login including dashboard, onboarding and app admin.
 */
export const protectedPaths = [
  ...dashboardRoutes,
  ...onboardingPaths,
  ...appAdminPaths,
];
const rootPaths = ["/"];
export const allPaths = [...publicPaths, ...protectedPaths];


export const allSubPaths = [
  ...rootPaths,
  ...publicPaths,
  ...protectedPaths,
];
