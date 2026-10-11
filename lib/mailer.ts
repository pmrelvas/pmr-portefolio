import "server-only";
import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sends a contact message through Resend.
 *
 * The API key is read from the server environment only (never `NEXT_PUBLIC_`),
 * so it is never shipped to the browser. Create the key with sending-only
 * permissions scoped to a verified domain.
 *
 * Throws `Error("EMAIL_NOT_CONFIGURED")` when the env vars are missing, so the
 * Server Action can return a friendly message instead of crashing.
 */
export async function sendContactEmail({ name, email, message }: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
