"use client";

import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export default function PosthogIdentify() {
  const posthog = usePostHog();
  const user = useLoggedInUser();
  useEffect(() => {
    console.log("PosthogIdentify", user);
    posthog.identify(user.id, {
      email: user.email,
    });
  }, [user]);

  return null;
}
