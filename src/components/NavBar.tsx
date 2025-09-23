'use client';
import React from 'react';
import Link from 'next/link';
import { NavFadeIn } from './layout/NavFadeIn';

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavFadeIn>
            <Link href="/" className="text-xl font-bold text-gray-900">
              Evolution 3.0
            </Link>
          </NavFadeIn>
          
          <NavFadeIn delay={0.1}>
            <div className="hidden md:flex space-x-8">
              <Link href="#mission" className="text-gray-600 hover:text-gray-900 transition-colors">
                Mission
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>
          </NavFadeIn>
        </div>
      </div>
    </nav>
  );
}