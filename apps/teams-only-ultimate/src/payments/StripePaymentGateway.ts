import { getWorkspaceSlugById } from "@/data/user/workspaces";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { superAdminGetUserIdByEmail } from "@/supabase-clients/admin/user";
import { superAdminGetWorkspaceAdmins } from "@/supabase-clients/admin/workspaces";
import { supabaseAnonClient } from "@/supabase-clients/anon/supabaseAnonClient";
import { DBTable, DBTableInsertPayload } from "@/types";
import { convertAmountToUSD } from "@/utils/currency";
import { toSiteURL } from "@/utils/helpers";
import { Dictionary, groupBy } from "lodash";
import Stripe from "stripe";
import {
  CheckoutSessionData,
  CheckoutSessionOptions,
  CustomerData,
  CustomerPortalData,
  GatewaySubscriptionData,
  InvoiceData,
  OneTimePaymentData,
  PaginatedResponse,
  PaginationOptions,
  PaymentGateway,
  PaymentGatewayError,
  ProductAndPrice,
  ProductData,
  SubscriptionData,
} from "./AbstractPaymentGateway";

export class StripePaymentGateway implements PaymentGateway {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key is not configured");
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-11-20.acacia",
      appInfo: {
        name: "Nextbase",
        version: "0.1.0",
      },
    });
  }

  getName(): string {
    return "stripe";
  }

  db = {
    createCustomer: async (
      userData: Partial<DBTable<"billing_customers">>,
      workspaceId: string,
    ): Promise<DBTable<"billing_customers">> => {
      const { billing_email } = userData;
      try {
        if (!billing_email) {
          return this.util.handleStripeError(new Error("Email is required"));
        }
        const customer = await this.stripe.customers.create({
          email: billing_email,
          name: `Workspace ${workspaceId}`,
          metadata: {
            workspace_id: workspaceId,
          },
        });

        const { data, error } = await supabaseAdminClient
          .from("billing_customers")
          .insert({
            gateway_name: this.getName(),
            gateway_customer_id: customer.id,
            billing_email: billing_email,
            workspace_id: workspaceId,
          })
          .select("*")
          .single();

        if (error) throw error;

        return data;
      } catch (error) {
        return this.util.handleStripeError(error);
      }
    },

    getCustomerByCustomerId: async (
      customerId: string,
    ): Promise<DBTable<"billing_customers">> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_customers")
        .select("*")
        .eq("gateway_customer_id", customerId)
        .eq("gateway_name", this.getName())
        .single();

      if (error) throw error;

      return data;
    },

    getCustomerByWorkspaceId: async (
      workspaceId: string,
    ): Promise<DBTable<"billing_customers">> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_customers")
        .select("*")
        .eq("workspace_id", workspaceId)
        .eq("gateway_name", this.getName())
        .single();

      if (error) throw error;

      return data;
    },

    hasCustomer: async (customerId: string): Promise<boolean> => {
      const { count, error } = await supabaseAdminClient
        .from("billing_customers")
        .select("*", { count: "exact", head: true })
        .eq("gateway_customer_id", customerId)
        .eq("gateway_name", this.getName());

      if (error) throw error;

      return (count ?? 0) > 0;
    },

    updateCustomer: async (
      customerId: string,
      updateData: Partial<DBTable<"billing_customers">>,
    ): Promise<DBTable<"billing_customers">> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_customers")
        .update(updateData)
        .eq("gateway_customer_id", customerId)
        .eq("gateway_name", this.getName())
        .select("*")
        .single();

      if (error) {
        return this.util.handleStripeError(error);
      }

      return data;
    },

    deleteCustomer: async (customerId: string): Promise<void> => {
      const { error } = await supabaseAdminClient
        .from("billing_customers")
        .delete()
        .eq("gateway_customer_id", customerId);

      if (error) throw error;
    },

    listCustomers: async (
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<DBTable<"billing_customers">>> => {
      const { data, error, count } = await supabaseAdminClient
        .from("billing_customers")
        .select("*", { count: "exact" })
        .eq("gateway_name", this.getName())
        .range(
          options?.startingAfter ? parseInt(options.startingAfter) : 0,
          options?.limit
            ? parseInt(options.startingAfter || "0") + options.limit - 1
            : 9999,
        );

      if (error) throw error;
      const total = count ?? 0;
      return {
        data,
        hasMore:
          total >
          (options?.limit || 0) + parseInt(options?.startingAfter || "0"),
        totalCount: total,
      };
    },

    getSubscriptionsByCustomerId: async (
      customerId: string,
    ): Promise<SubscriptionData[]> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_subscriptions")
        .select("*, billing_products(*), billing_prices(*)")
        .eq("gateway_customer_id", customerId)
        .eq("gateway_name", this.getName());

      if (error) throw error;
      return data;
    },
    getSubscriptionsByWorkspaceId: async (
      workspaceId: string,
    ): Promise<SubscriptionData[]> => {
      let customer: DBTable<"billing_customers"> | undefined = undefined;
      try {
        customer = await this.db.getCustomerByWorkspaceId(workspaceId);
      } catch (error) {
        console.warn("Customer not found");
        return [];
      }
      if (!customer) {
        return [];
      }
      const { data, error } = await supabaseAdminClient
        .from("billing_subscriptions")
        .select("*, billing_products(*), billing_prices(*)")
        .eq("gateway_customer_id", customer.gateway_customer_id)
        .eq("gateway_name", this.getName());

      if (error) throw error;
      return data;
    },

    getSubscription: async (
      subscriptionId: string,
    ): Promise<SubscriptionData> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_subscriptions")
        .select("*, billing_products(*), billing_prices(*)")
        .eq("gateway_subscription_id", subscriptionId)
        .single();

      if (error) {
        return this.util.handleStripeError(error);
      }

      return data;
    },

    listSubscriptions: async (
      customerId: string,
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<SubscriptionData>> => {
      const { data, error, count } = await supabaseAdminClient
        .from("billing_subscriptions")
        .select("*, billing_products(*), billing_prices(*)", { count: "exact" })
        .eq("gateway_customer_id", customerId)
        .eq("gateway_name", this.getName())
        .range(
          options?.startingAfter ? parseInt(options.startingAfter) : 0,
          options?.limit
            ? parseInt(options.startingAfter || "0") + options.limit - 1
            : 9999,
        );

      if (error) throw error;
      const total = count ?? 0;
      return {
        data,
        hasMore:
          total >
          (options?.limit || 0) + parseInt(options?.startingAfter || "0"),
        totalCount: total,
      };
    },

    getInvoice: async (invoiceId: string): Promise<InvoiceData> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_invoices")
        .select("*, billing_products(*), billing_prices(*)")
        .eq("id", invoiceId)
        .single();

      if (error) throw error;

      return data;
    },

    listInvoicesByCustomerId: async (
      customerId: string,
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<InvoiceData>> => {
      const { data, error, count } = await supabaseAdminClient
        .from("billing_invoices")
        .select("*, billing_products(*), billing_prices(*)", { count: "exact" })
        .eq("gateway_customer_id", customerId)
        .eq("gateway_name", this.getName())
        .range(
          options?.startingAfter ? parseInt(options.startingAfter) : 0,
          options?.limit
            ? parseInt(options.startingAfter || "0") + options.limit - 1
            : 9999,
        );

      if (error) throw error;
      const total = count ?? 0;
      return {
        data,
        hasMore:
          total >
          (options?.limit || 0) + parseInt(options?.startingAfter || "0"),
        totalCount: total,
      };
    },

    listInvoicesByWorkspaceId: async (
      workspaceId: string,
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<InvoiceData>> => {
      let customer: DBTable<"billing_customers"> | undefined = undefined;
      try {
        customer = await this.db.getCustomerByWorkspaceId(workspaceId);
      } catch (error) {
        console.warn("Customer not found");
        return {
          data: [],
          hasMore: false,
          totalCount: 0,
        };
      }

      if (!customer) {
        return {
          data: [],
          hasMore: false,
          totalCount: 0,
        };
      }
      return this.db.listInvoicesByCustomerId(
        customer.gateway_customer_id,
        options,
      );
    },

    getProduct: async (productId: string): Promise<ProductData> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_products")
        .select("*, billing_prices(*)")
        .eq("gateway_product_id", productId)
        .eq("gateway_name", this.getName())
        .single();

      if (error) throw error;
      return data;
    },

    getPrice: async (priceId: string): Promise<DBTable<"billing_prices">> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_prices")
        .select("*")
        .eq("gateway_price_id", priceId)
        .eq("gateway_name", this.getName())
        .single();
      if (error) throw error;
      return data;
    },
    listPlans: async (): Promise<Array<ProductData>> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_products")
        .select("*, billing_prices(*)", { count: "exact" })
        .eq("gateway_name", this.getName());

      if (error) throw error;
      return data;
    },

    getOneTimePurchasesByCustomerId: async (
      customerId: string,
    ): Promise<OneTimePaymentData[]> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_one_time_payments")
        .select(
          " *, billing_products(*), billing_prices(*), billing_invoices(*)",
        )
        .eq("gateway_customer_id", customerId)
        .eq("gateway_name", this.getName());
      if (error) throw error;
      return data;
    },

    getWorkspaceDatabaseOneTimePurchases: async (
      workspaceId: string,
    ): Promise<OneTimePaymentData[]> => {
      let customer: DBTable<"billing_customers"> | undefined = undefined;
      try {
        customer = await this.db.getCustomerByWorkspaceId(workspaceId);
      } catch (error) {
        console.warn("Customer not found", error);
        return [];
      }
      if (!customer) {
        return [];
      }
      return this.db.getOneTimePurchasesByCustomerId(
        customer.gateway_customer_id,
      );
    },

    getWorkspaceDatabasePaymentMethods: async (
      workspaceId: string,
    ): Promise<DBTable<"billing_payment_methods">[]> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_payment_methods")
        .select("*")
        .eq("workspace_id", workspaceId);
      if (error) throw error;
      return data;
    },

    listProducts: async (): Promise<Array<ProductData>> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_products")
        .select("*, billing_prices(*)", { count: "exact" })
        .eq("gateway_name", this.getName());
      if (error) throw error;
      return data;
    },
  };

  util = {
    handleStripeError: (error: unknown) => {
      if (!(error instanceof Error)) {
        throw new Error("Unknown error");
      }
      throw new PaymentGatewayError(
        `StripePaymentGatewayError: ${error.message}`,
        "500",
        this.getName(),
      );
    },
    isTestMode: () => {
      return (
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("pk_test") ??
        false
      );
    },
    createCustomerForWorkspace: async (
      workspaceId: string,
    ): Promise<DBTable<"billing_customers">> => {
      try {
        const workspaceAdmins = await superAdminGetWorkspaceAdmins(workspaceId);
        const orgAdminUserId = workspaceAdmins[0];
        if (!orgAdminUserId)
          throw new Error("Organization admin email not found");
        const { data: orgAdminUser, error: orgAdminUserError } =
          await supabaseAdminClient.auth.admin.getUserById(orgAdminUserId);
        if (orgAdminUserError) throw orgAdminUserError;
        if (!orgAdminUser) throw new Error("Organization admin user not found");
        const maybeEmail = orgAdminUser.user.email;
        if (!maybeEmail) throw new Error("Organization admin email not found");
        return this.db.createCustomer(
          {
            billing_email: maybeEmail,
          },
          workspaceId,
        );
      } catch (error) {
        console.log("error", error);
        return this.util.handleStripeError(error);
      }
    },

    getCustomerByWorkspaceId: async (
      workspaceId: string,
    ): Promise<DBTable<"billing_customers"> | null> => {
      const { data, error } = await supabaseAdminClient
        .from("billing_customers")
        .select("*")
        .eq("workspace_id", workspaceId)
        .eq("gateway_name", this.getName())
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }

      return data;
    },

    supportsFeature: (featureName: string): boolean => {
      const supportedFeatures = [
        "subscriptions",
        "invoices",
        "customer_portal",
        "webhooks",
        "multiple_payment_methods",
      ];
      return supportedFeatures.includes(featureName);
    },
  };

  gateway = {
    createGatewayCustomer: async (
      userData: Partial<CustomerData>,
    ): Promise<CustomerData> => {
      const customer = await this.stripe.customers.create(userData);
      const customerEmail = customer.email;
      if (!customerEmail) {
        throw new Error("Customer email not found");
      }
      return {
        id: customer.id,
        email: customerEmail,
        metadata: customer.metadata,
      };
    },

    handleGatewayWebhook: async (
      body: string | Buffer,
      signature: string,
    ): Promise<void> => {
      try {
        const event = this.stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET,
        );

        switch (event.type) {
          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            await this.handleSubscriptionChange(
              event.data.object as Stripe.Subscription,
            );
            break;
          case "invoice.paid":
          case "invoice.payment_failed":
            await this.handleInvoiceChange(event.data.object as Stripe.Invoice);
            break;
          case "customer.updated":
            await this.handleCustomerUpdate(
              event.data.object as Stripe.Customer,
            );
            break;
          case "product.created":
          case "product.updated":
            await this.handleProductChange(event.data.object as Stripe.Product);
            break;
          case "price.created":
          case "price.updated":
            await this.handlePriceChange(event.data.object as Stripe.Price);
            break;
          case "charge.succeeded":
            await this.handleChargeChange(event.data.object as Stripe.Charge);
            break;
        }
      } catch (error) {
        this.util.handleStripeError(error);
      }
    },
    getSubscription: async (
      subscriptionId: string,
    ): Promise<GatewaySubscriptionData> => {
      const subscription =
        await this.stripe.subscriptions.retrieve(subscriptionId);
      return {
        id: subscription.id,
        status: subscription.status,
      };
    },
  };

  private async handleSubscriptionChange(subscription: Stripe.Subscription) {
    if (!subscription.customer) {
      return this.util.handleStripeError(
        new Error("Subscription customer not found"),
      );
    }
    const stripeCustomerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : typeof subscription.customer === "object" &&
          "id" in subscription.customer
          ? subscription.customer.id
          : null;
    if (!stripeCustomerId) {
      return this.util.handleStripeError(
        new Error("Subscription customer not found"),
      );
    }

    const doesCustomerExist = await this.db.hasCustomer(stripeCustomerId);
    if (!doesCustomerExist) {
      // it is likely that a user with this billing email doesn't exist and this is the fast anon flow.
      // user clicks on pricing table on home page with no account and after payment, they are redirected to signup.
      // we need to create a user with this email and then create a customer for them.
      const billingEmail =
        typeof subscription.customer === "string"
          ? subscription.customer
          : typeof subscription.customer === "object" &&
            "email" in subscription.customer
            ? subscription.customer.email
            : null;
      if (!billingEmail) {
        return this.util.handleStripeError(
          new Error("Subscription customer email not found"),
        );
      }
      const userId = await superAdminGetUserIdByEmail(billingEmail);
      if (!userId) {
        return this.util.handleStripeError(new Error("User not found"));
      }
      const { error: createUserError } =
        await supabaseAdminClient.auth.admin.createUser({
          email: billingEmail,
          email_confirm: true,
          id: userId,
        });

      if (createUserError) throw createUserError;
    }
    const { product } = subscription.items.data[0].price;

    const { error } = await supabaseAdminClient
      .from("billing_subscriptions")
      .upsert(
        {
          gateway_customer_id: stripeCustomerId,
          gateway_name: this.getName(),
          gateway_subscription_id: subscription.id,
          gateway_product_id:
            typeof product === "string" ? product : product.id,
          status: subscription.status,
          current_period_start: new Date(
            subscription.current_period_start * 1000,
          ).toISOString(),
          current_period_end: new Date(
            subscription.current_period_end * 1000,
          ).toISOString(),
          currency: subscription.currency,
          is_trial: subscription.trial_end !== null,
          cancel_at_period_end: subscription.cancel_at_period_end,
          quantity: subscription.items.data[0].quantity,
          gateway_price_id: subscription.items.data[0].price.id,
        },
        {
          onConflict: "gateway_name,gateway_subscription_id",
        },
      );

    if (error) throw error;
  }

  private async handleInvoiceChange(invoice: Stripe.Invoice) {
    if (!invoice.customer) {
      return this.util.handleStripeError(
        new Error("Invoice customer not found"),
      );
    }
    const customerId =
      typeof invoice.customer === "string"
        ? invoice.customer
        : typeof invoice.customer === "object" && "id" in invoice.customer
          ? invoice.customer.id
          : null;
    if (!customerId) {
      return this.util.handleStripeError(
        new Error("Invoice customer not found"),
      );
    }

    const dueDate = invoice.due_date;

    const paidDate = invoice.status_transitions.paid_at;
    const priceId = invoice.lines.data[0].price?.id;
    const product = invoice.lines.data[0].price?.product;
    const productId =
      typeof product === "string" ? product : (product?.id ?? null);
    const { error } = await supabaseAdminClient.from("billing_invoices").upsert(
      {
        gateway_customer_id: customerId,
        gateway_name: this.getName(),
        gateway_invoice_id: invoice.id,
        amount: invoice.total,
        currency: invoice.currency,
        status: invoice.status ?? "unknown",
        due_date: dueDate ? new Date(dueDate * 1000).toISOString() : null,
        paid_date: paidDate ? new Date(paidDate * 1000).toISOString() : null,
        hosted_invoice_url: invoice.hosted_invoice_url,
        gateway_price_id: priceId,
        gateway_product_id: productId,
      },
      {
        onConflict: "gateway_name,gateway_invoice_id",
      },
    );

    if (error) {
      return this.util.handleStripeError(error);
    }

    const invoiceLines = invoice.lines.data;
    if (invoiceLines.length > 0) {
      const line = invoiceLines[0];
      if (line.price) {
        if (!line.price.recurring?.interval) {
          // this is a one-time charge
          // we don't need to handle subscription charges since subscription tables handle that.
          // this should have a charge field
          const chargeId =
            typeof invoice.charge === "string" ? invoice.charge : null;
          if (!chargeId) {
            return this.util.handleStripeError(
              new Error("Invoice charge not found"),
            );
          }
          const charge = await this.stripe.charges.retrieve(chargeId);
          const { error: createChargeError } = await supabaseAdminClient
            .from("billing_one_time_payments")
            .upsert(
              {
                charge_date: new Date(charge.created * 1000).toISOString(),
                gateway_invoice_id: invoice.id,
                gateway_price_id: line.price.id,
                gateway_product_id: line.price.product as string,
                gateway_customer_id: customerId,
                gateway_name: this.getName(),
                gateway_charge_id: chargeId,
                amount: line.amount,
                currency: line.currency,
                status: charge.status,
              },
              {
                onConflict: "gateway_charge_id",
              },
            );

          if (createChargeError) throw createChargeError;
        }
      }
    }
  }

  private async handleCustomerUpdate(customer: Stripe.Customer) {
    const email = customer.email;
    if (!email) {
      return this.util.handleStripeError(new Error("Email is required"));
    }
    const { error } = await supabaseAdminClient
      .from("billing_customers")
      .update({
        billing_email: email,
      })
      .eq("gateway_customer_id", customer.id);

    if (error) throw error;
  }

  private async handleProductChange(product: Stripe.Product) {
    const { error } = await supabaseAdminClient.from("billing_products").upsert(
      {
        gateway_product_id: product.id,
        gateway_name: this.getName(),
        name: product.name,
        description: product.description,
        is_visible_in_ui: product.active,
        features: product.metadata.features,
        active: product.active,
      },
      {
        onConflict: "gateway_product_id,gateway_name",
      },
    );

    if (error) throw error;
  }

  private async handlePriceChange(price: Stripe.Price) {
    const { error } = await supabaseAdminClient.from("billing_prices").upsert(
      {
        gateway_product_id: price.product as string,
        gateway_name: this.getName(),
        gateway_price_id: price.id,
        currency: price.currency,
        amount: price.unit_amount ?? 0,
        recurring_interval: price.recurring?.interval ?? "month",
        recurring_interval_count: price.recurring?.interval_count ?? 1,
        active: price.active,
      },
      {
        onConflict: "gateway_price_id",
      },
    );

    if (error) throw error;
  }

  private async handleChargeChange(charge: Stripe.Charge) {
    const { data: chargeExists, error: chargeExistsError } =
      await supabaseAdminClient
        .from("billing_one_time_payments")
        .select("gateway_charge_id")
        .eq("gateway_charge_id", charge.id);
    if (chargeExistsError) throw chargeExistsError;
    if (chargeExists?.length < 0) {
      return this.util.handleStripeError(
        new Error(
          "This is likely not a charge for a one-time payment. Ignoring charge.",
        ),
      );
    }

    const { error } = await supabaseAdminClient
      .from("billing_one_time_payments")
      .update({
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status,
        charge_date: new Date(charge.created * 1000).toISOString(),
      })
      .eq("gateway_charge_id", charge.id);

    if (error) throw error;
  }

  anonScope = {
    /**
     * List all products that are visible to the user.
     */
    listAllProducts: async (): Promise<ProductAndPrice[]> => {
      const { data: products, error } = await supabaseAnonClient
        .from("billing_products")
        .select("*, billing_prices(*)")
        .eq("gateway_name", this.getName())
        .eq("is_visible_in_ui", true);
      if (error) throw error;

      const productsAndPrices: ProductAndPrice[] = [];

      for (const product of products) {
        const { billing_prices, ...coreProduct } = product;
        billing_prices.forEach((price) => {
          productsAndPrices.push({
            product: coreProduct,
            price,
          });
        });
      }
      return productsAndPrices;
    },
    /**
     * List all subscription products that are visible to the user.
     */
    listAllSubscriptionProducts: async (): Promise<
      Dictionary<ProductAndPrice[]>
    > => {
      const { data: products, error } = await supabaseAnonClient
        .from("billing_products")
        .select("*, billing_prices(*)")
        .eq("gateway_name", this.getName())
        .eq("is_visible_in_ui", true)
        .eq("active", true)
        .eq("billing_prices.active", true);
      if (error) throw error;

      const productsAndPrices: ProductAndPrice[] = [];

      for (const product of products) {
        const { billing_prices, ...coreProduct } = product;
        billing_prices.forEach((price) => {
          productsAndPrices.push({
            product: coreProduct,
            price,
          });
        });
      }

      const groupedProductsAndPrices = groupBy(
        productsAndPrices,
        "price.recurring_interval",
      );

      return groupedProductsAndPrices;
    },
    /**
     * List all one-time products that are visible to the user.
     */
    listAllOneTimeProducts: async (): Promise<ProductAndPrice[]> => {
      const { data: products, error } = await supabaseAnonClient
        .from("billing_products")
        .select("*, billing_prices(*)")
        .eq("billing_prices.recurring_interval", "one-time")
        .eq("gateway_name", this.getName())
        .eq("is_visible_in_ui", true)
        .eq("active", true)
        .eq("billing_prices.active", true);
      if (error) throw error;
      const productsAndPrices: ProductAndPrice[] = [];

      for (const product of products) {
        const { billing_prices, ...coreProduct } = product;
        billing_prices.forEach((price) => {
          productsAndPrices.push({
            product: coreProduct,
            price,
          });
        });
      }
      return productsAndPrices;
    },
  };

  userScope = {
    /**
     * Fetches the database subscription for a given workspace.
     *
     * @param workspaceId - The unique identifier of the workspace.
     * @returns A promise that resolves to the billing subscription data or null if not found.
     */
    getWorkspaceDatabaseSubscriptions: async (
      workspaceId: string,
    ): Promise<SubscriptionData[]> => {
      return this.db.getSubscriptionsByWorkspaceId(workspaceId);
    },

    /**
     * Retrieves all one-time purchases for a given workspace.
     *
     * @param workspaceId - The unique identifier of the workspace.
     * @returns A promise that resolves to an array of billing payment data.
     */
    getWorkspaceDatabaseOneTimePurchases: async (
      workspaceId: string,
    ): Promise<OneTimePaymentData[]> => {
      return this.db.getWorkspaceDatabaseOneTimePurchases(workspaceId);
    },

    /**
     * Fetches all invoices for a given workspace.
     *
     * @param workspaceId - The unique identifier of the workspace.
     * @returns A promise that resolves to a paginated response of billing invoice data.
     */
    getWorkspaceDatabaseInvoices: async (
      workspaceId: string,
    ): Promise<PaginatedResponse<InvoiceData>> => {
      return this.db.listInvoicesByWorkspaceId(workspaceId);
    },

    /**
     * Retrieves all payment methods associated with a given workspace.
     *
     * @param workspaceId - The unique identifier of the workspace.
     * @returns A promise that resolves to an array of PaymentMethodData.
     */
    getWorkspaceDatabasePaymentMethods: async (
      workspaceId: string,
    ): Promise<DBTable<"billing_payment_methods">[]> => {
      return this.db.getWorkspaceDatabasePaymentMethods(workspaceId);
    },

    /**
     * Fetches the customer data for a given workspace.
     *
     * @param workspaceId - The unique identifier of the workspace.
     * @returns A promise that resolves to the billing customer data.
     */
    getWorkspaceDatabaseCustomer: async (
      workspaceId: string,
    ): Promise<DBTable<"billing_customers">> => {
      return this.db.getCustomerByWorkspaceId(workspaceId);
    },

    createGatewayCheckoutSession: async ({
      workspaceId,
      priceId,
      options,
    }: {
      workspaceId: string;
      priceId: string;
      options?: CheckoutSessionOptions;
    }): Promise<CheckoutSessionData> => {
      let customer = await this.util.getCustomerByWorkspaceId(workspaceId);
      if (!customer) {
        customer = await this.util.createCustomerForWorkspace(workspaceId);
      }

      const { freeTrialDays } = options ?? {};
      const price = await this.db.getPrice(priceId);
      if (!price) {
        throw new Error("Price not found");
      }

      const workspaceSlug = await getWorkspaceSlugById(workspaceId);

      const sessionConfig: Stripe.Checkout.SessionCreateParams = {
        customer: customer.gateway_customer_id,
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        success_url: toSiteURL(
          `/workspace/${workspaceSlug}/settings/billing?success=true`,
        ),
        cancel_url: toSiteURL(
          `/workspace/${workspaceSlug}/settings/billing?cancel=true`,
        ),
      };

      if (price.recurring_interval === "one-time") {
        sessionConfig.mode = "payment";
        sessionConfig.invoice_creation = {
          enabled: true,
        };
      } else {
        sessionConfig.mode = "subscription";
        sessionConfig.subscription_data = {
          trial_settings: {
            end_behavior: {
              missing_payment_method: "cancel",
            },
          },
        };

        if (freeTrialDays) {
          sessionConfig.subscription_data.trial_period_days =
            freeTrialDays ?? 14;
        }
      }

      const session = await this.stripe.checkout.sessions.create(sessionConfig);

      if (!session.url) {
        throw new Error("Checkout session URL not found");
      }

      return {
        id: session.id,
        url: session.url,
      };
    },

    createGatewayCustomerPortalSession: async (
      workspaceId: string,
      returnUrl: string,
    ): Promise<CustomerPortalData> => {
      const customer = await this.util.getCustomerByWorkspaceId(workspaceId);
      if (!customer) {
        throw new Error("Customer not found");
      }
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customer.gateway_customer_id,
        return_url: returnUrl,
      });

      return {
        url: session.url,
      };
    },
  };

  superAdminScope = {
    syncCustomers: async (): Promise<void> => {
      try {
        const { data: customers, error: fetchError } = await supabaseAdminClient
          .from("billing_customers")
          .select("*")
          .eq("gateway_name", this.getName());

        if (fetchError) throw fetchError;
        const stripeCustomers = await this.stripe.customers.list({
          email: customers.map((customer) => customer.billing_email).join(","),
        });
        const stripeCustomerMap = new Map<string, string>();

        stripeCustomers.data.forEach((customer) => {
          if (customer.email) {
            stripeCustomerMap.set(customer.email, customer.id);
          }
        });

        for (const customer of customers) {
          if (stripeCustomerMap.has(customer.billing_email)) {
            const stripeCustomerId = stripeCustomerMap.get(
              customer.billing_email,
            );
            if (stripeCustomerId) {
              await this.db.updateCustomer(stripeCustomerId, {
                gateway_customer_id: stripeCustomerMap.get(
                  customer.billing_email,
                ),
              });
            }
          }
        }

        for (const stripeCustomer of stripeCustomers.data) {
          if (
            stripeCustomer.email &&
            !customers.some(
              (customer) => customer.billing_email === stripeCustomer.email,
            )
          ) {
            await this.db.createCustomer(
              {
                billing_email: stripeCustomer.email,
              },
              stripeCustomer.metadata.organization_id,
            );
          }
        }
      } catch (error) {
        this.util.handleStripeError(error);
      }
    },

    syncProducts: async (): Promise<void> => {
      const [stripePrices, stripeProducts] = await Promise.all([
        this.stripe.prices.list({ active: true }),
        this.stripe.products.list({ active: true }),
      ]);

      const productsToUpsert: DBTableInsertPayload<"billing_products">[] =
        stripeProducts.data.map((stripeProduct) => {
          return {
            gateway_product_id: stripeProduct.id,
            gateway_name: this.getName(),
            name: stripeProduct.name,
            description: stripeProduct.description,
            active: stripeProduct.active,
            features: stripeProduct.metadata.features
              ? JSON.parse(stripeProduct.metadata.features)
              : null,
          };
        });

      const validStripePrices = stripePrices.data.filter((stripePrice) => {
        return productsToUpsert.some(
          (product) => product.gateway_product_id === stripePrice.product,
        );
      });
      const { error: upsertError } = await supabaseAdminClient
        .from("billing_products")
        .upsert(productsToUpsert, {
          onConflict: "gateway_product_id,gateway_name",
        });
      if (upsertError) throw upsertError;

      const pricesToUpsert: DBTableInsertPayload<"billing_prices">[] =
        validStripePrices.map((stripePrice) => ({
          gateway_product_id: stripePrice.product as string,
          currency: stripePrice.currency,
          amount: stripePrice.unit_amount ?? 0,
          recurring_interval: stripePrice.recurring?.interval ?? "one-time",
          recurring_interval_count: stripePrice.recurring?.interval_count ?? 1,
          gateway_name: this.getName(),
          gateway_price_id: stripePrice.id,
          active: stripePrice.active,
        }));

      const { error: priceUpsertError } = await supabaseAdminClient
        .from("billing_prices")
        .upsert(pricesToUpsert, { onConflict: "gateway_price_id" });
      if (priceUpsertError) {
        console.log("priceUpsertError", priceUpsertError);
        throw priceUpsertError;
      }
    },

    toggleProductVisibility: async (
      productId: string,
      isVisible: boolean,
    ): Promise<void> => {
      await supabaseAdminClient
        .from("billing_products")
        .update({ is_visible_in_ui: isVisible })
        .eq("gateway_product_id", productId)
        .eq("gateway_name", this.getName());
    },

    listAllProducts: async (): Promise<ProductData[]> => {
      return this.db.listProducts();
    },
    getMRRBetween: async (startDate: Date, endDate: Date): Promise<number> => {
      const { data: subscriptionPrices, error: pricesError } =
        await supabaseAdminClient
          .from("billing_prices")
          .select("gateway_price_id, currency, amount")
          .eq("gateway_name", this.getName())
          .neq("recurring_interval", "one-time");

      if (pricesError) throw pricesError;

      const priceIds = subscriptionPrices.map(
        (price) => price.gateway_price_id,
      );
      const { data: invoices, error: invoicesError } = await supabaseAdminClient
        .from("billing_invoices")
        .select("amount, currency, gateway_price_id")
        .eq("gateway_name", this.getName())
        .eq("status", "paid")
        .in("gateway_price_id", priceIds)
        .gte("paid_date", startDate.toISOString())
        .lte("paid_date", endDate.toISOString());

      if (invoicesError) throw invoicesError;

      const mrr = invoices.reduce((acc, invoice) => {
        const price = subscriptionPrices.find(
          (p) => p.gateway_price_id === invoice.gateway_price_id,
        );
        if (!price) return acc;

        const amount =
          invoice.currency === "usd" ? invoice.amount / 100 : invoice.amount;
        return acc + convertAmountToUSD(amount, invoice.currency);
      }, 0);

      return mrr;
    },

    /**
     * This gets current active subscription revenue.
     */
    getCurrentMRR: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 30);

      return this.superAdminScope.getRevenueBetween(startDate, endDate);
    },

    getLastMonthMRR: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 60);
      endDate.setDate(endDate.getDate() - 30);

      return this.superAdminScope.getRevenueBetween(startDate, endDate);
    },

    getRevenueBetween: async (
      startDate: Date,
      endDate: Date,
    ): Promise<number> => {
      const { data: invoices, error } = await supabaseAdminClient
        .from("billing_invoices")
        .select("amount, currency")
        .eq("gateway_name", this.getName())
        .gte("paid_date", startDate.toISOString())
        .lte("paid_date", endDate.toISOString())
        .eq("status", "paid");

      if (error) throw error;

      const totalRevenue = invoices.reduce((acc, invoice) => {
        const amount =
          invoice.currency === "usd" ? invoice.amount / 100 : invoice.amount;
        return acc + convertAmountToUSD(amount, invoice.currency);
      }, 0);

      return totalRevenue;
    },
    getCurrentMonthRevenue: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 30);

      return this.superAdminScope.getRevenueBetween(startDate, endDate);
    },

    getLastMonthRevenue: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 60);
      endDate.setDate(endDate.getDate() - 30);

      return this.superAdminScope.getRevenueBetween(startDate, endDate);
    },

    getOneTimePurchasesBetween: async (
      startDate: Date,
      endDate: Date,
    ): Promise<number> => {
      const { data: invoices, error } = await supabaseAdminClient
        .from("billing_one_time_payments")
        .select("amount, currency")
        .eq("gateway_name", this.getName())
        .gte("charge_date", startDate.toISOString())
        .lte("charge_date", endDate.toISOString())
        .eq("status", "succeeded");

      if (error) throw error;

      const totalRevenue = invoices.reduce((acc, invoice) => {
        const amount =
          invoice.currency === "usd" ? invoice.amount / 100 : invoice.amount;
        return acc + convertAmountToUSD(amount, invoice.currency);
      }, 0);

      return totalRevenue;
    },

    getCurrentMonthOneTimePurchaseRevenue: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 30);

      return this.superAdminScope.getOneTimePurchasesBetween(
        startDate,
        endDate,
      );
    },

    getLastMonthOneTimePurchaseRevenue: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 60);
      endDate.setDate(endDate.getDate() - 30);

      return this.superAdminScope.getOneTimePurchasesBetween(
        startDate,
        endDate,
      );
    },

    getRevenueByMonthBetween: async (
      startDate: Date,
      endDate: Date,
    ): Promise<{ month: Date; revenue: number }[]> => {
      const { data: invoices, error } = await supabaseAdminClient
        .from("billing_invoices")
        .select("amount, currency, paid_date")
        .eq("gateway_name", this.getName())
        .gte("paid_date", startDate.toISOString())
        .lte("paid_date", endDate.toISOString())
        .eq("status", "paid");

      if (error) throw error;

      const revenueByMonth: { [key: string]: number } = {};

      // Initialize all months with zero revenue
      const currentMonth = new Date(startDate);
      while (currentMonth <= endDate) {
        const monthKey = currentMonth.toISOString().slice(0, 7); // YYYY-MM
        revenueByMonth[monthKey] = 0;
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }

      invoices.forEach((invoice) => {
        if (invoice.paid_date) {
          const month = new Date(invoice.paid_date).toISOString().slice(0, 7); // YYYY-MM
          const amount =
            invoice.currency === "usd" ? invoice.amount / 100 : invoice.amount;
          const revenue = convertAmountToUSD(amount, invoice.currency);
          revenueByMonth[month] += revenue;
        }
      });

      return Object.entries(revenueByMonth)
        .map(([month, revenue]) => ({
          month: new Date(month),
          revenue,
        }))
        .sort((a, b) => a.month.getTime() - b.month.getTime());
    },

    getSubscriberCountBetween: async (
      startDate: Date,
      endDate: Date,
    ): Promise<number> => {
      const { data: subscriptionPrices, error: pricesError } =
        await supabaseAdminClient
          .from("billing_prices")
          .select("gateway_price_id, currency, amount")
          .eq("gateway_name", this.getName())
          .neq("recurring_interval", "one-time");
      if (pricesError) throw pricesError;
      const priceIds = subscriptionPrices.map(
        (price) => price.gateway_price_id,
      );
      console.log("priceIds", priceIds);
      const { count: invoiceCount, error: invoicesError } =
        await supabaseAdminClient
          .from("billing_invoices")
          .select("*", { count: "exact", head: true })
          .eq("gateway_name", this.getName())
          .eq("status", "paid")
          .in("gateway_price_id", priceIds)
          .gte("paid_date", startDate.toISOString())
          .lte("paid_date", endDate.toISOString());

      if (invoicesError) throw invoicesError;
      return invoiceCount || 0;
    },

    getCurrentMonthlySubscriptionCount: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 30);

      return this.superAdminScope.getSubscriberCountBetween(startDate, endDate);
    },

    getLastMonthSubscriptionCount: async (): Promise<number> => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 60);
      endDate.setDate(endDate.getDate() - 30);

      return this.superAdminScope.getSubscriberCountBetween(startDate, endDate);
    },

    getSubscriptionsByMonthBetween: async (
      startDate: Date,
      endDate: Date,
    ): Promise<{ month: Date; subscriptions: number }[]> => {
      const { data: subscriptions, error } = await supabaseAdminClient
        .from("billing_subscriptions")
        .select("current_period_start")
        .eq("gateway_name", this.getName())
        .gte("current_period_start", startDate.toISOString())
        .lte("current_period_start", endDate.toISOString());

      if (error) throw error;

      const subscriptionsByMonth: { [key: string]: number } = {};

      // Initialize all months with zero subscriptions
      const currentMonth = new Date(startDate);
      while (currentMonth <= endDate) {
        const monthKey = currentMonth.toISOString().slice(0, 7); // YYYY-MM
        subscriptionsByMonth[monthKey] = 0;
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }

      // Count subscriptions for each month
      subscriptions.forEach((subscription) => {
        const month = new Date(subscription.current_period_start)
          .toISOString()
          .slice(0, 7); // YYYY-MM
        subscriptionsByMonth[month]++;
      });

      return Object.entries(subscriptionsByMonth)
        .map(([month, count]) => ({
          month: new Date(month),
          subscriptions: count,
        }))
        .sort((a, b) => a.month.getTime() - b.month.getTime());
    },

    getCurrentRevenueByProduct: async (): Promise<
      { productId: string; revenue: number }[]
    > => {
      const { data: subscriptions, error } = await supabaseAdminClient
        .from("billing_subscriptions")
        .select(
          `
          gateway_product_id,
          billing_prices (amount, currency)
        `,
        )
        .eq("gateway_name", this.getName())
        .eq("status", "active");

      if (error) throw error;

      const revenueByProduct: { [key: string]: number } = {};

      subscriptions.forEach((subscription) => {
        const price = subscription.billing_prices;
        if (!price) {
          return;
        }
        const amount =
          price.currency === "usd" ? price.amount / 100 : price.amount;
        const revenue = convertAmountToUSD(amount, price.currency);
        revenueByProduct[subscription.gateway_product_id] =
          (revenueByProduct[subscription.gateway_product_id] || 0) + revenue;
      });

      return Object.entries(revenueByProduct).map(([productId, revenue]) => ({
        productId,
        revenue,
      }));
    },
    listCurrentMonthInvoices: async (): Promise<InvoiceData[]> => {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const { data: invoices, error } = await supabaseAdminClient
        .from("billing_invoices")
        .select("*, billing_prices(*), billing_products(*)")
        .eq("gateway_name", this.getName())
        .gte("paid_date", startDate.toISOString())
        .lte("paid_date", endDate.toISOString());
      if (error) throw error;
      return invoices;
    },
    listCurrentMonthSubscriptions: async (): Promise<SubscriptionData[]> => {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const { data: subscriptions, error } = await supabaseAdminClient
        .from("billing_subscriptions")
        .select("*, billing_prices(*), billing_products(*)")
        .eq("gateway_name", this.getName())
        .gte("current_period_start", startDate.toISOString())
        .lte("current_period_start", endDate.toISOString());
      if (error) throw error;
      return subscriptions;
    },
    listCustomers: async (): Promise<DBTable<"billing_customers">[]> => {
      const { data: customers, error } = await supabaseAdminClient
        .from("billing_customers")
        .select("*")
        .eq("gateway_name", this.getName());
      if (error) throw error;
      return customers;
    },
  };
}
