import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { WorkspaceWithMembershipType } from "@/types";
import { SubscriptionProductsClient } from "./SubscriptionProductsClient";

export async function SubscriptionProductsServer({
  workspace,
}: {
  workspace: WorkspaceWithMembershipType;
}) {
  const stripePaymentGateway = new StripePaymentGateway();
  const productWithPriceListGroup =
    await stripePaymentGateway.anonScope.listAllSubscriptionProducts();

  return (
    <SubscriptionProductsClient
      monthlyProducts={productWithPriceListGroup["month"] ?? []}
      yearlyProducts={productWithPriceListGroup["year"] ?? []}
      workspaceId={workspace.id}
    />
  );
}
