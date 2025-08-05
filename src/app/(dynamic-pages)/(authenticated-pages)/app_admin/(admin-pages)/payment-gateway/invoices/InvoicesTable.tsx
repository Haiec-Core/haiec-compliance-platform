"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceData } from "@/payments/AbstractPaymentGateway";
import { formatCurrency, normalizePriceAndCurrency } from "@/utils/currency";

interface InvoicesTableProps {
  invoices: InvoiceData[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Paid Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          const amount = invoice.billing_prices?.amount;
          const currency = invoice.billing_prices?.currency;
          const formattedPrice =
            amount && currency
              ? formatCurrency(
                  normalizePriceAndCurrency(amount, currency),
                  currency,
                )
              : "N/A";
          return (
            <TableRow key={invoice.gateway_invoice_id}>
              <TableCell>{invoice.gateway_invoice_id}</TableCell>
              <TableCell>{invoice.gateway_customer_id}</TableCell>
              <TableCell>{invoice.billing_products?.name || "N/A"}</TableCell>
              <TableCell>{formattedPrice}</TableCell>
              <TableCell>{formattedPrice}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                {invoice.due_date
                  ? new Date(invoice.due_date).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                {invoice.paid_date
                  ? new Date(invoice.paid_date).toLocaleDateString()
                  : "N/A"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
