'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Store the current URL to redirect back after login
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    // Show a loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-black border border-white/10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    // Show a loading state while redirecting
    return (
      <div className="min-h-screen flex items-center justify-center bg-black border border-white/10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  return <>{children}</>;
}
