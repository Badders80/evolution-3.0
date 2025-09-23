import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/brand.css";
import "../styles/brand.light.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evolution Stables - Where Excellence Meets Tradition",
  description: "Experience the finest in equestrian training, breeding, and care. Our commitment to excellence spans generations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}