/* WHY: Fetch-based Resend integration — no SDK, matching the
   project's Stripe pattern. Keeps dependencies minimal. */

interface DonationReceiptParams {
  to: string;
  donorName: string | null;
  amountCents: number;
  fundLabel: string;
  stripeSessionId: string;
  donatedAt: string; // ISO date string
}

export async function sendDonationReceipt(
  params: DonationReceiptParams
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Email service not configured" };
  }

  const { to, donorName, amountCents, fundLabel, stripeSessionId, donatedAt } =
    params;

  const amount = (amountCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const date = new Date(donatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const greeting = donorName ? `Dear ${donorName}` : "Dear Generous Donor";
  /* WHY: Truncate session ID to last 8 chars — enough for reference
     without exposing the full Stripe identifier in email. */
  const refId = stripeSessionId.slice(-8).toUpperCase();

  const html = buildReceiptHtml({
    greeting,
    amount,
    fundLabel,
    date,
    refId,
  });

  /* WHY: Using onboarding@resend.dev as fallback until uncscares.org
     domain is verified in Resend. Switch to receipts@uncscares.org
     after DNS records are added. */
  const fromAddress = process.env.RESEND_FROM_EMAIL || "UNCS Cares Foundation <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to,
      subject: `Thank you for your ${amount} donation — UNCS Cares Foundation`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend API error:", body);
    return { success: false, error: body };
  }

  return { success: true };
}

/* ---------- HTML template ---------- */

function buildReceiptHtml(p: {
  greeting: string;
  amount: string;
  fundLabel: string;
  date: string;
  refId: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

  <!-- Header -->
  <tr>
    <td style="background:#14617f;padding:32px 40px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:0.5px;">
        UNCS Cares Foundation
      </h1>
      <p style="margin:8px 0 0;color:#d4a843;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
        Donation Receipt
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:40px;">
      <p style="margin:0 0 20px;color:#333;font-size:16px;line-height:1.6;">
        ${p.greeting},
      </p>
      <p style="margin:0 0 24px;color:#333;font-size:16px;line-height:1.6;">
        Thank you for your generous donation to the <strong>${p.fundLabel}</strong>.
        Your support makes a real difference for families in Broward County.
      </p>

      <!-- Receipt Table -->
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;margin:0 0 28px;">
        <tr style="background:#f9fafb;">
          <td style="padding:12px 16px;color:#666;font-size:13px;border-bottom:1px solid #e5e5e5;">Date</td>
          <td style="padding:12px 16px;color:#333;font-size:14px;border-bottom:1px solid #e5e5e5;text-align:right;">${p.date}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;color:#666;font-size:13px;border-bottom:1px solid #e5e5e5;">Amount</td>
          <td style="padding:12px 16px;color:#14617f;font-size:18px;font-weight:700;border-bottom:1px solid #e5e5e5;text-align:right;">${p.amount}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:12px 16px;color:#666;font-size:13px;border-bottom:1px solid #e5e5e5;">Fund</td>
          <td style="padding:12px 16px;color:#333;font-size:14px;border-bottom:1px solid #e5e5e5;text-align:right;">${p.fundLabel}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;color:#666;font-size:13px;border-bottom:1px solid #e5e5e5;">Payment Method</td>
          <td style="padding:12px 16px;color:#333;font-size:14px;border-bottom:1px solid #e5e5e5;text-align:right;">Credit/Debit Card</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:12px 16px;color:#666;font-size:13px;">Reference</td>
          <td style="padding:12px 16px;color:#333;font-size:14px;text-align:right;font-family:monospace;">${p.refId}</td>
        </tr>
      </table>

      <!-- IRS Tax Language -->
      <div style="background:#f9fafb;border-left:4px solid #d4a843;padding:16px 20px;margin:0 0 28px;border-radius:0 4px 4px 0;">
        <p style="margin:0;color:#555;font-size:13px;line-height:1.6;">
          UNCS Cares Foundation is a tax-exempt organization under Section 501(c)(3)
          of the Internal Revenue Code. <strong>EIN: 84-4044721.</strong>
          No goods or services were provided in exchange for this contribution.
          Please retain this receipt for your tax records.
        </p>
      </div>

      <p style="margin:0;color:#333;font-size:16px;line-height:1.6;">
        With gratitude,<br/>
        <strong>The UNCS Cares Foundation Team</strong>
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e5e5;text-align:center;">
      <p style="margin:0 0 4px;color:#999;font-size:12px;">
        UNCS Cares Foundation &bull; 501(c)(3) Nonprofit
      </p>
      <p style="margin:0 0 4px;color:#999;font-size:12px;">
        1471 NE 26th St, 2nd Floor, Fort Lauderdale, FL 33305
      </p>
      <p style="margin:0;color:#999;font-size:12px;">
        <a href="mailto:support@uncscares.org" style="color:#14617f;text-decoration:none;">support@uncscares.org</a>
        &bull; (954) 524-3325
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
