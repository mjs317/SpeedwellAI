// ─── Resend Client Wrapper ──────────────────────────────────────────────────
//
// SETUP — required before emails will send:
//   1. Create a free account at https://resend.com (3,000 emails/month free).
//   2. Add the sending domain `speedwellai.com` in Resend → Domains, then
//      paste the DNS records into Cloudflare (SPF/DKIM/return-path) and wait
//      for verification.
//   3. Generate an API key in Resend → API Keys.
//   4. In Vercel → Project → Settings → Environment Variables, add:
//        RESEND_API_KEY=re_xxxxxxxxxxxx
//   5. Until the domain is verified, Resend only lets you send from
//      `onboarding@resend.dev` to the address associated with your Resend
//      account. Set RESEND_USE_FALLBACK_FROM=1 during testing. Remove that
//      env var once speedwellai.com is verified.

import { Resend } from "resend";

const DEFAULT_FROM = "Speedwell AI <hello@speedwellai.com>";
const FALLBACK_FROM = "Speedwell AI <onboarding@resend.dev>";

export const INTERNAL_NOTIFICATION_TO = "hello@speedwellai.com";

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
  replyTo?: string;
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFromAddress(): string {
  return process.env.RESEND_USE_FALLBACK_FROM === "1"
    ? FALLBACK_FROM
    : DEFAULT_FROM;
}

export async function sendEmail(input: SendEmailInput): Promise<
  | { ok: true; id?: string }
  | { ok: false; error: string }
> {
  const resend = getResend();
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });

    if (error) {
      return { ok: false, error: error.message || "Resend error" };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: message };
  }
}
