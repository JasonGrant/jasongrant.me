import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 } as const;

type Page = "home" | "experience" | "writing" | "colophon";

const COPY: Record<Page, { display: string; sub: string }> = {
  home: {
    display: "I'm a design leader who ships production code.",
    sub: "Hi Marley · Hypoth · Designing Forward",
  },
  experience: {
    display: "Experience",
    sub: "Hi Marley · Hypoth · Klaviyo · Vertex",
  },
  writing: {
    display: "Writing",
    sub: "Designing Forward on Substack",
  },
  colophon: {
    display: "Colophon",
    sub: "Petrona · Funnel Sans · DM Mono · Next.js",
  },
};

function parsePage(value: string | null): Page {
  if (value === "experience" || value === "writing" || value === "colophon") {
    return value;
  }
  return "home";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parsePage(searchParams.get("page"));
  const copy = COPY[page];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#15120D",
        color: "#ECE3CF",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 22,
          letterSpacing: "0.04em",
          color: "#A39C8B",
        }}
      >
        jasongrant.me
      </div>
      <div
        style={{
          fontFamily: "serif",
          fontStyle: "italic",
          fontSize: 76,
          lineHeight: 1.05,
          letterSpacing: "-0.015em",
          color: "#ECE3CF",
          maxWidth: 980,
          display: "flex",
        }}
      >
        {copy.display}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: 20,
          letterSpacing: "0.04em",
          color: "#A39C8B",
        }}
      >
        <div>{copy.sub}</div>
        <div style={{ color: "oklch(0.78 0.10 195)" }}>Jason Grant</div>
      </div>
    </div>,
    SIZE,
  );
}
