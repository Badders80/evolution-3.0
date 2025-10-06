'use client';

import { createBrowserClient } from '@supabase/ssr';
import { FaGoogle } from 'react-icons/fa';

export default function GoogleSignInButton() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Sign-in error:', error.message);
      // Consider using a toast notification here instead of alert
      alert(`Sign in failed: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
    >
      <FaGoogle className="text-blue-500" />
      Continue with Google
    </button>
  );
}
