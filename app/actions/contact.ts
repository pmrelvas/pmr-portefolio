"use server";

import { sendContactEmail } from "@/lib/mailer";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("company") ?? "").trim();

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (honeypot) {
    return { status: "success", message: "Thanks! Your message was sent." };
  }

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }

  if (name.length > 100 || email.length > 200 || message.length > 4000) {
    return { status: "error", message: "Some of your input is too long." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await sendContactEmail({ name, email, message });
    return { status: "success", message: "Thanks! Your message was sent." };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "";

    if (reason === "EMAIL_NOT_CONFIGURED") {
      console.warn(
        "[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL are not configured; the message was not emailed.",
      );
      return {
        status: "error",
        message: "The contact form isn't configured yet. Please email me directly.",
      };
    }

    console.error("[contact] Failed to send message", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }
}
