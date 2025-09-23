import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-800/70 bg-black">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-8 md:px-12 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-gold">
              Evolution Stables
            </h3>
            <p className="text-sm text-gray-400">
              Revolutionising equestrian ownership through digital syndication. Share the thrill of racing without the barriers.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#mission" className="transition hover:text-brand-gold">
                  Mission
                </Link>
              </li>
              <li>
                <Link href="#syndication" className="transition hover:text-brand-gold">
                  Digital Syndication
                </Link>
              </li>
              <li>
                <Link href="#entry" className="transition hover:text-brand-gold">
                  Showcase
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-200">
              Stay In Touch
            </h4>
            <p className="text-sm text-gray-400">
              Subscribe for launch updates and exclusive ownership opportunities.
            </p>
            <Link
              href="#get-started"
              className="inline-flex w-max items-center justify-center rounded-full border border-brand-gold/60 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-brand-gold transition hover:border-brand-gold hover:bg-brand-gold hover:text-gray-950"
            >
              Join the list
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800/60 pt-6 text-center text-xs text-gray-600">
          Copyright 2025 Evolution Stables. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
