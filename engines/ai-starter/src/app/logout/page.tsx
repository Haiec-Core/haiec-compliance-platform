"use client";
import { T } from "@/components/ui/Typography";
import { supabaseUserClientComponent } from "@/supabase-clients/user/supabaseUserClientComponent";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useDidMount } from "rooks";

export default function Logout() {
  const router = useRouter();
  const posthog = usePostHog();
  useDidMount(async () => {
    await supabaseUserClientComponent.auth.signOut();
    router.refresh();
    router.replace("/");
    posthog.reset();
  });

  return <T.P>Signing out...</T.P>;
}
