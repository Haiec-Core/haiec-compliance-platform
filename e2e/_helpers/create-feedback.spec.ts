// @src/e2e/_helpers/create-feedback.helper.ts
import { expect, type Locator, type Page } from '@playwright/test';

export async function createFeedbackHelper(page: Page): Promise<void> {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });

  const userNavAvatar: Locator = page.getByTestId('user-nav-avatar');
  const feedbackLink: Locator = page.getByTestId('feedback-link');
  const feedbackForm: Locator = page.getByTestId('give-feedback-form');
  const titleInput: Locator = feedbackForm.getByRole('textbox', { name: 'title' });
  const contentInput: Locator = feedbackForm.getByRole('textbox', { name: 'content' });
  const submitButton: Locator = feedbackForm.getByRole('button', { name: 'Submit Feedback' });

  await expect(userNavAvatar).toBeVisible();
  await userNavAvatar.click();

  await expect(feedbackLink).toBeVisible();
  await feedbackLink.click();

  await expect(feedbackForm).toBeVisible();

  await titleInput.fill('Test title');
  await contentInput.fill('Test content');

  await expect(submitButton).toBeEnabled();

  await submitButton.click();

  await page.waitForURL((url) => url.pathname.startsWith('/feedback/'));

}
