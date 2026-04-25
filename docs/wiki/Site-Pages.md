# Site Pages

All public-facing pages on [uncscares.org](https://uncscares.org).

| Path              | Page                    | Type    | Description                                          |
|-------------------|-------------------------|---------|------------------------------------------------------|
| `/`               | Homepage                | Static  | Hero (Back to School 2026), stats, drives grid, CEO quote, CTA |
| `/about`          | About Us                | Static  | Mission, history, what makes us different, programs   |
| `/backpack-drive` | Back to School Drive    | Static  | Dedicated campaign landing page for Backpack Drive    |
| `/drives`         | Annual Drives           | Static  | All 7 drives with descriptions, photos, donate links  |
| `/donate`         | Make a Donation         | Dynamic | Fund selector → Stripe Checkout                       |
| `/donate/success` | Thank You               | Static  | Post-checkout confirmation                             |
| `/donate/cancel`  | Donation Cancelled      | Static  | Checkout cancellation message                          |
| `/contact`        | Contact Us              | Dynamic | Contact form (name, email, message)                    |
| `/privacy`        | Privacy Policy          | Static  | Data collection & usage policy                         |
| `/terms`          | Terms & Conditions      | Static  | Legal terms of use                                     |
| `/refund-policy`  | Refund Policy           | Static  | Donation refund policy                                 |

## API Routes

| Endpoint                  | Method | Purpose                                    |
|---------------------------|--------|--------------------------------------------|
| `/api/checkout`           | POST   | Creates Stripe Checkout session            |
| `/api/contact`            | POST   | Processes contact form submission          |
| `/api/webhooks/stripe`    | POST   | Stripe webhook — logs donation, sends receipt |
