'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { EnvironmentToggle } from '@/components/layout/EnvironmentToggle';

/**
 * Engine Layout - Syndicator-facing tools and workflows
 * Navigation: Studio | Valuation | Registration | Syndicators | Horses | Term Sheets
 */
export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Environment Toggle + Breadcrumbs */}
      <nav className="w-full border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center h-14">
            <div className="flex items-center gap-6">
              <EnvironmentToggle />
              <Breadcrumbs />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">{children}</div>
    </div>
  );
}

