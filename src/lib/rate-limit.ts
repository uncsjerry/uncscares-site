/* WHY: Simple in-memory rate limiter for serverless API routes.
   Vercel spins up fresh instances, so each instance has its own map —
   this is a best-effort defense, not a hard guarantee. For a nonprofit
   donation site, this is sufficient to block casual abuse and card
   testing attacks without adding external dependencies like Redis. */

const WINDOW_MS = 60_000; // 1-minute sliding window
const MAX_REQUESTS = 10; // 10 requests per IP per minute — generous for real users

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/* WHY: Periodic cleanup prevents unbounded memory growth if the
   serverless instance stays warm for a long time. */
const CLEANUP_INTERVAL_MS = 300_000; // 5 minutes
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  cleanup();

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  return { allowed: true, retryAfterMs: 0 };
}
