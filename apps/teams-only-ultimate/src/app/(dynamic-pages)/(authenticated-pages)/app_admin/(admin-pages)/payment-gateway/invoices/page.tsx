import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { InvoicesTable } from "./InvoicesTable";

export default async function InvoicesPage() {
  const stripeGateway = new StripePaymentGateway();
  const invoices =
    await stripeGateway.superAdminScope.listCurrentMonthInvoices();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Invoices</h1>
      <InvoicesTable invoices={invoices} />
    </div>
  );
}
