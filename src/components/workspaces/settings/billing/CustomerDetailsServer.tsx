import {
  InvoiceData,
  OneTimePaymentData,
  SubscriptionData,
} from "@/payments/AbstractPaymentGateway";
import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { WorkspaceWithMembershipType } from "@/types";
import { CustomerDetailsClient } from "./CustomerDetailsClient";

async function getInvoices(workspaceId: string): Promise<InvoiceData[]> {
  const stripePaymentGateway = new StripePaymentGateway();
  const invoices =
    await stripePaymentGateway.userScope.getWorkspaceDatabaseInvoices(
      workspaceId,
    );
  return invoices.data;
}

async function getOneTimePurchases(
  workspaceId: string,
): Promise<OneTimePaymentData[]> {
  const stripePaymentGateway = new StripePaymentGateway();
  return await stripePaymentGateway.userScope.getWorkspaceDatabaseOneTimePurchases(
    workspaceId,
  );
}

async function getSubscriptions(
  workspaceId: string,
): Promise<SubscriptionData[]> {
  const stripePaymentGateway = new StripePaymentGateway();
  return await stripePaymentGateway.userScope.getWorkspaceDatabaseSubscriptions(
    workspaceId,
  );
}

export async function CustomerDetailsServer({
  workspace,
}: {
  workspace: WorkspaceWithMembershipType;
}) {
  try {
    const stripePaymentGateway = new StripePaymentGateway();
    await stripePaymentGateway.userScope.getWorkspaceDatabaseCustomer(
      workspace.id,
    );

    const [invoices, oneTimePurchases, subscriptions] = await Promise.all([
      getInvoices(workspace.id),
      getOneTimePurchases(workspace.id),
      getSubscriptions(workspace.id),
    ]);

    return (
      <CustomerDetailsClient
        invoices={invoices}
        oneTimePurchases={oneTimePurchases}
        subscriptions={subscriptions}
      />
    );
  } catch (error) {
    return null;
  }
}
