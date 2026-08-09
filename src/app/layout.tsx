import type { Metadata } from "next";
import Script from "next/script";
import "../styles/tokens.css";
import { ThemeProvider } from "../lib/theme";
import { TrustProvider } from "../lib/trust";

import { Nav } from "../components/layout/Nav";
import { SiteFooter } from "../components/layout/SiteFooter";
import { CursorRing } from "../components/CursorRing";
import { AmbientLayer } from "../components/ambient/AmbientLayer";
import { CommandPalette } from "../components/CommandPalette";
import { BootSequence } from "../components/BootSequence";
import { ShieldOverlay } from "../components/Shield";
import { VerifySweep } from "../components/VerifySweep";
import { HelpOverlay } from "../components/HelpOverlay";

export const metadata: Metadata = {
  title: "Venziq | Black Box Recorder for Enterprise AI Agents",
  description:
    "Venziq is a plug-and-play AI trust connector that creates tamper-proof audit trails for autonomous agents using cryptographic proofs and secure verification.",
  keywords:
    "AI black box recorder, AI trust infrastructure, tamper-proof AI audit trails, AI agent monitoring, AI accountability platform, LangChain audit logging, verifiable AI execution, AI provenance",
  authors: [{ name: "Venziq Technologies" }],
  metadataBase: new URL("https://venziq.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://venziq.com/",
    title: "Venziq | Black Box Recorder for Enterprise AI Agents",
    description:
      "Venziq is a plug-and-play AI trust connector that creates tamper-proof audit trails for autonomous agents using cryptographic proofs and secure verification.",
    siteName: "Venziq Technologies",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venziq | AI Trust Infrastructure",
    description:
      "The black box recorder for autonomous AI agents. Bring tamper-proof accountability and verifiable execution to your AI pipelines.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://venziq.com/#organization",
      name: "Venziq Technologies",
      legalName: "Venziq Technologies Private Limited",
      url: "https://venziq.com",
      logo: "https://venziq.com/logo.png",
      description:
        "Venziq is building the Trust Infrastructure Layer for AI-native enterprises. The black box recorder for autonomous AI agents.",
      founder: {
        "@type": "Person",
        name: "Keshavardhan Appikatla",
      },
      foundingDate: "2026",
      slogan: "The Black Box Recorder for AI Agents",
      keywords: "AI Trust Infrastructure, AI Governance, AI Accountability",
      industry: "Artificial Intelligence Security",
      knowsAbout: [
        "AI Trust Infrastructure",
        "AI Governance",
        "AI Security",
        "AI Provenance",
        "Agent Accountability",
        "AI Audit Trail",
        "LLM Security",
        "AI Risk Management",
      ],
      sameAs: [
        "https://www.linkedin.com/company/venziq",
        "https://github.com/venziq",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://venziq.com/#website",
      url: "https://venziq.com",
      name: "Venziq",
      description: "Black Box Recorder for Enterprise AI Agents",
      publisher: {
        "@id": "https://venziq.com/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Venziq Trust Connector",
      applicationCategory: [
        "DeveloperApplication",
        "SecurityApplication",
        "BusinessApplication",
      ],
      operatingSystem: "Cloud / API / SDK",
      description:
        "Venziq Trust Connector is AI trust infrastructure that creates tamper-proof audit trails and verifiable execution history for autonomous AI agents.",
      featureList: [
        "AI agent audit trails",
        "AI provenance tracking",
        "Cryptographic verification",
        "Merkle proof verification",
        "Tamper detection",
        "AI governance support",
      ],
      provider: {
        "@id": "https://venziq.com/#organization",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an AI black box recorder?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An AI black box recorder captures AI system activity and creates verifiable records that help organizations understand decisions, failures, and accountability.",
          },
        },
        {
          "@type": "Question",
          name: "How does AI agent auditing work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Venziq captures execution metadata, encrypts the evidence, generates content fingerprints, and anchors Merkle proofs to independent trust layers for verification.",
          },
        },
        {
          "@type": "Question",
          name: "How is Venziq different from observability platforms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI observability platforms help monitor performance. Venziq focuses on cryptographic accountability by proving AI execution records have not been modified.",
          },
        },
        {
          "@type": "Question",
          name: "Does Venziq require rebuilding existing AI agents?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Venziq works as a lightweight connector layer designed to integrate with existing AI frameworks.",
          },
        },
      ],
    },
  ],
};

const themeScript = `
  (function () {
    try {
      var stored = localStorage.getItem('venziq-theme');
      if (stored === 'light' || stored === 'dark') {
        document.documentElement.setAttribute('data-theme', stored);
      }
    } catch (e) { }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0d12" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <TrustProvider>
            <BootSequence />
            <AmbientLayer />
            <CursorRing />
            <ShieldOverlay />
            <VerifySweep />
            <HelpOverlay />
            <CommandPalette />
            <Nav />
            {children}
            <SiteFooter />
          </TrustProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
