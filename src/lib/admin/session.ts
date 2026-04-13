// ─── Lightweight admin session (signed cookie, no DB) ──────────────────────
//
// We sign an `expiry.hmac` token using HMAC-SHA256 keyed on ADMIN_PASSWORD.
// No user accounts — just a shared password. The cookie is httpOnly and
// expires after 24h. If ADMIN_PASSWORD rotates, all existing sessions
// invalidate automatically.

import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "sw_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24; // 24h

function secret(): string {
  return process.env.ADMIN_PASSWORD || "";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expiry = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expiry);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  if (!secret()) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = sign(payload);
  let equal = false;
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    equal = timingSafeEqual(a, b);
  } catch {
    return false;
  }
  if (!equal) return false;

  const expiry = Number(payload);
  if (!Number.isFinite(expiry)) return false;
  return expiry > Date.now();
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_SECONDS;
