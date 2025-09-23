'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGOS } from '@/lib/assets';

const navLinks = [
  { label: 'Our Mission', href: '#mission' },
  { label: 'About', href: '#about' },
  { label: 'Innovation', href: '#innovation' },
  { label: 'MyStable', href: '#stable' },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur relative">
      {/* Centered page tabs across full width */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-16 items-center justify-center">
        <div className="pointer-events-auto hidden md:flex items-center gap-6 text-sm text-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative pb-0.5 transition hover:text-brand-gold"
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
          className="flex shrink-0 items-center text-xs font-semibold uppercase tracking-[0.4em] text-brand-gold transition hover:text-brand-gold/80"
        >
          <Image
            src={LOGOS.mono.gold}
            alt="Evolution Stables"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center">
          <Link
            href="#get-started"
            className="mr-2 rounded-full bg-brand-gold px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-black transition hover:bg-brand-gold/90"
          >
            Get Started
          </Link>
          <Link
            href="http://localhost:6006"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-100 transition hover:border-brand-gold hover:text-brand-gold"
          >
            Login (Stories)
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-full border border-white/20 p-2 text-gray-200 transition hover:border-brand-gold hover:text-brand-gold"
          onClick={() => setIsMenuOpen((open) => !open)}
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

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur">
          <div className="space-y-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-200 transition hover:text-brand-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="#get-started"
                className="mb-3 block rounded-full bg-brand-gold px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.4em] text-black transition hover:bg-brand-gold/90"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
              <Link
                href="http://localhost:6006"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full border border-white/30 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.4em] text-gray-100 transition hover:border-brand-gold hover:text-brand-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                Login (Stories)
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
