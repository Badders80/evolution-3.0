'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGOS } from '@/lib/assets';
import { useUser, useClerk, SignInButton, SignUpButton, SignOutButton } from '@clerk/nextjs';

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
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  const logoSrc = scrolled ? LOGOS.mono.white : LOGOS.simple.grey;

  useEffect(() => {
    // Prefer observing the hero section; stay grey while hero is in view
    const hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // When hero is intersecting (visible), keep pre-scroll (grey). When it leaves, switch to scrolled colors.
          setScrolled(!entry.isIntersecting);
        },
        {
          // Offset the top by navbar height so we switch right as content reaches below the bar
          root: null,
          rootMargin: '-64px 0px 0px 0px',
          threshold: 0,
        }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    // Fallback: simple scroll threshold
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Delay showing the navbar to allow focus on the hero
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[9999] w-full backdrop-blur bg-black/70 border-b border-white/10 transition-opacity duration-[2200ms] ease-out ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Centered page tabs across full width */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-16 items-center justify-center">
        <div
          className="pointer-events-auto hidden md:flex items-center gap-6 text-sm text-gray-300 transition-colors duration-300"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative pb-0.5 text-gray-300 transition-colors duration-300 hover:text-white uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content container: logo left, actions right */}
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center text-xs font-semibold uppercase tracking-[0.4em] text-gray-300 transition-colors duration-300 hover:text-gray-100"
        >
          <Image
            src={logoSrc}
            alt="Evolution Stables"
            width={32}
            height={32}
            className={`h-8 w-8 object-contain transition-all duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-80'
            }`}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center">
          {!isSignedIn ? (
            <>
              <SignUpButton mode="modal">
                <button
                  className="mr-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition-colors duration-300 bg-transparent text-gray-200 border border-white/30 hover:border-gray-400 hover:text-white"
                >
                  Get Started
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button
                  className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition-colors duration-300 border border-white/30 text-gray-300 hover:border-gray-400 hover:text-white"
                >
                  Login
                </button>
              </SignInButton>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Hi, {user?.firstName || 'User'}</span>
              <SignOutButton>
                <button className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] border border-white/30 text-gray-300 hover:border-brand-gold hover:text-brand-gold">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          )}
        </div>

        <button
          type="button"
          className="md:hidden rounded-full p-2 border border-white/10 text-gray-300 transition-colors duration-300 hover:border-gray-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Toggle navigation</span>
          {isMenuOpen ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-4 px-6 py-6 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-white uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              {!isSignedIn ? (
                <>
                  <SignUpButton mode="modal">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full rounded-full bg-brand-gold px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-black hover:bg-brand-gold/90"
                    >
                      Get Started
                    </button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full rounded-full border border-white/30 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white hover:border-brand-gold hover:text-brand-gold"
                    >
                      Login
                    </button>
                  </SignInButton>
                </>
              ) : (
                <div className="space-y-3">
                  <p className="text-center text-sm text-gray-300">Signed in as {user?.firstName || 'User'}</p>
                  <SignOutButton>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full rounded-full border border-white/30 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white hover:border-brand-gold hover:text-brand-gold"
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
