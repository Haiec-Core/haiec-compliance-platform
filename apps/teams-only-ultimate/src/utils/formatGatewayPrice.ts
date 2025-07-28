import { DBTable } from "@/types";
import { formatCurrency } from "./currency";
export function formatGatewayPrice(
  price: Pick<
    DBTable<"billing_prices">,
    "amount" | "currency" | "recurring_interval" | "recurring_interval_count"
  >,
): string {
  const amount = price.amount
    ? formatCurrency(price.amount, price.currency)
    : "Custom pricing";
  const intervalCount = price.recurring_interval_count ?? 1;
  const interval =
    price.recurring_interval && price.recurring_interval !== "one-time"
      ? `/${intervalCount} ${intervalCount > 1 ? `${price.recurring_interval}s` : price.recurring_interval}`
      : "";

  return `${amount}${interval}`;
}
