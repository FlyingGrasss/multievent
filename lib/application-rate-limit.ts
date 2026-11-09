import { APPLICATION_LIMITS } from "@/lib/application-form";

type Bucket = { count: number; resetAt: number };

const globalForRateLimit = globalThis as unknown as {
  applicationRateLimitBuckets?: Map<string, Bucket>;
};

const buckets = globalForRateLimit.applicationRateLimitBuckets ?? new Map<string, Bucket>();

if (process.env.NODE_ENV !== "production") {
  globalForRateLimit.applicationRateLimitBuckets = buckets;
}

function prune(now: number) {
  if (buckets.size < 1000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function consumeApplicationRateLimit(key: string, now = Date.now()) {
  return consume(key, APPLICATION_LIMITS.rateLimitMax, now);
}

export function consumeApplicationPhotoRateLimit(key: string, now = Date.now()) {
  return consume(`photo:${key}`, 8, now);
}

function consume(key: string, max: number, now: number) {
  prune(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + APPLICATION_LIMITS.rateLimitWindowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (bucket.count >= max) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
