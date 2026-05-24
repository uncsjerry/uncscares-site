# UNCS Cares Foundation Website — Architecture

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
| Domain      | uncscares.org               | —       |

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — global metadata, fonts, header/footer
│   ├── page.tsx            # Homepage — hero, drives grid, stats, CEO quote
│   ├── about/              # Mission, history, what makes us different
│   ├── backpack-drive/     # Dedicated landing page for Back to School campaign
│   ├── contact/            # Contact form (sends via API route)
│   ├── donate/             # Donation flow — fund selector → Stripe Checkout
│   │   ├── page.tsx        # Client component — fund selection + checkout
│   │   ├── layout.tsx      # Donate page metadata
│   │   ├── success/        # Post-checkout thank you page
│   │   └── cancel/         # Checkout cancellation page
│   ├── drives/             # All 7 annual drives listed
│   ├── privacy/            # Privacy policy (static)
│   ├── refund-policy/      # Refund policy (static)
│   ├── terms/              # Terms & conditions (static)
│   └── api/
│       ├── checkout/       # POST — creates Stripe Checkout session
│       ├── contact/        # POST — processes contact form submissions
│       └── webhooks/
│           └── stripe/     # Stripe webhook — logs donations to Supabase, sends receipt email
├── components/
│   ├── Header.tsx          # Site header with navigation
│   └── Footer.tsx          # Site footer with links, EIN, tagline
└── lib/
    ├── email.ts            # Tax receipt email template + send function (Resend)
    ├── rate-limit.ts       # In-memory rate limiter (10 req/min per IP)
    ├── stripe-webhook.ts   # Stripe webhook signature verification + event handling
    └── supabase.ts         # Supabase client initialization
```

## Data Flow

### Donation Flow
1. User selects fund + amount on `/donate` (client component)
2. Client POSTs to `/api/checkout` with fund and amount
3. API route creates a Stripe Checkout Session and returns the URL
4. User completes payment on Stripe-hosted checkout
5. Stripe fires `checkout.session.completed` webhook to `/api/webhooks/stripe`
6. Webhook handler:
   - Verifies Stripe signature
   - Logs donation to Supabase `donations` table
   - Sends tax receipt email via Resend
7. User is redirected to `/donate/success`

### Contact Form
1. User fills form on `/contact`
2. Client POSTs to `/api/contact`
3. API route sends notification (details in endpoint)

## Security

| Layer | Implementation | Location |
|-------|---------------|----------|
| Bot protection | Honeypot field on donate + contact forms | Forms + API routes |
| Rate limiting | In-memory, 10 req/min per IP | `src/lib/rate-limit.ts` |
| Origin validation | Allowlist: uncscares.org, www.uncscares.org | API routes |
| Security headers | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy | `next.config.ts` |
| Webhook auth | HMAC-SHA256 signature + 5-min timestamp replay protection | `src/lib/stripe-webhook.ts` |
| Database access | RLS enabled, no public policies (service role only) | Supabase |
| XSS prevention | HTML entity escaping on all user input in email templates | `src/app/api/contact/route.ts` |
| Secrets | Server-side only (`process.env.*`), never `NEXT_PUBLIC_` for secrets | `.env.local` / Vercel |

## Brand

- **Primary color:** Teal (`teal-700` / `teal-900`)
- **Accent color:** Gold (`gold-400` / `gold-500`)
- **Warm background:** `warm-50`
- **Font:** Inter (via `next/font`)
- **Logo:** `/public/images/logo/` — white and color variants

## Environment Variables

| Variable                         | Purpose                          |
|----------------------------------|----------------------------------|
| `STRIPE_SECRET_KEY`              | Stripe API key (server-side)     |
| `STRIPE_WEBHOOK_SECRET`          | Stripe webhook signature secret  |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client) |
| `SUPABASE_URL`                   | Supabase project URL             |
| `SUPABASE_SERVICE_ROLE_KEY`      | Supabase service role key        |
| `RESEND_API_KEY`                 | Resend transactional email key   |
| `CONTACT_EMAIL`                  | Recipient for contact form       |

## Deployment

- **CI/CD:** Vercel auto-deploys on push to `main`
- **Preview:** Every PR gets a Vercel preview deployment
- **Build:** `next build` (static generation for most pages, dynamic for API routes)
- **Branch strategy:** Feature branches → squash merge to `main` via PR with CI checks
