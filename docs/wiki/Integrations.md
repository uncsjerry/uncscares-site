# Integrations

## Stripe (Payments)

- **Purpose:** Donation checkout
- **Flow:** Client → `/api/checkout` → Stripe Checkout Session → webhook
- **Webhook endpoint:** `/api/webhooks/stripe`
- **Events handled:** `checkout.session.completed`
- **Config:** API keys + webhook secret in Vercel env vars

## Supabase (Database)

- **Purpose:** Donation tracking
- **Table:** `donations` — logs each completed donation (amount, fund, email, Stripe session ID)
- **Auth:** Service role key (server-side only)

## Resend (Email)

- **Purpose:** Transactional tax receipt emails
- **Template:** Inline HTML in `src/lib/email.ts`
- **Trigger:** Stripe webhook fires after successful donation
- **Content:** Donation amount, fund name, date, EIN for tax records
