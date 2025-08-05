// src/app/api/stripe/webhooks/route.ts
import { StripePaymentGateway } from "@/payments/StripePaymentGateway";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (typeof sig !== "string") {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const body = await req.text();
  const stripeGateway = new StripePaymentGateway();

  try {
    await stripeGateway.gateway.handleGatewayWebhook(Buffer.from(body), sig);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ ok: true });
}
