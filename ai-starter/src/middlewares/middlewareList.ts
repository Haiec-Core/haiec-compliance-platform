import { authMiddleware } from "./auth-middleware";
import {
  dashboardOnboardingMiddleware,
  onboardingRedirectMiddleware,
} from "./onboarding-middleware";
import { MiddlewareConfig } from "./types";

export const middlewareList: MiddlewareConfig[] = [
  authMiddleware,
  dashboardOnboardingMiddleware,
  onboardingRedirectMiddleware,
];
