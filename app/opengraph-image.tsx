import { ImageResponse } from "next/og";
import { profile, seo } from "@/data/resume";

export const runtime = "edge";
export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamically generated social share card — no static asset to maintain. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1100px circle at 20% -10%, #171717 0%, #0A0A0A 55%)",
          padding: 80,
          color: "#EDEDED",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: -1,
              color: "#EDEDED",
              background: "#141414",
              border: "1px solid #333333",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 26, color: "#8F8F8F" }}>{profile.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2.5 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 40, fontWeight: 500, color: "#4D6FE0" }}>
            {profile.title}
          </div>
          <div style={{ fontSize: 28, color: "#8F8F8F", maxWidth: 900 }}>
            {profile.bioShort}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 24,
            color: "#71717a",
          }}
        >
          <span>github.com/vaibhav449</span>
          <span>·</span>
          <span>{profile.email}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
