import { createHash } from "node:crypto";

// Ask Jason widget, private mode (feature 009). In "private" the public sees no
// widget and a browser holding Jason's preview key sees it (see
// src/components/ask/keyGate.ts). Only the SHA-256 digest of the key reaches the
// client, here, at build time; the secret itself is read from the environment, never
// committed, never logged and never put in the bundle. Rotating the variable and
// redeploying makes every previously armed browser stop matching.
const env = {};
if (process.env.NEXT_PUBLIC_ASK_JASON === "private") {
  const secret = process.env.ASK_JASON_PREVIEW_SECRET ?? "";
  if (secret.length < 32) {
    throw new Error(
      "ASK_JASON_PREVIEW_SECRET is required in private mode (at least 32 characters)",
    );
  }
  env.NEXT_PUBLIC_ASK_JASON_KEY_HASH = createHash("sha256").update(secret).digest("hex");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
    optimizeCss: true,
  },
  env,
};

export default nextConfig;
