# UNCS Cares Foundation Website — Status

**Last updated:** 2026-05-22

## Current State: LIVE

- **URL:** https://uncscares.org
- **Hosting:** Vercel (auto-deploy from `main`)
- **Repo:** https://github.com/uncsjerry/uncscares-site (private)
- **Framework:** Next.js 16 + React 19 + Tailwind CSS 4

## Active Campaign

- **Back to School Backpack Drive 2026** — featured on homepage hero and dedicated `/backpack-drive` landing page

## Recent Changes

| Date       | Change                                               | PR  |
|------------|------------------------------------------------------|-----|
| 2026-05-22 | Security hardening: honeypot bot protection, rate limiting, security headers, origin validation, info disclosure fix | — |
| 2026-04-25 | Removed all geographic references site-wide          | #9  |
| 2026-04-25 | Removed geographic references from backpack-drive    | #8  |
| 2026-04-24 | Removed donation-to-supplies line from all pages     | #7  |
| 2026-04-24 | Removed "personally pack every backpack" claim       | #6  |
| 2026-04-24 | Removed breaking news bar from hero                  | #5  |
| 2026-04-23 | Added official logo, favicon, redesigned hero        | #4  |

## Integrations

| Service        | Purpose                       | Status  |
|----------------|-------------------------------|---------|
| Stripe         | Donation checkout             | Active  |
| Supabase       | Donation tracking / data      | Active  |
| Resend         | Tax receipt emails            | Active  |
| Vercel         | Hosting + CI/CD               | Active  |

## Security

- Honeypot bot protection on donation + contact forms
- In-memory rate limiting (10 req/min per IP) on all API endpoints
- Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Origin validation on checkout + contact API routes
- Supabase RLS enabled on all tables (no public access policies — service role only)
- Stripe webhook signature verification with 5-min replay protection

## Known Issues

- None at this time.

## Next Steps

- Seasonal campaign updates as drive dates approach
- Potential addition of volunteer sign-up form
- Photo gallery from past drives (pending real photos)
