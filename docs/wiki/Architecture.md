# Architecture

## Stack

| Layer       | Technology                  | Version |
|-------------|-----------------------------|---------|
| Framework   | Next.js (App Router)        | 16.2.4  |
| UI          | React                       | 19.2.4  |
| Styling     | Tailwind CSS                | 4.x     |
| Payments    | Stripe Checkout             | 22.x   |
| Database    | Supabase (PostgreSQL)       | 2.x     |
| Email       | Resend (transactional)      | —       |
| Hosting     | Vercel                      | —       |

## Directory Layout

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — global metadata, fonts, header/footer
│   ├── page.tsx            # Homepage
│   ├── about/              # Mission & history
│   ├── backpack-drive/     # Back to School campaign landing page
│   ├── contact/            # Contact form
│   ├── donate/             # Donation flow (fund select → Stripe → success)
│   ├── drives/             # All 7 annual drives
│   ├── privacy/            # Privacy policy
│   ├── refund-policy/      # Refund policy
│   ├── terms/              # Terms & conditions
│   └── api/
│       ├── checkout/       # Creates Stripe Checkout session
│       ├── contact/        # Contact form handler
│       └── webhooks/stripe # Stripe webhook → Supabase + Resend
├── components/
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Site footer
└── lib/
    ├── email.ts            # Receipt email template (Resend)
    ├── stripe-webhook.ts   # Webhook verification
    └── supabase.ts         # Supabase client
```

## Donation Data Flow

1. User selects fund + amount → `/donate`
2. Client POSTs to `/api/checkout`
3. Stripe Checkout Session created → user redirected to Stripe
4. Payment completes → Stripe webhook fires to `/api/webhooks/stripe`
5. Webhook logs to Supabase `donations` table + sends receipt via Resend
6. User redirected to `/donate/success`

## Environment Variables

| Variable                              | Purpose                          |
|---------------------------------------|----------------------------------|
| `STRIPE_SECRET_KEY`                   | Stripe API key (server)          |
| `STRIPE_WEBHOOK_SECRET`               | Webhook signature verification   |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`  | Stripe key (client)              |
| `SUPABASE_URL`                        | Supabase project URL             |
| `SUPABASE_SERVICE_ROLE_KEY`           | Supabase service role key        |
| `RESEND_API_KEY`                      | Resend email API key             |
| `CONTACT_EMAIL`                       | Contact form recipient           |
