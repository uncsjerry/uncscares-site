import { createHmac, timingSafeEqual } from "crypto";

/* WHY: Manual HMAC-SHA256 verification instead of the Stripe SDK.
   Keeps the fetch-based, no-SDK pattern used throughout this project
   and avoids the SDK's HTTP client issues in Vercel serverless. */

const TOLERANCE_SECONDS = 300; // 5 minutes — reject stale webhooks to prevent replay attacks

interface VerificationResult {
  valid: boolean;
  error?: string;
}

export function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
): VerificationResult {
  const parts = signatureHeader.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
  const signature = parts.find((p) => p.startsWith("v1="))?.slice(3);

  if (!timestamp || !signature) {
    return { valid: false, error: "Missing timestamp or signature in header" };
  }

  const ts = parseInt(timestamp, 10);
  const age = Math.floor(Date.now() / 1000) - ts;
  if (age > TOLERANCE_SECONDS) {
    return { valid: false, error: `Webhook too old (${age}s > ${TOLERANCE_SECONDS}s)` };
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (sigBuffer.length !== expectedBuffer.length) {
    return { valid: false, error: "Signature length mismatch" };
  }

  if (!timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false, error: "Signature mismatch" };
  }

  return { valid: true };
}
