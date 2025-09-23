import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Evolution 3.0
            </h3>
            <p className="text-gray-600 max-w-md">
              Modern Next.js application with clean architecture, reusable components, 
              and seamless integration between mock and real APIs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#mission" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Mission
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-600 hover:text-gray-900 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © 2025 Evolution 3.0. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}