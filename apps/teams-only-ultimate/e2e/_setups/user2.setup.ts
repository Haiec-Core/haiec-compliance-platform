import { test as setup } from "@playwright/test";
import { onboardUserHelper } from "../_helpers/onboard-user.helper";
import { signupUserHelper } from "../_helpers/signup.helper";

function getIdentifier(): string {
  return `maryjane` + Date.now().toString().slice(-4);
}

const authFile = "playwright/.auth/user_2.json";

setup("create account", async ({ page }) => {
  const identifier = getIdentifier();
  const emailAddress = `${identifier}@myapp.com`;
  await signupUserHelper({ page, emailAddress, identifier });

  await onboardUserHelper({ page, name: "Mary Jane" });
  await page.context().storageState({ path: authFile });
});
