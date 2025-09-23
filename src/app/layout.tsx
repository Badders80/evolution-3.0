import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/brand.css";

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
    <html lang="en" className="dark">
      <body className="font-sans text-gray-100 antialiased">{children}</body>
    </html>
  );
}
