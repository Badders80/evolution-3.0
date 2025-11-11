'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import type { Database } from '@/lib/database.types';

export default function EmailMagicLinkForm() {
  const supabase = useMemo(
    () =>
      createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ),
    []
  );

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleSendMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Enter the email you use for your Evolution account.');
      return;
    }

    setStatus('sending');
    setMessage(null);

    try {
      const emailRedirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo },
      });

      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }

      setStatus('sent');
      setMessage('Magic link sent. Check your inbox or spam folder.');
      setEmail('');
    } catch (err) {
      console.error('Magic link error:', err);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 text-left">
      <form onSubmit={handleSendMagicLink} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="name@email.com"
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-lg bg-white px-6 py-3 font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {status === 'sending' ? 'Sending…' : 'Email link'}
        </button>
      </form>

      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-300' : 'text-white/80'}`}>{message}</p>
      )}

      <p className="text-sm text-white/60">
        Prefer to use a password?{' '}
        <Link href="/auth" className="font-medium text-white underline underline-offset-4">
          Open the full sign-in page
        </Link>
        .
      </p>
    </div>
  );
}
