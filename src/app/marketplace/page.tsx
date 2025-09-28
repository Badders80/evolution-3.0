'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function MarketplacePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in?redirect_url=' + encodeURIComponent('/marketplace'));
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Video */}
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/Jockey-walk-out.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-brand-gold">Marketplace</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Discover and own digital assets in the Evolution Stables ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* Information Hub */}
      <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-medium mb-6">Ownership Dashboard</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Manage your digital assets and track your portfolio in one place.
              More features coming soon.
            </p>
            <div className="space-y-6">
              <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold text-brand-gold mb-2">Your Collection</h3>
                <p className="text-gray-400">Coming soon</p>
              </div>
              <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold text-brand-gold mb-2">Transaction History</h3>
                <p className="text-gray-400">Coming soon</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="/images/Gemini_Generated_Image_r4hnnzr4hnnzr4.jpg" 
              alt="Digital Ownership"
              className="w-full h-auto rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-medium mb-2">Information Hub</h3>
                <p className="text-gray-300">Stay updated with the latest news and updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}