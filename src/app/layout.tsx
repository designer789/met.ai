import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Met.AI",
  description: "Decentralized AI infrastructure for cross-agent collaboration",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased bg-zinc-900 text-zinc-100`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
