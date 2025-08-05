import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { SubscriptionsTable } from "./SubscriptionsTable";

export default async function SubscriptionsPage() {
  const stripeGateway = new StripePaymentGateway();
  const subscriptions =
    await stripeGateway.superAdminScope.listCurrentMonthSubscriptions();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Subscriptions</h1>
      <SubscriptionsTable subscriptions={subscriptions} />
    </div>
  );
}
