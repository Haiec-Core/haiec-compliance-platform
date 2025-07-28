"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubscriptionData } from "@/payments/AbstractPaymentGateway";
import { formatCurrency, normalizePriceAndCurrency } from "@/utils/currency";

interface SubscriptionsTableProps {
  subscriptions: SubscriptionData[];
}

export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subscription ID</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Current Period End</TableHead>
          <TableHead>Is Trial</TableHead>
          <TableHead>Cancel at Period End</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => {
          const amount = subscription.billing_prices?.amount;
          const currency = subscription.billing_prices?.currency;
          const formattedPrice =
            amount && currency
              ? formatCurrency(
                normalizePriceAndCurrency(amount, currency),
                currency,
              )
              : "N/A";
          return (
            <TableRow key={subscription.id}>
              <TableCell>{subscription.gateway_subscription_id}</TableCell>
              <TableCell>{subscription.gateway_customer_id}</TableCell>
              <TableCell>
                {subscription.billing_products?.name || "N/A"}
              </TableCell>
              <TableCell>{formattedPrice}</TableCell>
              <TableCell>{subscription.status}</TableCell>
              <TableCell>
                {new Date(subscription.current_period_end).toLocaleDateString()}
              </TableCell>
              <TableCell>{subscription.is_trial ? "Yes" : "No"}</TableCell>
              <TableCell>
                {subscription.cancel_at_period_end ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
