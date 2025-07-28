"use server";
import { authActionClient } from "@/lib/safe-action";
import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { z } from "zod";

const createCheckoutSessionSchema = z.object({
  priceId: z.string(),
  workspaceId: z.string(),
});

export const createWorkspaceCheckoutSession = authActionClient
  .schema(createCheckoutSessionSchema)
  .action(async ({ parsedInput: { priceId, workspaceId } }) => {
    const stripePaymentGateway = new StripePaymentGateway();
    return await stripePaymentGateway.userScope.createGatewayCheckoutSession({
      workspaceId,
      priceId,
    });
  });
