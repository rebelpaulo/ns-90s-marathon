import type { Metadata, Viewport } from "next";
import "@fontsource/bungee-shade/400.css";
import "@fontsource/bungee/400.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/800.css";
import "@fontsource/vt323/400.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

const title = "The 90's Marathon · Revenge of the 90s";
const description =
  "O team building mais caótico e divertido, desenhado pela equipa da Revenge of the 90s. 11 de dezembro de 2026 · MYRIAD by SANA Hotel.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_PT",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The 90's Marathon — Revenge of the 90s" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0f0a24",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
