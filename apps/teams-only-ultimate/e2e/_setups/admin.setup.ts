import { test as setup } from "@playwright/test";
import {
  createPGClient,
  createSupabaseTestAdminClient,
} from "e2e/_helpers/admin.helper";
import { loginUserHelper } from "e2e/_helpers/login-user.helper";
import { onboardUserHelper } from "e2e/_helpers/onboard-user.helper";
import { signupUserHelper } from "e2e/_helpers/signup.helper";

function getIdentifier(): string {
  return `adminjoe` + Date.now().toString().slice(-4);
}

const adminAuthFile = "playwright/.auth/app_admin.json";

setup("check current database user and set admin role", async ({ page }) => {
  const identifier = getIdentifier();
  const emailAddress = `${identifier}@myapp.com`;
  await signupUserHelper({ page, emailAddress, identifier });
  await onboardUserHelper({ page, name: "Admin Joe" });
  // const emailAddress = `adminjoe3952@myapp.com`
  // const identifier = 'adminjoe3952'

  // Connect to the PostgreSQL database
  const client = createPGClient();

  const supabaseTestAdminClient = createSupabaseTestAdminClient();
  try {
    await client.connect();

    // Find the user ID for the email
    const userIdRes = await supabaseTestAdminClient
      .from("user_application_settings")
      .select("*")
      .eq("email_readonly", emailAddress)
      .single();

    const { data, error } = userIdRes;
    if (error) {
      throw error;
    }
    const userId = data.id;

    await client.query("select make_user_app_admin($1)", [userId]);
    await page.goto(`/logout`);
    await loginUserHelper({ page, emailAddress });

    await page.getByTestId("admin-panel-label").waitFor();

    await page.context().storageState({ path: adminAuthFile });
  } catch (error) {
    console.error("Database connection or query execution error:", error);
  } finally {
    await client.end();
  }
});
