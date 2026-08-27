import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer, Header } from "./ui";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SITE_SOCIAL_IMAGE } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL + "/",
    type: "website",
    images: [
      {
        url: SITE_URL + SITE_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Axodus institutional social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_URL + SITE_SOCIAL_IMAGE],
  },
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
