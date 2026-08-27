import type { Metadata } from "next";

export const SITE_NAME = "Axodus";
export const SITE_URL = "https://axodus.country";
export const SITE_TITLE = "Axodus — Research-driven AI-native organizational platforms";
export const SITE_DESCRIPTION =
  "Axodus is a research-driven initiative developing a proposed ecosystem of interoperable, AI-native organizational platforms for governed knowledge, institutional workflows, and digital services.";
export const SITE_SOCIAL_IMAGE = "/axodus-social.svg";

export const OFFICIAL_SAME_AS = [
  "https://github.com/axodus/",
  "https://github.com/Axodus/Institutional",
  "https://docs.axodus.country/",
  "https://axodus.medium.com/",
  "https://axodus.substack.com/",
  "https://axodus.notion.site/Axodus-39355b1b6c9880f884ade5ce28b4dc6d",
] as const;

export function axodusJsonLd(pageName: string, pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ResearchOrganization",
        "@id": SITE_URL + "/#organization",
        name: SITE_NAME,
        url: SITE_URL + "/",
        description: SITE_DESCRIPTION,
        sameAs: [...OFFICIAL_SAME_AS],
      },
      {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        url: SITE_URL + "/",
        name: SITE_NAME,
        publisher: {
          "@id": SITE_URL + "/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": SITE_URL + pagePath + "#webpage",
        url: SITE_URL + pagePath,
        name: pageName,
        isPartOf: {
          "@id": SITE_URL + "/#website",
        },
        about: {
          "@id": SITE_URL + "/#organization",
        },
      },
    ],
  };
}

export function structuredData(pageName: string, pagePath: string) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(axodusJsonLd(pageName, pagePath)),
      }}
    />
  );
}

export function createPageMetadata(options: {
  title: string;
  description: string;
  pathname: string;
  index?: boolean;
}): Metadata {
  const canonical = SITE_URL + options.pathname;
  const isIndexable = options.index ?? true;

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical },
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonical,
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
      title: options.title,
      description: options.description,
      images: [SITE_URL + SITE_SOCIAL_IMAGE],
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
