"use client";

import { Link } from "@/components/intl-link";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminSyncProductsAction } from "@/data/admin/billing";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";

export function DataAndReports() {
  const toastRef = useRef<string | number | undefined>(undefined);
  const { execute: syncProducts, status: syncProductsStatus } = useAction(
    adminSyncProductsAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Syncing Stripe products...");
      },
      onSuccess: () => {
        toast.success("Stripe products synced successfully", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to sync Stripe products", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  return (
    <div className="space-y-4">
      <Typography.H4>Data and Reports</Typography.H4>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Stripe Sync Actions</CardTitle>
            <CardDescription>Sync your Stripe data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => syncProducts({})}
              disabled={syncProductsStatus === "executing"}
            >
              {syncProductsStatus === "executing" ? (
                <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4 mr-2" />
              )}
              {syncProductsStatus === "executing"
                ? "Syncing..."
                : "Sync Stripe Products"}
            </Button>
            <Typography.Subtle>
              This will sync all the products and prices from Stripe to the
              database. This is useful to fetch new products and prices you may
              have added in Stripe and to update the prices if they have
              changed. These new prices will be immediately available in the app
              and visible to your users if they are active and marked as visible
              in the UI.
            </Typography.Subtle>
            <Typography.Small>
              Note: If you have made any changes to the products or prices in
              the database, this will overwrite them.
            </Typography.Small>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick views</CardTitle>
            <CardDescription>Useful admin options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/app_admin/payment-gateway/customers" className="block">
              <Button className="w-full justify-between">
                View All Customers <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/app_admin/payment-gateway/invoices" className="block">
              <Button className="w-full justify-between">
                View All Invoices <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/app_admin/payment-gateway/subscriptions"
              className="block"
            >
              <Button className="w-full justify-between">
                View All Subscriptions <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription> Coming soon!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-between" disabled>
              Download MRR Report <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" disabled>
              Download ARR Report <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" disabled>
              Download Customer List <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
