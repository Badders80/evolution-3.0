'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGOS } from '@/lib/assets';
import { useUser, SignInButton, SignUpButton, SignOutButton } from '@clerk/nextjs';

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
  const { isSignedIn, user } = useUser();

  useEffect(() => {
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
                className="group relative flex items-center transition-colors duration-300"
              >
                <Link
                  href={link.href}
                  className={`inline-flex items-center whitespace-nowrap px-2 py-4 text-xs font-medium transition-colors duration-300 ${linkTone} hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm md:px-3 md:py-5 md:text-sm`}
                >
                  {link.label}
                </Link>
                <span className="pointer-events-none absolute left-4 right-4 bottom-4 h-px origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center md:ml-0 md:flex-1 md:justify-end">
          <SignUpButton mode="modal">
            <span className={`${primaryCtaBase} mr-1 md:mr-2`}>Get Started</span>
          </SignUpButton>
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
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-foreground/80 uppercase tracking-wider"
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 uppercase tracking-wider"
                    >
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <div className="space-y-3">
                  <p className="py-2 text-center text-sm text-foreground/70">
                    Signed in as <span className="font-medium text-foreground">{user?.fullName || 'User'}</span>
                  </p>
                  <SignOutButton>
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-foreground/80 uppercase tracking-wider"
                    >
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

