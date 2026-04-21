import { NextRequest, NextResponse } from "next/server";

/* WHY: Using Stripe's REST API directly with fetch instead of the Stripe SDK.
   The SDK's built-in HTTP client can have connection issues in Vercel's
   serverless environment. Fetch is natively supported and more reliable. */

/* Fund labels shown on the Stripe receipt */
const FUND_LABELS: Record<string, string> = {
  general: "General Fund",
  backtoschool: "Back to School Drive",
  thanksgiving: "Thanksgiving Dinner Drive",
  bicycle: "Holiday Bicycle Drive",
  dorm: "Destination Dorm",
  shoes: "4EveryKid & Soles4Souls",
  housing: "7 on 7th Affordable Housing",
};

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Payment processor not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { amount, fund } = body;

    /* Validate amount — minimum $1 donation */
    const cents = Math.round(Number(amount) * 100);
    if (!cents || cents < 100) {
      return NextResponse.json(
        { error: "Minimum donation is $1" },
        { status: 400 }
      );
    }

    /* Cap at $50,000 to prevent accidental massive charges */
    if (cents > 5_000_000) {
      return NextResponse.json(
        { error: "For donations over $50,000 please contact us directly" },
        { status: 400 }
      );
    }

    const fundLabel = FUND_LABELS[fund] || "General Fund";
    const origin = request.nextUrl.origin;

    /* Create Stripe Checkout Session via REST API */
    const params = new URLSearchParams();
    params.append("mode", "payment");
    /* WHY: submit_type "donate" shows "Donate" instead of "Pay" on the
       Stripe Checkout button — important UX for nonprofits. */
    params.append("submit_type", "donate");
    params.append("line_items[0][price_data][currency]", "usd");
    params.append(
      "line_items[0][price_data][product_data][name]",
      `UNCS Cares Foundation — ${fundLabel}`
    );
    params.append(
      "line_items[0][price_data][product_data][description]",
      `Tax-deductible donation to ${fundLabel}. EIN #84-4044721.`
    );
    params.append(
      "line_items[0][price_data][unit_amount]",
      cents.toString()
    );
    params.append("line_items[0][quantity]", "1");
    params.append("metadata[fund]", fund);
    params.append("metadata[fund_label]", fundLabel);
    params.append(
      "success_url",
      `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`
    );
    params.append("cancel_url", `${origin}/donate/cancel`);

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("Stripe API error:", session);
      return NextResponse.json(
        {
          error: session.error?.message || "Payment processor error",
        },
        { status: stripeRes.status }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout error:", message);
    return NextResponse.json(
      { error: "Unable to create checkout session", detail: message },
      { status: 500 }
    );
  }
}
