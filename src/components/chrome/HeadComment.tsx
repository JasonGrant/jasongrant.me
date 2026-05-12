import { site } from "@/content/site";

if (site.buildCredit.headComment.includes("-->")) {
  throw new Error("site.buildCredit.headComment contains '-->' which would break the HTML comment");
}

const COMMENT_HTML = `<!--\n  ${site.buildCredit.headComment.replace(/\n/g, "\n  ")}\n-->`;

export function HeadComment() {
  return (
    <script
      type="text/html"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit a verbatim HTML comment at the top of <head> per FR-080
      dangerouslySetInnerHTML={{ __html: COMMENT_HTML }}
    />
  );
}
