"use client";

import { EmailConfirmationPendingCard } from "@/components/Auth/EmailConfirmationPendingCard";
import { RedirectingPleaseWaitCard } from "@/components/Auth/RedirectingPleaseWaitCard";
import { RenderProviders } from "@/components/Auth/RenderProviders";
import { Link } from "@/components/intl-link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { MagicLinkLoginForm } from "./MagicLinkLoginForm";
import { PasswordLoginForm } from "./PasswordLoginForm";
import { supabase } from "@/lib/supabaseClient";

export function Login({ next }: { next?: string }) {
  const [emailSentSuccessMessage, setEmailSentSuccessMessage] = useState<string | null>(null);
  const [redirectInProgress, setRedirectInProgress] = useState(false);
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);

  function redirectToDashboard() {
    if (next) {
      router.push(`/auth/callback?next=${next}`);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleProviderLogin(provider: "google" | "github" | "twitter") {
    toastRef.current = toast.loading(`Logging in with ${provider}...`);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${next || ""}` },
    });
    if (error) {
      toast.error(error.message, { id: toastRef.current });
    } else {
      toast.success("Redirecting...", { id: toastRef.current });
      if (data?.url) window.location.href = data.url;
    }
  }

  if (emailSentSuccessMessage) {
    return (
      <EmailConfirmationPendingCard
        type="login"
        heading="Confirmation Link Sent"
        message={emailSentSuccessMessage}
        resetSuccessMessage={setEmailSentSuccessMessage}
      />
    );
  }

  if (redirectInProgress) {
    return (
      <RedirectingPleaseWaitCard
        message="Please wait while we redirect you to your dashboard."
        heading="Redirecting to Dashboard"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to Your Account</CardTitle>
        <CardDescription>Choose your preferred login method</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <PasswordLoginForm
              next={next}
              redirectToDashboard={redirectToDashboard}
              setRedirectInProgress={setRedirectInProgress}
            />
          </TabsContent>
          <TabsContent value="magic-link">
            <MagicLinkLoginForm
              next={next}
              setEmailSentSuccessMessage={setEmailSentSuccessMessage}
            />
          </TabsContent>
        </Tabs>
        <Separator className="my-4" />
        <RenderProviders
          providers={["google", "github", "twitter"]}
          isLoading={false}
          onProviderLoginRequested={handleProviderLogin}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </Link>
        <Link href="/sign-up" className="text-sm text-blue-600 hover:underline">
          Sign up instead
        </Link>
      </CardFooter>
    </Card>
  );
}
