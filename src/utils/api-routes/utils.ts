// import sendgrid from '@sendgrid/mail';
import { Resend } from "resend";
import { errors } from "../errors";
import { sendEmailInbucket } from "../sendEmailInbucket";

type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

const isDevOrTestEnvironment =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

export async function sendEmail(options: EmailOptions) {
  if (isDevOrTestEnvironment) {
    await sendEmailInbucket(options);
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // return sendgrid.send(options);
    return resend.emails.send(options);
  } catch (error) {
    errors.add(error);
  }
}
