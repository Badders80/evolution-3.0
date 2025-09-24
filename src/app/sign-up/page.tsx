'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <SignUp 
        path="/sign-up" 
        routing="path" 
        signInUrl="/sign-in"
        redirectUrl={redirectUrl}
      />
    </div>
  );
}
