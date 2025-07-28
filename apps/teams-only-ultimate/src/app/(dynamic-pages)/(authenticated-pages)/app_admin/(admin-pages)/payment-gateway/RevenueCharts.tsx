import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { format } from "date-fns";
import { RevenueChartsDisplay } from "./RevenueChartsDisplay";

export async function RevenueCharts() {
  const stripePaymentGateway = new StripePaymentGateway();
  const startDate = new Date();
  const endDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  const [revenueByMonth, subscriptionCountByMonth] = await Promise.all([
    stripePaymentGateway.superAdminScope.getRevenueByMonthBetween(
      startDate,
      endDate,
    ),
    stripePaymentGateway.superAdminScope.getSubscriptionsByMonthBetween(
      startDate,
      endDate,
    ),
  ]);
  const revenueData = revenueByMonth.map((revenue) => ({
    name: format(revenue.month, "MMM yy"),
    value: revenue.revenue,
  }));
  const mrrData = subscriptionCountByMonth.map((subscription) => ({
    name: format(subscription.month, "MMM yy"),
    value: subscription.subscriptions,
  }));
  console.log("revenueData", revenueData);
  console.log("mrrData", mrrData);
  return <RevenueChartsDisplay revenueData={revenueData} mrrData={mrrData} />;
}
