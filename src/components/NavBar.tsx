'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGOS } from '@/lib/assets';
import { useSupabase, useSession } from '@/providers/supabase-provider';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Our Model', href: '#digital-syndication' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'FAQ', href: '#faq' },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const { supabase } = useSupabase();
  const session: any = useSession(); // Using any as a temporary workaround
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.refresh();
      }
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setAuthError(error.message || 'Failed to sign in with Google');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    // Scroll handling
    const hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setScrolled(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '-64px 0px 0px 0px',
          threshold: 0,
        }
      );

      observer.observe(hero);
      return () => observer.disconnect();
    }

    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), 320);
    return () => window.clearTimeout(timeout);
  }, []);

  const isSolid = scrolled || isMenuOpen;
  const logoSrc = LOGOS.simple.grey;
  const linkTone = isSolid ? 'text-foreground' : 'text-muted';
  const primaryCtaBase = 'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background sm:px-5 sm:text-sm sm:tracking-[0.3em]';
  const menuButtonBase =
    'flex h-10 w-10 items-center justify-center text-foreground transition-colors duration-200 hover:text-primary focus:outline-none md:h-11 md:w-11';

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[9999] w-full transition-all duration-300 ease-out ${
        isSolid ? 'bg-background/80 text-foreground shadow-lg backdrop-blur-sm' : 'bg-background/30 text-foreground backdrop-blur-md'
      } ${visible ? 'opacity-100 translate-y-0' : '-translate-y-2 opacity-0'}`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center px-6 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <div className="relative h-7 w-auto">
              <Image
                src={logoSrc}
                alt="Evolution Stables"
                width={192}
                height={64}
                className="h-full w-auto transition-transform duration-300"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <div className="flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="group relative flex items-center"
              >
                <Link
                  href={link.href}
                  className={`inline-flex items-center whitespace-nowrap px-2 py-4 text-xs font-medium transition-colors duration-300 ${linkTone} hover:text-foreground focus:outline-none md:px-3 md:py-5 md:text-sm`}
                >
                  {link.label}
                </Link>
                <span className="absolute bottom-2 left-0 h-[1px] w-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 shadow-[0_0_4px_1px_rgba(245,158,11,0.3)] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center md:ml-0 md:flex-1 md:justify-end">
          <div className="relative">
            {session ? (
              <button
                onClick={handleSignOut}
                className={`${primaryCtaBase} mr-1 md:mr-2`}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setShowAuthForm(!showAuthForm)}
                className={`${primaryCtaBase} mr-1 md:mr-2`}
              >
                Sign In
              </button>
            )}
            {showAuthForm && (
              <div className="absolute right-0 mt-2 w-72 rounded-lg bg-white p-4 shadow-lg z-50">
                <form onSubmit={handleAuth} className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </h3>
                  {authError && (
                    <div className="text-red-500 text-sm">{authError}</div>
                  )}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
                    </button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </button>
                  </div>
                  <div className="text-sm text-center">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="font-medium text-primary hover:text-primary/80"
                    >
                      {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <button
            type="button"
            className={menuButtonBase}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-2 py-3 text-base font-medium text-foreground/90 transition-colors duration-200 hover:bg-foreground/10 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setShowAuthForm(!showAuthForm)}
                className="w-full block rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 uppercase tracking-wider"
              >
                {showAuthForm ? 'Hide Sign In' : 'Sign In'}
              </button>
              {showAuthForm && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <form onSubmit={handleAuth} className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </h3>
                    {authError && (
                      <div className="text-red-500 text-sm">{authError}</div>
                    )}
                    <div>
                      <label htmlFor="mobile-email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="mobile-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile-password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="mobile-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        {isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
                      </button>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                      </button>
                    </div>
                    <div className="text-sm text-center">
                      <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="font-medium text-primary hover:text-primary/80"
                      >
                        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

