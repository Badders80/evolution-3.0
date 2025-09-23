'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavFadeIn } from './layout/NavFadeIn';
import { LOGOS } from '@/lib/assets';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavFadeIn>
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative w-12 h-12">
                <Image
                  src={LOGOS.mono.black}
                  alt="Evolution Stables"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-tight">Evolution</span>
                <span className="text-sm text-gray-600 font-medium -mt-1">Stables</span>
              </div>
            </Link>
          </NavFadeIn>
          
          {/* Desktop Navigation */}
          <NavFadeIn delay={0.1}>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#hero" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Home
              </Link>
              <Link href="#mission" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Mission
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Features
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                About
              </Link>
              <Link 
                href="#contact" 
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </NavFadeIn>

          {/* Mobile menu button */}
          <NavFadeIn delay={0.2}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </NavFadeIn>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="#hero" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="#mission" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                Mission
              </Link>
              <Link href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                Features
              </Link>
              <Link href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link href="#contact" className="block px-3 py-2 bg-gray-900 text-white rounded-lg font-medium mt-2">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}