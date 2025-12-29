import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import { Toaster } from "@/components/ui/sonner";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Emall Manjeri - World Class Shopping & Business Destination",
    template: "%s | Emall Manjeri",
  },
  description: "Emall Manjeri is a modern commercial destination bringing together retail, food, entertainment, and professional workspaces. Explore available rooms, business centres, events, and more at Manjeri's premier shopping and business hub.",
  keywords: ["Emall Manjeri", "Shopping Mall Manjeri", "Commercial Spaces Manjeri", "Business Centre Manjeri", "Retail Spaces Kerala", "Emal Manjeri", "Shopping Destination Malappuram"],
  authors: [{ name: "Emal Manjeri Global LLP" }],
  creator: "Emal Manjeri Global LLP",
  publisher: "Emal Manjeri Global LLP",
  metadataBase: new URL("https://emalmanjeri.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://emalmanjeri.com",
    siteName: "Emall Manjeri",
    title: "Emall Manjeri - World Class Shopping & Business Destination",
    description: "A modern commercial destination bringing together retail, food, entertainment, and professional workspaces in Manjeri, Kerala.",
    images: [
      {
        url: "/emall main 1.jpeg",
        width: 1200,
        height: 630,
        alt: "Emall Manjeri - Commercial Destination",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emall Manjeri - World Class Shopping & Business Destination",
    description: "A modern commercial destination bringing together retail, food, entertainment, and professional workspaces in Manjeri, Kerala.",
    images: ["/emall main 1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <FloatingWhatsApp />
        <VisualEditsMessenger />
        <Toaster />
      </body>
    </html>
  );
}
