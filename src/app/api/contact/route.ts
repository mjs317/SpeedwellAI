import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Placeholder contact form handler.
 *
 * TODO: Replace this stub with a real implementation. Options include:
 *   - Resend (https://resend.com) — send emails via API
 *   - Nodemailer with SMTP credentials
 *   - A third-party form service (Formspree, HubSpot Forms, etc.)
 *
 * Environment variables you'll likely need:
 *   RESEND_API_KEY=re_xxxxxxxxxxxx
 *   CONTACT_EMAIL_TO=hello@speedwellai.com
 */

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;
    const { name, email, message } = body;

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // TODO: Send the email / save to CRM / call your preferred service here.
    // Example with Resend:
    //
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Speedwell AI <noreply@speedwellai.com>",
    //   to: process.env.CONTACT_EMAIL_TO!,
    //   subject: `New inquiry from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${body.company ?? "N/A"}\n\n${message}`,
    // });

    // For now, log to server console (development only)
    if (process.env.NODE_ENV !== "production") {
      console.log("[Contact Form Submission]", {
        name,
        email,
        company: body.company,
        message,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    console.error("[Contact API] Unexpected error");
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
