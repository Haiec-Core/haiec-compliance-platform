// app/providers.tsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

/**
 * @description A React component that provides the PostHog context to its children.
 * It initializes the PostHog analytics with the provided API key and host.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 */
export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog with the API key and host from environment variables.
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });
  }, []);

  // Return the PostHogProvider wrapping the children components.
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
