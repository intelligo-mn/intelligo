/**
 * Load on /api/chat against a local production build of apps/app on the
 * stub model (empty GOOGLE_GENERATIVE_AI_API_KEY, EMAIL_PROVIDER=console):
 *
 *   k6 run -e BASE_URL=http://localhost:4002 scripts/load/chat.k6.js
 *
 * Options, each through `-e`:
 *   VUS       virtual users, default 20
 *   PACE      seconds between one user's turns, default 8
 *   SPOOF_IP  1 sends a per-user X-Forwarded-For, so Better-Auth's
 *             per-address limits apply to each user rather than the run
 *
 * Each VU signs up its own account, so one workspace's limits (10 turns
 * a minute, 30 messages a month on the free plan) bound one VU, not the
 * run; a VU stops after 25 turns. Users start four seconds apart,
 * under sign-up's limit of three per ten seconds from one address, and
 * a refused sign-up waits and tries again. It creates accounts and
 * spends credits: never point it at a deployment with a provider key
 * or a real mail provider.
 *
 * Checks: every turn answers 200, its stream reaches the finish frame,
 * and the stub echoes the turn's marker back. A 429 or a 402 from
 * /api/chat fails the run through its own counter. Latency is reported
 * as chat_ttfb and chat_duration and not gated.
 */
import http from "k6/http";
import { check, sleep } from "k6";
import { randomBytes } from "k6/crypto";
import { Counter, Trend } from "k6/metrics";

const BASE_URL = __ENV.BASE_URL || "http://localhost:4002";
const VUS = Number(__ENV.VUS || 20);
const PACE = Number(__ENV.PACE || 8);
const SPOOF_IP = __ENV.SPOOF_IP === "1";
const SIGN_UP_ATTEMPTS = 5;
/** Under the free plan's 30 messages a month, so no account runs out. */
const MAX_TURNS = 25;

const chatTtfb = new Trend("chat_ttfb", true);
const chatDuration = new Trend("chat_duration", true);
const rateLimited = new Counter("chat_429");
const refused = new Counter("chat_402");

export const options = {
  scenarios: {
    chat: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: `${VUS * 4}s`, target: VUS },
        { duration: "2m", target: VUS },
        { duration: "20s", target: 0 },
      ],
      gracefulRampDown: "30s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
    chat_429: ["count==0"],
    chat_402: ["count==0"],
  },
};

/** RFC 4122 v4 from k6's own random source, with no remote import. */
function uuid() {
  const b = new Uint8Array(randomBytes(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function baseHeaders() {
  const headers = { "Content-Type": "application/json", Origin: BASE_URL };
  if (SPOOF_IP) headers["X-Forwarded-For"] = `10.0.${__VU % 250}.1`;
  return headers;
}

/**
 * The session cookie, sent by hand: a Secure cookie set over
 * http://localhost would never leave k6's jar.
 */
let cookie = null;

function signUp() {
  const email = `load+${__VU}-${Date.now()}@example.com`;
  for (let attempt = 1; attempt <= SIGN_UP_ATTEMPTS; attempt++) {
    const res = http.post(
      `${BASE_URL}/api/auth/sign-up/email`,
      JSON.stringify({
        name: `Load ${__VU}`,
        email,
        password: "Load-Test-Password-0",
      }),
      {
        headers: baseHeaders(),
        // A rate-limited sign-up is retried below, not a failed request.
        responseCallback: http.expectedStatuses(200, 429),
      }
    );
    if (res.status === 429 && attempt < SIGN_UP_ATTEMPTS) {
      sleep(Number(res.headers["X-Retry-After"] || 10));
      continue;
    }
    check(res, { "sign-up 200": (r) => r.status === 200 });
    cookie = Object.entries(res.cookies)
      .map(([name, values]) => `${name}=${values[0].value}`)
      .join("; ");
    return;
  }
}

export default function () {
  if (!cookie) signUp();
  if (__ITER >= MAX_TURNS) {
    sleep(PACE);
    return;
  }

  // One word: the stub streams one text-delta per word, so the marker
  // arrives whole in a single frame.
  const marker = `lt-${__VU}-${__ITER}-${uuid().slice(0, 8)}`;
  const res = http.post(
    `${BASE_URL}/api/chat`,
    JSON.stringify({
      id: uuid(),
      trigger: "submit-message",
      messages: [
        { id: uuid(), role: "user", parts: [{ type: "text", text: marker }] },
      ],
    }),
    { headers: { ...baseHeaders(), Cookie: cookie }, timeout: "60s" }
  );
  if (res.status === 429) rateLimited.add(1);
  if (res.status === 402) refused.add(1);
  chatTtfb.add(res.timings.waiting);
  chatDuration.add(res.timings.duration);
  const body = typeof res.body === "string" ? res.body : "";
  check(res, {
    "chat 200": (r) => r.status === 200,
    "stream finished": () => body.includes('"type":"finish"'),
    "stub echoed the marker": () => body.includes(marker),
  });
  sleep(PACE);
}
