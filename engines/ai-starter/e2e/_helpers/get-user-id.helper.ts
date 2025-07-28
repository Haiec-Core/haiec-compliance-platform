import { Page } from "@playwright/test";

export async function getUserIdHelper({ page }: { page: Page }) {
  // wait for div with data-testid "user-nav-avatar"
  const userNavAvatar = await page.waitForSelector('div[data-testid="user-nav-avatar"]');
  if (!userNavAvatar) {
    throw new Error('userNavAvatar not found');
  }
  // data-user-id from the div
  const userId = await userNavAvatar.getAttribute('data-user-id');

  if (!userId) {
    throw new Error('userId not found');
  }

  return userId;
}
