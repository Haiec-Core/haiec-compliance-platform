import { type Page, expect, request } from "@playwright/test";

const INBUCKET_URL = `http://localhost:54324`;

// eg endpoint: https://api.testmail.app/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&pretty=true
async function getConfirmEmail(username: string): Promise<{
  token: string;
  url: string;
}> {
  const requestContext = await request.newContext();
  const now = new Date().getTime();
  const messages = await requestContext
    .get(`${INBUCKET_URL}/api/v1/mailbox/${username}`)
    .then((res) => res.json())
    .then((items) =>
      items
        .filter((item) => {
          const itemDate = new Date(item.date).getTime();

          return Math.abs(now - itemDate) < 10000; // Filter out emails received within the last 20 seconds
        })
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
    );

  const latestMessage = messages[0];

  if (latestMessage) {
    const message = await requestContext
      .get(`${INBUCKET_URL}/api/v1/mailbox/${username}/${latestMessage.id}`)
      .then((res) => res.json());

    const tokenMatch = message.body.text.match(/enter the code: ([0-9]+)/);
    const urlMatch = message.body.text.match(/Log In \( (.+) \)/);

    if (!tokenMatch || !urlMatch) {
      throw new Error("Email format unexpected");
    }

    return { token: tokenMatch[1], url: urlMatch[1] };
  }

  throw new Error("No email received");
}

export async function loginUserHelper({
  page,
  emailAddress,
}: {
  page: Page;
  emailAddress: string;
}) {
  await page.goto(`/login`);

  const magicLinkButton = page.locator('button:has-text("Magic Link")');

  if (!magicLinkButton) {
    throw new Error("Magic Link button not found");
  }

  await magicLinkButton.click();
  const magicLinkForm = page.getByTestId("magic-link-form");
  await magicLinkForm.waitFor();
  await magicLinkForm.locator("input").fill(emailAddress);
  // await page.getByLabel('Password').fill('password');
  await magicLinkForm.locator("button").click();
  // check for this text - A magic link has been sent to your email!
  await page.getByTestId("email-confirmation-pending-card").waitFor();
  const identifier = emailAddress.split("@")[0];
  let url;
  await expect
    .poll(
      async () => {
        try {
          const { url: urlFromCheck } = await getConfirmEmail(identifier);
          url = urlFromCheck;
          return typeof urlFromCheck;
        } catch (e) {
          return null;
        }
      },
      {
        message: "make sure the email is received",
        intervals: [1000, 2000, 5000, 10000, 20000],
      },
    )
    .toBe("string");

  await page.goto(url);
}
