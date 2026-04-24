import { NextRequest, NextResponse } from "next/server";

/* WHY: Using Resend's REST API directly (same pattern as checkout route)
   to send contact form submissions to support@uncscares.org. */

const SUBJECT_LABELS: Record<string, string> = {
  general: "General Inquiry",
  donate: "Donation Question",
  volunteer: "Volunteer",
  partnership: "Partnership / Sponsorship",
  media: "Media / Press",
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  /* WHY: Basic email format check — full validation happens on the
     client side too, but we don't trust client input. */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  const subjectLabel = SUBJECT_LABELS[subject] || "General Inquiry";
  const fromAddress =
    process.env.RESEND_FROM_EMAIL ||
    "UNCS Cares Foundation <onboarding@resend.dev>";

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #14617f;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666; width: 100px;">Name</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">
            <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666;">Subject</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(subjectLabel)}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 6px;">
        <p style="margin: 0; white-space: pre-wrap; color: #333;">${escapeHtml(message)}</p>
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        Reply directly to this email to respond to ${escapeHtml(name)}.
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: "support@uncscares.org",
      reply_to: email,
      subject: `[UNCSCares.org] ${subjectLabel} from ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Resend contact email error:", errorBody);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

/* WHY: Prevent XSS in email HTML — user input goes into the template. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
