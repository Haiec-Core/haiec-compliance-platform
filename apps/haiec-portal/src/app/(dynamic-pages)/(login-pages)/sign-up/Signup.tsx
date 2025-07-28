"use client";

import { EmailConfirmationPendingCard } from "@/components/Auth/EmailConfirmationPendingCard";
import { Link } from "@/components/intl-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MagicLinkSignupForm } from "./MagicLinkSignupForm";
import { PasswordSignupForm } from "./PasswordSignupForm";
import { ProviderSignupForm } from "./ProviderSignupForm";

interface SignUpProps {
  next?: string;
  nextActionType?: string;
}

export function SignUp({ next, nextActionType }: SignUpProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <div
      data-success={successMessage}
      className="container data-success:flex items-center data-success:justify-center text-left max-w-lg mx-auto overflow-auto data-success:h-full min-h-[470px]"
    >
      {successMessage ? (
        <EmailConfirmationPendingCard
          type="sign-up"
          heading="Confirmation Link Sent"
          message={successMessage}
          resetSuccessMessage={setSuccessMessage}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create your Nextbase Account</CardTitle>
            <CardDescription>
              Choose your preferred signup method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="password">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
              </TabsList>

              <TabsContent value="password">
                <PasswordSignupForm
                  next={next}
                  setSuccessMessage={setSuccessMessage}
                />
              </TabsContent>
              <TabsContent value="magic-link">
                <MagicLinkSignupForm
                  next={next}
                  setSuccessMessage={setSuccessMessage}
                />
              </TabsContent>
            </Tabs>
            <Separator className="my-4" />
            <ProviderSignupForm next={next} />
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <div className="text-sm">
                <Link
                  href="/login"
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
