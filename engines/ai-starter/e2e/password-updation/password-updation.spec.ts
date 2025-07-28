import { expect, request, test } from "@playwright/test";
import { matchPathMaybeLocale } from "e2e/_helpers/utils";
import { uniqueId } from "lodash";
import { getDefaultWorkspaceInfoHelper } from "../_helpers/workspace.helper";

const INBUCKET_URL = `http://localhost:54324`;

test.describe.serial("Password management", () => {
  test("Users can update password", async ({ page, browser }) => {
    await page.goto("/user/settings/security");
    const email = await page
      .locator('input[name="email"]')
      .getAttribute("value");
    expect(email).toBeTruthy();
    if (!email) {
      throw new Error("Email not found");
    }
    const newPassword = `password-${uniqueId()}`;
    await page.fill('input[name="password"]', newPassword);
    await page.click('button:has-text("Update Password")');
    await page.locator("text=Password updated!").waitFor();

    const newPage = await browser.newPage();
    await newPage.goto("/login");
    await newPage.locator('input[name="email"]').fill(email);
    await newPage.locator('input[name="password"]').fill(newPassword);
    await newPage.getByTestId("password-login-button").click();
    await newPage.locator("text=Logged in!").waitFor();
    await newPage.close();
  });

  test("Users can forget password and reset", async ({ page, browser }) => {
    async function getResetPasswordEmail(
      username: string,
    ): Promise<{ url: string }> {
      const requestContext = await request.newContext();
      const messages = await requestContext
        .get(`${INBUCKET_URL}/api/v1/mailbox/${username}`)
        .then((res) => res.json());
      const currentTime = Date.now();
      const recent10Messages = messages.slice(0, 20);
      const messagesWithSubjectReset = recent10Messages.filter(
        (message) => message.subject === "Reset Your Password",
      );
      const messagesReceivedWithinTheLastMinute =
        messagesWithSubjectReset.filter(
          (message) => Math.abs(currentTime - message["posix-millis"]) < 60000,
        );
      const latestMessage = messagesReceivedWithinTheLastMinute[0];

      if (latestMessage) {
        const message = await requestContext
          .get(`${INBUCKET_URL}/api/v1/mailbox/${username}/${latestMessage.id}`)
          .then((res) => res.json());
        const urlMatch = message.body.text.match(/Reset password \( (.+) \)/);
        if (!urlMatch) {
          console.error("Email content:", message.body.text);
          throw new Error("Email format unexpected");
        }
        return { url: urlMatch[1] };
      }

      throw new Error("No email received");
    }

    await getDefaultWorkspaceInfoHelper({ page });
    await page.goto("/user/settings/security");
    // get email of user
    const email = await page
      .locator('input[name="email"]')
      .getAttribute("value");
    expect(email).toBeTruthy();
    if (!email) {
      throw new Error("Email not found");
    }

    const newPage = await browser.newPage();
    await newPage.goto("/logout");
    await newPage.goto("/forgot-password");
    await newPage.fill('input[name="email"]', email);
    await newPage.click('button:has-text("Reset password")');
    await newPage
      .locator('text="A password reset link has been sent to your email!"')
      .waitFor();

    const identifier = email.split("@")[0];
    let resetPasswordUrl: string | undefined = undefined;
    await expect
      .poll(
        () =>
          getResetPasswordEmail(identifier).then((data) => {
            resetPasswordUrl = data.url;
            return true;
          }),
        {
          intervals: [1000, 2000, 5000, 10000, 20000],
        },
      )
      .toBe(true);

    if (!resetPasswordUrl) {
      throw new Error("No reset password URL received");
    }

    await newPage.goto(resetPasswordUrl);
    const resetPasswordForm = newPage.getByTestId("password-form");
    await resetPasswordForm.waitFor();
    await resetPasswordForm.getByRole("textbox").fill("newpassword");
    await resetPasswordForm.getByRole("button").click();
    await matchPathMaybeLocale({
      page: newPage,
      pathWithoutLocale: "/home",
    });
  });
});
