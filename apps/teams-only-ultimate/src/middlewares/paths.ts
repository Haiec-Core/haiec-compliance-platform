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
  `/404(/.*)?`,
  `/oops(/.*)?`,
];

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

export const onboardingPaths = [`/onboarding(/.*)?`];
export const appAdminPaths = [`/app_admin(/.*)?`];
export const protectedPaths = [
  ...dashboardRoutes,
  ...onboardingPaths,
  ...appAdminPaths,
];
const rootPaths = ["/"];
export const allPaths = [...rootPaths, ...publicPaths, ...protectedPaths];
