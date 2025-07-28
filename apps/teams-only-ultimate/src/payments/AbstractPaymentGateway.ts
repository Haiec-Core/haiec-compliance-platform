import { DBTable } from "@/types";
import { Dictionary } from "lodash";

export class PaymentGatewayError extends Error {
  constructor(
    message: string,
    public code: string,
    public gateway: string,
  ) {
    super(message, {
      cause: {
        code,
        gateway,
      },
    });
  }
}

export interface PaginationOptions {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  totalCount?: number;
}

export type CustomerData = {
  id?: string;
  email: string;
  metadata?: { [key: string]: string };
};

export type GatewaySubscriptionData = {
  id: string;
  status: string;
};

export type SubscriptionData = DBTable<"billing_subscriptions"> & {
  billing_prices: DBTable<"billing_prices"> | null;
  billing_products: DBTable<"billing_products"> | null;
};

export type ProductData = DBTable<"billing_products"> & {
  billing_prices: DBTable<"billing_prices">[];
};

export type ProductAndPrice = {
  product: DBTable<"billing_products">;
  price: DBTable<"billing_prices">;
};

export type InvoiceData = DBTable<"billing_invoices"> & {
  billing_products: DBTable<"billing_products"> | null;
  billing_prices: DBTable<"billing_prices"> | null;
};

export type OneTimePaymentData = DBTable<"billing_one_time_payments"> & {
  billing_products: DBTable<"billing_products"> | null;
  billing_prices: DBTable<"billing_prices"> | null;
  billing_invoices: DBTable<"billing_invoices"> | null;
};

export interface CheckoutSessionData {
  id: string;
  url: string;
}

export interface CustomerPortalData {
  url: string;
}

export interface PaymentMethodData {
  id: string;
  customerId: string;
  type: "card" | "bank_account" | "other";
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export type CheckoutSessionOptions = {
  freeTrialDays?: number;
};

export abstract class PaymentGateway {
  abstract getName(): string;

  /**
   * These are methods which perform operations on the database.
   */
  abstract db: {
    createCustomer(
      customerData: Partial<DBTable<"billing_customers">>,
      workspaceId: string,
    ): Promise<DBTable<"billing_customers">>;
    getCustomerByCustomerId(
      customerId: string,
    ): Promise<DBTable<"billing_customers">>;
    getCustomerByWorkspaceId(
      workspaceId: string,
    ): Promise<DBTable<"billing_customers"> | null>;
    hasCustomer(customerId: string): Promise<boolean>;
    updateCustomer(
      customerId: string,
      updateData: Partial<DBTable<"billing_customers">>,
    ): Promise<DBTable<"billing_customers">>;
    deleteCustomer(customerId: string): Promise<void>;
    listCustomers(
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<DBTable<"billing_customers">>>;
    // Subscription methods
    getSubscriptionsByCustomerId(
      customerId: string,
    ): Promise<SubscriptionData[]>;
    getSubscriptionsByWorkspaceId(
      workspaceId: string,
    ): Promise<SubscriptionData[]>;
    getSubscription(subscriptionId: string): Promise<SubscriptionData>;
    listSubscriptions(
      customerId: string,
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<SubscriptionData>>;
    // Invoice methods
    getInvoice(invoiceId: string): Promise<InvoiceData>;
    listInvoicesByCustomerId(
      customerId: string,
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<InvoiceData>>;
    listInvoicesByWorkspaceId(
      workspaceId: string,
      options?: PaginationOptions,
    ): Promise<PaginatedResponse<InvoiceData>>;
    // Product methods
    getProduct(productId: string): Promise<ProductData>;
    listProducts(options?: PaginationOptions): Promise<Array<ProductData>>;
  };

  abstract util: {
    createCustomerForWorkspace(
      workspaceId: string,
    ): Promise<DBTable<"billing_customers">>;
    getCustomerByWorkspaceId(
      workspaceId: string,
    ): Promise<DBTable<"billing_customers"> | null>;
    supportsFeature(featureName: string): boolean;
    isTestMode(): boolean;
  };

  /**
   * These are methods which perform operations on the payment gateway.
   */
  abstract gateway: {
    createGatewayCustomer(
      userData: Partial<CustomerData>,
    ): Promise<CustomerData>;
    // Webhook methods
    handleGatewayWebhook(
      body: string | Buffer,
      signature: string,
    ): Promise<void>;
  };
  abstract anonScope: {
    listAllProducts(): Promise<ProductAndPrice[]>;
    /**
     * List all subscription products that are visible to the user.
     */
    listAllSubscriptionProducts(): Promise<Dictionary<ProductAndPrice[]>>;
    /**
     * List all one-time products that are visible to the user.
     */
    listAllOneTimeProducts(): Promise<ProductAndPrice[]>;
  };
  abstract userScope: {
    getWorkspaceDatabaseSubscriptions(
      workspaceId: string,
    ): Promise<DBTable<"billing_subscriptions">[]>;
    getWorkspaceDatabaseOneTimePurchases(
      workspaceId: string,
    ): Promise<OneTimePaymentData[]>;
    getWorkspaceDatabaseInvoices(
      workspaceId: string,
    ): Promise<PaginatedResponse<InvoiceData>>;
    getWorkspaceDatabasePaymentMethods(
      workspaceId: string,
    ): Promise<DBTable<"billing_payment_methods">[]>;
    getWorkspaceDatabaseCustomer(
      workspaceId: string,
    ): Promise<DBTable<"billing_customers">>;
    // Checkout methods
    createGatewayCheckoutSession({
      productId,
      priceId,
      options,
      workspaceId,
    }: {
      workspaceId: string;
      productId: string;
      priceId: string;
      options?: CheckoutSessionOptions;
    }): Promise<CheckoutSessionData>;
    // Customer portal methods
    createGatewayCustomerPortalSession(
      workspaceId: string,
      returnUrl: string,
    ): Promise<CustomerPortalData>;
  };
  abstract superAdminScope: {
    syncProducts(): Promise<void>;
    syncCustomers(): Promise<void>;
    toggleProductVisibility(
      productId: string,
      isVisible: boolean,
    ): Promise<void>;
    listAllProducts(): Promise<ProductData[]>;
    getCurrentMRR(): Promise<number>;
    getSubscriptionsByMonthBetween(
      startDate: Date,
      endDate: Date,
    ): Promise<{ month: Date; subscriptions: number }[]>;
    getCurrentRevenueByProduct(): Promise<
      { productId: string; revenue: number }[]
    >;
    getCurrentMonthRevenue(): Promise<number>;
    getLastMonthRevenue(): Promise<number>;
    listCurrentMonthInvoices(): Promise<InvoiceData[]>;
    listCurrentMonthSubscriptions(): Promise<SubscriptionData[]>;
    listCustomers(): Promise<DBTable<"billing_customers">[]>;
  };
}
