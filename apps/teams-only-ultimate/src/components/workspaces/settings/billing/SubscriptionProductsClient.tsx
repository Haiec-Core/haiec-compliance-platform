"use client";

import { SubscriptionSelect } from "@/components/SubscriptionSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { T } from "@/components/ui/Typography";
import { ProductAndPrice } from "@/payments/AbstractPaymentGateway";
import { normalizePriceAndCurrency } from "@/utils/currency";
import { formatGatewayPrice } from "@/utils/formatGatewayPrice";
import { Package } from "lucide-react";

interface SubscriptionProductsClientProps {
  monthlyProducts: ProductAndPrice[];
  yearlyProducts: ProductAndPrice[];
  workspaceId: string;
}

export function SubscriptionProductsClient({
  monthlyProducts,
  yearlyProducts,
  workspaceId,
}: SubscriptionProductsClientProps) {
  if (monthlyProducts.length === 0 && yearlyProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.Subtle>No subscription products found</T.Subtle>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          Choose Your Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">Annual Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthlyProducts.map((p) => (
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
                    <ul className="list-disc list-inside mb-4">Features</ul>
                    <SubscriptionSelect
                      priceId={p.price.gateway_price_id}
                      workspaceId={workspaceId}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yearlyProducts.map((p) => (
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
                    <ul className="list-disc list-inside mb-4">Features</ul>
                    <SubscriptionSelect
                      priceId={p.price.gateway_price_id}
                      workspaceId={workspaceId}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
