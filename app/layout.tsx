import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zapnio ERP - Enterprise Resource Planning Platform",
  description: "Modern, intuitive ERP platform for growing businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
