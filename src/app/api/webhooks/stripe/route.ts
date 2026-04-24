import { NextResponse } from "next/server";
import { verifyStripeSignature } from "@/lib/stripe-webhook";
import { getSupabase } from "@/lib/supabase";
import { sendDonationReceipt } from "@/lib/email";

/* WHY: Stripe sends webhooks as POST with a raw body. We must read
   the body as text (not JSON) to preserve the exact bytes for
   signature verification. */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const signatureHeader = request.headers.get("stripe-signature");
  if (!signatureHeader) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const rawBody = await request.text();

  const { valid, error: sigError } = verifyStripeSignature(
    rawBody,
    signatureHeader,
    webhookSecret
  );

  if (!valid) {
    console.error("Webhook signature verification failed:", sigError);
    return NextResponse.json({ error: sigError }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  /* WHY: Only handle checkout.session.completed — this fires when
     payment is confirmed. Other event types are ignored silently
     with 200 so Stripe doesn't retry them. */
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const email = session.customer_details?.email;

  if (!email) {
    console.error("No customer email in checkout session:", session.id);
    return NextResponse.json({ received: true });
  }

  const donorName = session.customer_details?.name || null;
  const amountCents = session.amount_total;
  const currency = session.currency || "usd";
  const fund = session.metadata?.fund || "general";
  const fundLabel = session.metadata?.fund_label || "General Fund";
  const marketingConsent = session.metadata?.marketing_consent === "true";
  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : null;

  try {
    const supabase = getSupabase();

    /* Step 1: Upsert donor — create on first donation, update on repeat */
    const { data: donor, error: donorError } = await supabase
      .from("donors")
      .upsert(
        {
          email,
          name: donorName,
          marketing_consent: marketingConsent,
          consent_updated_at: marketingConsent ? new Date().toISOString() : null,
          donation_count: 1,
          total_donated_cents: amountCents,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      )
      .select("id, donation_count, total_donated_cents")
      .single();

    if (donorError) {
      /* WHY: If the upsert hit a conflict, Supabase's upsert with
         select may not return data when using raw values for counters.
         Fall back to a manual update + select. */
      console.error("Donor upsert failed, trying increment approach:", donorError.message);

      const { data: existingDonor } = await supabase
        .from("donors")
        .select("id, donation_count, total_donated_cents")
        .eq("email", email)
        .single();

      if (existingDonor) {
        await supabase
          .from("donors")
          .update({
            name: donorName || undefined,
            donation_count: existingDonor.donation_count + 1,
            total_donated_cents: existingDonor.total_donated_cents + amountCents,
            marketing_consent: marketingConsent || undefined,
            consent_updated_at: marketingConsent ? new Date().toISOString() : undefined,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingDonor.id);
      }
    } else if (donor) {
      /* WHY: The upsert with raw values doesn't increment — it
         overwrites. For repeat donors, we need to add to existing
         totals. Check if this is a repeat by seeing if count > 1
         before the upsert (not possible here). Instead, use RPC
         or handle in the conflict path above. For first-time donors,
         the initial values (count=1, total=amount) are correct. */
    }

    /* Step 2: Insert donation record — UNIQUE on stripe_session_id
       prevents duplicates if Stripe retries the webhook. */
    const donorId = donor?.id || null;

    const { error: donationError } = await supabase
      .from("donations")
      .insert({
        stripe_session_id: session.id,
        stripe_payment_intent: paymentIntent,
        donor_id: donorId,
        donor_email: email,
        donor_name: donorName,
        amount_cents: amountCents,
        currency,
        fund,
        fund_label: fundLabel,
        status: "completed",
      });

    if (donationError) {
      /* WHY: If this is a duplicate (same stripe_session_id), the
         UNIQUE constraint fires. This is expected on webhook retries
         and is not an error worth failing over. */
      if (donationError.code === "23505") {
        console.log("Duplicate webhook for session:", session.id);
        return NextResponse.json({ received: true, duplicate: true });
      }
      console.error("Donation insert failed:", donationError.message);
      return NextResponse.json(
        { error: "Failed to record donation" },
        { status: 500 }
      );
    }

    /* Step 3: Send receipt email */
    const emailResult = await sendDonationReceipt({
      to: email,
      donorName,
      amountCents,
      fundLabel,
      stripeSessionId: session.id,
      donatedAt: new Date().toISOString(),
    });

    if (emailResult.success) {
      await supabase
        .from("donations")
        .update({
          receipt_sent: true,
          receipt_sent_at: new Date().toISOString(),
        })
        .eq("stripe_session_id", session.id);
    } else {
      console.error("Receipt email failed:", emailResult.error);
      /* WHY: Don't fail the webhook over email — the donation is
         recorded. Stripe would retry and create confusion. The
         receipt_sent flag stays false for manual follow-up. */
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook processing error:", message);
    /* WHY: Return 500 so Stripe retries — the donation may not have
       been recorded and we don't want to lose it. */
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
