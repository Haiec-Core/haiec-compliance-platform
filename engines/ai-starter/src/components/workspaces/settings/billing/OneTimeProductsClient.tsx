"use client";

import { SubscriptionSelect } from "@/components/SubscriptionSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { T } from "@/components/ui/Typography";
import { ProductAndPrice } from "@/payments/AbstractPaymentGateway";
import { normalizePriceAndCurrency } from "@/utils/currency";
import { formatGatewayPrice } from "@/utils/formatGatewayPrice";
import { ShoppingBag } from "lucide-react";

interface OneTimeProductsClientProps {
  products: ProductAndPrice[];
  workspaceId: string;
}

export function OneTimeProductsClient({
  products,
  workspaceId,
}: OneTimeProductsClientProps) {
  if (products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            One-Time Purchases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.Subtle>No one-time purchase products found</T.Subtle>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-primary" />
          One-Time Purchases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const price = p.price;
            return (
              <Card key={p.price.gateway_price_id}>
                <CardHeader>
                  <CardTitle>{p.product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <T.P className="text-gray-600 mb-4">
                    {p.product.description}
                  </T.P>
                  <T.H4 className="mb-2 text-primary">
                    {formatGatewayPrice({
                      amount: normalizePriceAndCurrency(
                        p.price.amount,
                        p.price.currency,
                      ),
                      currency: p.price.currency,
                      recurring_interval: p.price.recurring_interval,
                      recurring_interval_count:
                        p.price.recurring_interval_count,
                    })}
                  </T.H4>
                  <SubscriptionSelect
                    isOneTimePurchase
                    priceId={p.price.gateway_price_id}
                    workspaceId={workspaceId}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
