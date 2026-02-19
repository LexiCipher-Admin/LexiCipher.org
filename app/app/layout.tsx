import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LexiCipher.org - Personalized Font Optimization",
  description:
    "Discover your optimal reading configuration through guided testing. Get a custom font file personalized for your unique visual processing.",
  keywords: ["dyslexia", "font", "accessibility", "reading", "typography", "lexicipher"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LexiCipher",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <header className="w-full flex justify-center pt-6 pb-0 px-6 bg-cream">
          <Link href="/" className="flex flex-col items-center gap-1 hover:opacity-90 transition-opacity">
            <Image
              src="/logo-stacked.svg"
              alt="LexiCipher.org — Fonts for Dyslexic Reading"
              width={240}
              height={240}
              priority
            />
          </Link>
        </header>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
