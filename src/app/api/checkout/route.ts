import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

/* WHY: Using Stripe's REST API directly with fetch instead of the Stripe SDK.
   The SDK's built-in HTTP client can have connection issues in Vercel's
   serverless environment. Fetch is natively supported and more reliable. */

/* WHY: Allowlist of valid origins prevents cross-site abuse. Only our
   own domain should be creating checkout sessions. */
const ALLOWED_ORIGINS = [
  "https://uncscares.org",
  "https://www.uncscares.org",
];

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
    /* --- Rate limiting --- */
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) } }
      );
    }

    /* --- Origin validation (skip in dev for localhost) --- */
    const origin = request.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin) && !origin.includes("localhost")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Payment processor not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { amount, fund, marketingConsent, website } = body;

    /* --- Honeypot check — bots fill this invisible field --- */
    if (website) {
      /* WHY: Return 200 so bots think they succeeded. No point
         telling them their submission was rejected. */
      return NextResponse.json({ url: "https://uncscares.org/donate/success" });
    }

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

    /* --- Validate fund against allowlist --- */
    if (fund && !FUND_LABELS[fund]) {
      return NextResponse.json(
        { error: "Invalid fund selection" },
        { status: 400 }
      );
    }

    const fundLabel = FUND_LABELS[fund] || "General Fund";
    const reqOrigin = request.nextUrl.origin;

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
    params.append("metadata[marketing_consent]", marketingConsent ? "true" : "false");
    params.append(
      "success_url",
      `${reqOrigin}/donate/success?session_id={CHECKOUT_SESSION_ID}`
    );
    params.append("cancel_url", `${reqOrigin}/donate/cancel`);

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
    /* WHY: Log full error server-side for debugging, but never expose
       internal details to the client — prevents information disclosure. */
    console.error("Stripe checkout error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
