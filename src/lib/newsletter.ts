import type { NewsletterSubmitResult } from "@/types/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSubdomain(): string {
  return process.env.NEXT_PUBLIC_SUBSTACK_SUBDOMAIN || "mrjasongrant";
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubmitResult> {
  const trimmed = email.trim();
  if (!trimmed) {
    return { state: "validation-error", reason: "empty" };
  }
  if (!EMAIL_RE.test(trimmed)) {
    return { state: "validation-error", reason: "invalid-format" };
  }

  try {
    const fd = new FormData();
    fd.append("email", trimmed);
    if (typeof window !== "undefined") {
      fd.append("first_referrer", window.location.href);
    }
    await fetch(`https://${getSubdomain()}.substack.com/api/v1/free`, {
      method: "POST",
      mode: "no-cors",
      body: fd,
    });
    return { state: "ok" };
  } catch (err) {
    return {
      state: "network-error",
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
