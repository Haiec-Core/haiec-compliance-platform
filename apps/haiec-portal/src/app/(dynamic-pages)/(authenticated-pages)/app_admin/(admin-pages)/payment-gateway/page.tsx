import { Typography } from "@/components/ui/Typography";
import { Suspense } from "react";
import { DataAndReports } from "./DataAndReports";
import { QuickMetrics } from "./QuickMetrics";
import { RevenueCharts } from "./RevenueCharts";
import { StripeProductManager } from "./StripeProductManager";

export default async function PaymentsAdminPanel() {
  return (
    <div className="container mx-auto p-6">
      <Typography.H2>Admin Panel</Typography.H2>
      <div className="space-y-6">
        <Suspense fallback={<div>Loading...</div>}>
          <StripeProductManager />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <QuickMetrics />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <DataAndReports />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <RevenueCharts />
        </Suspense>
      </div>
    </div>
  );
}
