import type { Page } from "@playwright/test";
import { expect, request } from "@playwright/test";
import { matchPathMaybeLocale } from "./utils";

const INBUCKET_URL = `http://localhost:54324`;

/**
 * Message samples
 *
 * ----------\nMagic Link\n----------\n\nFollow this link to login:\n\nLog In ( http://127.0.0.1:54321/auth/v1/verify?token=pkce_8727a6aad33b430c0a5d01d92e5b2fca0481beda04dfa028a59a50b0&type=magiclink&redirect_to=http://localhost:3000/auth/callback )\n\nAlternatively, enter the code: 122956
 */

const matchers = [
  {
    tokenMatcher: /enter the code: ([0-9]+)/,
    urlMatcher: /Confirm your email address \( (.+) \)/,
  },
  {
    tokenMatcher: /enter the code: ([0-9]+)/,
    urlMatcher: /Log In \( (.+) \)/,
  },
];

function getTokenAndUrlFromEmailText(text: string) {
  // the first matcher that matches the text is used
  for (const matcher of matchers) {
    const token = text.match(matcher.tokenMatcher)?.[1];
    const url = text.match(matcher.urlMatcher)?.[1];
    if (token && url) {
      return { token, url };
    }
  }
  throw new Error("No token and url found in email text");
}

// eg endpoint: https://api.testmail.app/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&pretty=true
async function getConfirmEmail(username: string): Promise<{
  token: string;
  url: string;
}> {
  const requestContext = await request.newContext();
  const messages = await requestContext
    .get(`${INBUCKET_URL}/api/v1/mailbox/${username}`)
    .then((res) => res.json())
    // InBucket doesn't have any params for sorting, so here
    // we're sorting the messages by date
    .then((items) =>
      [...items].sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }

        if (a.date > b.date) {
          return -1;
        }

        return 0;
      }),
    );

  const latestMessageId = messages[0]?.id;
  if (latestMessageId) {
    const message = await requestContext
      .get(`${INBUCKET_URL}/api/v1/mailbox/${username}/${latestMessageId}`)
      .then((res) => res.json());

    // We've got the latest email. We're going to use regular
    // expressions to match the bits we need.
    const { token, url } = getTokenAndUrlFromEmailText(message.body.text);
    return { token, url };
  }

  throw new Error("No email received");
}

export async function signupUserHelper({
  page,
  emailAddress,
  identifier,
}: {
  page: Page;
  emailAddress: string;
  identifier: string;
}) {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("/sign-up");

  const magicLoginButton = await page.waitForSelector(
    'button:has-text("Magic Link")',
  );

  if (!magicLoginButton) {
    throw new Error("magicLoginButton not found");
  }

  await magicLoginButton.click();

  await page.getByTestId("magic-link-form").locator("input").fill(emailAddress);
  // await page.getByLabel('Password').fill('password');
  await page.getByRole("button", { name: "Sign up with Magic Link" }).click();
  // check for this text - A magic link has been sent to your email!
  await page.getByText("A magic link has been sent to your email!");
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
  await matchPathMaybeLocale({
    page,
    pathWithoutLocale: "/onboarding",
  });
}
