import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zapnio ERP - Enterprise Resource Planning Platform",
  description: "Modern, intuitive ERP platform for growing businesses. Manage leads, track sales pipeline, automate campaigns, and scale your operations.",
  keywords: ["ERP", "CRM", "Sales", "Lead Management", "Business Software", "SaaS", "Enterprise Software"],
  authors: [{ name: "Zapnio Team" }],
  creator: "Zapnio",
  publisher: "Zapnio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zapnio-erp.vercel.app",
    title: "Zapnio ERP - Enterprise Resource Planning Platform",
    description: "Modern, intuitive ERP platform for growing businesses",
    siteName: "Zapnio ERP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zapnio ERP - Enterprise Resource Planning Platform",
    description: "Modern, intuitive ERP platform for growing businesses",
    creator: "@zapnio",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5b7aff" },
    { media: "(prefers-color-scheme: dark)", color: "#4c5cf5" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
