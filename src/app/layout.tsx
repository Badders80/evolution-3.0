import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/brand.css";
import { NavBar } from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Evolution Stables - Where Excellence Meets Tradition",
  description: "Experience the finest in equestrian training, breeding, and care. Our commitment to excellence spans generations.",
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
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen bg-background text-foreground antialiased">
          {children}
          <NavBar />
        </body>
      </html>
    </ClerkProvider>
  );
}