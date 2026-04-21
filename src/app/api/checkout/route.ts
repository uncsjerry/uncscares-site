import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/* WHY: Using Stripe Checkout Sessions instead of Payment Links because
   we need dynamic amounts and fund metadata per donation. Checkout handles
   all PCI compliance, card UI, Apple Pay, Google Pay automatically. */

/* WHY: Lazy initialization avoids crashing the build when the env var
   isn't set (e.g. during static page generation at build time). */
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-03-25.dahlia",
  });
}

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

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      /* WHY: submit_type "donate" shows "Donate" instead of "Pay" on the
         Stripe Checkout button — important UX for nonprofits. */
      submit_type: "donate",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `UNCS Cares Foundation — ${fundLabel}`,
              description: `Tax-deductible donation to ${fundLabel}. EIN #84-4044721.`,
            },
            unit_amount: cents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        fund,
        fund_label: fundLabel,
      },
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
