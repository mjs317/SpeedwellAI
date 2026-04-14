import { Resend } from "resend";
import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, timeSink, message } = body as {
      name?: string;
      email?: string;
      timeSink?: string;
      message?: string;
    };

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !timeSink?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Speedwell AI <hello@speedwellai.com>",
      to: "hello@speedwellai.com",
      replyTo: email.trim(),
      subject: `New Speedwell AI inquiry — ${timeSink}`,
      text: [
        `New inquiry from the Speedwell AI website`,
        ``,
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Biggest Time Sink: ${timeSink}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
