"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { adminToggleProductVisibilityAction } from "@/data/admin/billing";
import { DBTable } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProductCardProps {
  product: DBTable<"billing_products">;
}

const visibilityToggleFormSchema = z.object({
  is_visible_in_ui: z.boolean(),
});

type VisibilityToggleFormType = z.infer<typeof visibilityToggleFormSchema>;

export const StripeProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { control } = useForm<VisibilityToggleFormType>({
    resolver: zodResolver(visibilityToggleFormSchema),
    defaultValues: {
      is_visible_in_ui: product.is_visible_in_ui,
    },
  });

  const { execute: toggleVisibility } = useAction(
    adminToggleProductVisibilityAction,
    {
      onSuccess: () => {
        toast.success("Product visibility updated successfully");
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to update product visibility");
      },
    },
  );

  const handleVisibilityToggle = (checked: boolean) => {
    toggleVisibility({
      product_id: product.gateway_product_id,
      is_visible_in_ui: checked,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <Badge variant={product.active ? "default" : "secondary"}>
            {product.active ? "Active" : "Inactive"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {product.description || "No description"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="visible" className="text-sm font-medium">
                Show in pricing page
              </Label>
              <Controller
                name="is_visible_in_ui"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="visible"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleVisibilityToggle(checked);
                    }}
                  />
                )}
              />
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Gateway: {product.gateway_name}
              </p>
              <p className="text-xs text-muted-foreground">
                Product ID: {product.gateway_product_id}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
