import { Page } from "@playwright/test";

const locales = ["en", "de"];

/**
 * Waits for URL to match either the path without locale or with any supported locale prefix
 * @param page - Playwright page object
 * @param pathWithoutLocale - Path to match (without locale prefix)
 * @returns Promise<void>
 */
export async function matchPathMaybeLocale({
  page,
  pathWithoutLocale,
}: {
  page: Page;
  pathWithoutLocale: string;
}): Promise<void> {
  // Remove any leading slashes for consistency
  const cleanPath = pathWithoutLocale.replace(/^\/+/, "");

  // Create patterns for all locales and no-locale version
  const pathPatterns = [
    new RegExp(`/${cleanPath}$`), // /some-path
    ...locales.map(
      (
        locale, // /en/some-path, /de/some-path
      ) => new RegExp(`/${locale}/${cleanPath}$`),
    ),
  ];

  // Convert patterns to strings for use in the browser context
  const patternStrings = pathPatterns.map((pattern) =>
    pattern.toString().slice(1, -1),
  );

  // Wait for URL to match any of the patterns
  await page.waitForFunction((patterns: string[]) => {
    return patterns.some((pattern) =>
      new RegExp(pattern).test(window.location.href),
    );
  }, patternStrings);
}
