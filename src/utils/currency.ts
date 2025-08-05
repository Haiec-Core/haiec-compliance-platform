const exchangeRateMap = {
  inr: 0.012,
  usd: 1, // we store cents in the database
  eur: 1.1,
  gbp: 1.2,
  jpy: 0.007,
  cad: 0.7,
  aud: 0.6,
  sgd: 0.7,
  hkd: 0.1,
  cny: 0.1,
  brl: 0.2,
  mxn: 0.05,
  zar: 0.05,
  zwl: 0.00003,
};

function isValidCurrency(
  currency: string,
): currency is keyof typeof exchangeRateMap {
  return Object.keys(exchangeRateMap).includes(currency);
}

export function convertAmountToUSD(amount: number, currency: string): number {
  const isCurrencySupported = isValidCurrency(currency);
  if (!isCurrencySupported) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  const exchangeRate = exchangeRateMap[currency];
  if (!exchangeRate) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  return amount * exchangeRate;
}

/**
 * Stripe says currency is USD but stores cents.
 * We have to divide by 100 to get the correct amount.
 * This function normalizes the price and currency to the correct amount.
 */
export function normalizePriceAndCurrency(
  amount: number,
  currency: string,
): number {
  if (currency?.toLowerCase() === "usd") {
    return amount / 100;
  }
  return amount;
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
