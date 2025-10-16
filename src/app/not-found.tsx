'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="text-h1-mobile md:text-h1 mb-4 text-primary">404</h1>
      <h2 className="text-h3 mb-6 text-secondary">This page could not be found.</h2>
      <Link href="/">
        <Button variant="outline" className="text-label uppercase">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
