'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGOS } from '@/lib/assets';
import { useSupabase, useSession } from '@/providers/supabase-provider';
import { useRouter, usePathname } from 'next/navigation';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Our Mission', href: '/#mission' },
  { label: 'Our Model', href: '/#digital-syndication' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'MyStable', href: '/mystable' },
  { label: 'FAQ', href: '/#faq' },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { supabase } = useSupabase();
  const session: any = useSession(); // Using any as a temporary workaround
  const router = useRouter();
  const pathname = usePathname();
  const hideNav = pathname?.startsWith('/auth');

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleGetStarted = () => {
    router.push('/auth');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    if (hideNav) {
      return;
    }

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
  }, [hideNav]);

  useEffect(() => {
    if (hideNav) {
      return;
    }

    const timeout = window.setTimeout(() => setVisible(true), 320);
    return () => window.clearTimeout(timeout);
  }, [hideNav]);

  const isSolid = scrolled || isMenuOpen;
  const logoSrc = LOGOS.simple.grey;
  const linkTone = isSolid ? 'text-primary' : 'text-muted';
  const primaryCtaBase = 'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-label uppercase text-primary transition-colors duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background sm:px-5';
  const menuButtonBase =
    'flex h-10 w-10 items-center justify-center text-primary transition-colors duration-200 hover:text-primary focus:outline-none md:h-11 md:w-11';

  const displayName = useMemo(() => {
    if (!session) return undefined;

    const metadata = session.user?.user_metadata ?? {};
    const rawName =
      metadata.preferred_name ||
      metadata.full_name ||
      metadata.fullName ||
      metadata.first_name ||
      metadata.firstName ||
      metadata.name;

    if (typeof rawName === 'string' && rawName.trim().length > 0) {
      return rawName.trim().split(' ')[0];
    }

    const email = session.user?.email ?? '';
    if (email) {
      return email.split('@')[0];
    }

    return undefined;
  }, [session]);

  if (hideNav) {
    return null;
  }

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
            className="flex shrink-0 items-center transition-colors duration-300 focus:outline-none"
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

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
          <div className="flex items-center gap-0.5 lg:gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="group relative flex items-center"
              >
                <Link
                  href={link.href}
                  className="inline-flex items-center whitespace-nowrap px-2 py-4 text-body-sm transition-colors duration-300 text-secondary hover:text-white focus:outline-none md:px-3 md:py-5"
                >
                  {link.label}
                </Link>
                <span className="absolute bottom-2 left-2 h-[1.5px] w-0 bg-[#d4a964] shadow-[0_0_6px_1px_rgba(212,169,100,0.4)] transition-all duration-300 ease-out md:left-3 group-hover:w-[calc(100%-1rem)] md:group-hover:w-[calc(100%-1.5rem)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-0 lg:ml-0 lg:flex-1 lg:justify-end lg:gap-3">
          {session && (
            <span className="hidden whitespace-nowrap rounded-full border border-foreground/15 bg-foreground/[0.05] px-4 py-2 text-label uppercase text-muted md:inline-flex">
              Hi,&nbsp;{displayName ?? 'friend'}
            </span>
          )}
          {!session && (
            <div className="relative">
              <button
                onClick={handleGetStarted}
                className={primaryCtaBase}
              >
                Get Started
              </button>
            </div>
          )}
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
                className="block rounded-md px-2 py-3 text-body text-secondary transition-colors duration-200 hover:bg-foreground/10 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="space-y-3 pt-4">
              {session && (
                <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-center text-label uppercase text-muted">
                  Hi,&nbsp;{displayName ?? 'friend'}
                </div>
              )}
              <button
                onClick={async () => {
                  if (session) {
                    await handleSignOut();
                  } else {
                    handleGetStarted();
                  }
                  setIsMenuOpen(false);
                }}
                className="w-full block rounded-full bg-primary px-4 py-2.5 text-center text-label uppercase text-black transition-colors duration-200 hover:bg-primary/90"
              >
                {session ? 'Sign Out' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="relative hidden md:block">
          <div className="absolute right-8 top-[88px] w-48 rounded-full border border-foreground/15 bg-background/90 shadow-lg backdrop-blur">
            {session ? (
              <button
                onClick={async () => {
                  await handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-label uppercase text-primary transition-colors duration-200 hover:bg-foreground/10"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  handleGetStarted();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-label uppercase text-primary transition-colors duration-200 hover:bg-foreground/10"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

