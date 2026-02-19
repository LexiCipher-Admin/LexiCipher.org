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
        <header className="w-full flex justify-center pt-6 pb-2 px-6 bg-cream">
          <Link href="/" className="flex flex-col items-center gap-2 hover:opacity-90 transition-opacity">
            <Image
              src="/logo-icon.svg"
              alt="LexiCipher owl logo"
              width={200}
              height={200}
              priority
            />
            <div className="text-center leading-tight">
              <span className="text-4xl md:text-5xl font-bold" style={{ color: '#1E3A5F' }}>Lexi</span>
              <span className="text-4xl md:text-5xl font-bold" style={{ color: '#C0392B' }}>Cipher</span>
              <span className="text-2xl md:text-3xl font-bold" style={{ color: '#1E3A5F' }}>.org</span>
            </div>
            <p className="text-xs tracking-widest font-semibold uppercase" style={{ color: '#1E3A5F' }}>Fonts for Dyslexic Reading</p>
          </Link>
        </header>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
