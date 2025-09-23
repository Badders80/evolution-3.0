import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-brand-gold mb-4">
              Evolution Stables
            </h3>
            <p className="text-gray-400 max-w-md">
              Revolutionizing equestrian ownership through innovative fractional ownership models. 
              Experience the thrill of owning world-class thoroughbreds.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#ownership" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Ownership
                </Link>
              </li>
              <li>
                <Link href="#horses" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Our Horses
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-brand-gold transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/opportunities" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-brand-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500">
            © 2025 Evolution Stables. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}