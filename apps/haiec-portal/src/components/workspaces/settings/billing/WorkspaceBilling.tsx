import { Card, CardContent } from "@/components/ui/card";
import { T, Typography } from "@/components/ui/Typography";
import { getCachedWorkspaceBySlug } from "@/rsc-data/user/workspaces";
import { Suspense } from "react";
import { CustomerDetailsServer } from "./CustomerDetailsServer";
import { OneTimeProductsServer } from "./OneTimeProductsServer";
import { SubscriptionProductsServer } from "./SubscriptionProductsServer";

export async function WorkspaceBilling({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-5xl">
      <div className="text-center mb-12">
        <Typography.H1 className="text-4xl font-bold mb-2">
          Workspace Billing
        </Typography.H1>
        <T.P className="text-xl text-gray-600 dark:text-gray-300">
          Manage your subscriptions and payments
        </T.P>
      </div>

      <Suspense
        fallback={
          <Card>
            <CardContent>
              <T.Subtle>Loading customer details...</T.Subtle>
            </CardContent>
          </Card>
        }
      >
        <CustomerDetailsServer workspace={workspace} />
      </Suspense>

      <Suspense
        fallback={
          <Card>
            <CardContent>
              <T.Subtle>Loading subscription products...</T.Subtle>
            </CardContent>
          </Card>
        }
      >
        <SubscriptionProductsServer workspace={workspace} />
      </Suspense>

      <Suspense
        fallback={
          <Card>
            <CardContent>
              <T.Subtle>Loading one-time products...</T.Subtle>
            </CardContent>
          </Card>
        }
      >
        <OneTimeProductsServer workspace={workspace} />
      </Suspense>
    </div>
  );
}
