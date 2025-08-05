import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { WorkspaceWithMembershipType } from "@/types";
import { OneTimeProductsClient } from "./OneTimeProductsClient";

export async function OneTimeProductsServer({
  workspace,
}: {
  workspace: WorkspaceWithMembershipType;
}) {
  const stripePaymentGateway = new StripePaymentGateway();
  const productWithPriceListGroup =
    await stripePaymentGateway.anonScope.listAllOneTimeProducts();

  return (
    <OneTimeProductsClient
      products={productWithPriceListGroup}
      workspaceId={workspace.id}
    />
  );
}
