import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DyslexiaFont.org - Personalized Font Optimization",
  description:
    "Discover your optimal reading configuration through guided testing. Get a custom font file personalized for your unique visual processing.",
  keywords: ["dyslexia", "font", "accessibility", "reading", "typography"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
