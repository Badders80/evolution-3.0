import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/brand.css";
import { NavBar } from "@/components/NavBar";
import SupabaseProvider from "@/providers/supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evolution Stables - Where Excellence Meets Tradition",
  description: "Experience the finest in equestrian training, breeding, and care. Our commitment to excellence spans generations.",
  icons: {
    icon: '/images/favicon.svg',
    shortcut: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="preload"
          href="/fonts/GeistSans-VFItalic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <SupabaseProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
