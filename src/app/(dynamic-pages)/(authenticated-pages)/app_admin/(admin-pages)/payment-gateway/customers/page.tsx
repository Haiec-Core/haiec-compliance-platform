import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { CustomersTable } from "./CustomersTable";

export default async function CustomersPage() {
  const stripeGateway = new StripePaymentGateway();
  const customers = await stripeGateway.superAdminScope.listCustomers();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Customers</h1>
      <CustomersTable customers={customers} />
    </div>
  );
}
