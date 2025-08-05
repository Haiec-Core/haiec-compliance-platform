"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { T } from "@/components/ui/Typography";
import {
  InvoiceData,
  OneTimePaymentData,
  SubscriptionData,
} from "@/payments/AbstractPaymentGateway";
import { formatCurrency, normalizePriceAndCurrency } from "@/utils/currency";
import { CreditCard, FileText, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { SubscriptionCard } from "./SubscriptionCard";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusVariant = (
  status: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toLowerCase()) {
    case "paid":
      return "default";
    case "open":
      return "secondary";
    case "void":
    case "uncollectible":
      return "destructive";
    default:
      return "outline";
  }
};

const InvoicesTable = ({ invoices }: { invoices: InvoiceData[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Product</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((invoice, index) => (
        <TableRow key={invoice.gateway_invoice_id}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{invoice.billing_products?.name || "N/A"}</TableCell>
          <TableCell>
            {invoice.paid_date
              ? formatDate(invoice.paid_date)
              : invoice.due_date
                ? formatDate(invoice.due_date)
                : "N/A"}
          </TableCell>
          <TableCell>
            {formatCurrency(
              normalizePriceAndCurrency(invoice.amount, invoice.currency),
              invoice.currency,
            )}
          </TableCell>
          <TableCell>
            <Badge variant={getStatusVariant(invoice.status)}>
              {invoice.status}
            </Badge>
          </TableCell>
          <TableCell>
            {invoice.hosted_invoice_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={invoice.hosted_invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Invoice
                </a>
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const OneTimePurchasesTable = ({
  purchases,
}: {
  purchases: OneTimePaymentData[];
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Product</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Invoice</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {purchases.map((purchase, index) => (
        <TableRow key={purchase.gateway_charge_id}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{purchase.billing_products?.name || "N/A"}</TableCell>
          <TableCell>{formatDate(purchase.charge_date)}</TableCell>
          <TableCell>
            {formatCurrency(
              normalizePriceAndCurrency(purchase.amount, purchase.currency),
              purchase.currency,
            )}
          </TableCell>
          <TableCell>
            <Badge variant={getStatusVariant(purchase.status)}>
              {purchase.status}
            </Badge>
          </TableCell>
          <TableCell>
            {purchase.billing_invoices?.hosted_invoice_url && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={purchase.billing_invoices.hosted_invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Invoice
                </a>
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const MotionCard = motion(Card);

interface CustomerDetailsClientProps {
  invoices?: InvoiceData[];
  oneTimePurchases?: OneTimePaymentData[];
  subscriptions?: SubscriptionData[];
}

export function CustomerDetailsClient({
  invoices,
  oneTimePurchases,
  subscriptions,
}: CustomerDetailsClientProps) {
  return (
    <div className="space-y-8">
      {subscriptions && subscriptions.length > 0 && (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-primary" />
              Your Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              {subscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.gateway_subscription_id}
                  subscription={subscription}
                />
              ))}
            </div>
          </CardContent>
        </MotionCard>
      )}

      {invoices && invoices.length > 0 && (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InvoicesTable invoices={invoices} />
          </CardContent>
        </MotionCard>
      )}

      {oneTimePurchases && oneTimePurchases.length > 0 && (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary" />
              One-Time Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OneTimePurchasesTable purchases={oneTimePurchases} />
          </CardContent>
        </MotionCard>
      )}

      {(!subscriptions || subscriptions.length === 0) &&
        (!invoices || invoices.length === 0) &&
        (!oneTimePurchases || oneTimePurchases.length === 0) && (
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <T.P className="text-center py-4">
                No billing information available.
              </T.P>
            </CardContent>
          </MotionCard>
        )}
    </div>
  );
}
