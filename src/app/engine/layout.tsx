'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Studio', href: '/engine/studio' },
    { name: 'Valuation', href: '/engine/valuation' },
    { name: 'Registration', href: '/engine/registration' },
    { name: 'Syndicators', href: '/engine/owners/profile/create' },
    { name: 'Horses', href: '/engine/horses/profile/create' },
    { name: 'Term Sheets', href: '/engine/owners/term-sheet/lease' },
    { name: 'Admin', href: '/admin/term-sheets' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Engine Sub-Navigation */}
      <nav className="w-full border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-1">
              <Link
                href="/engine"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-2"
              >
                Engine
              </Link>
              <span className="text-white/20">/</span>
            </div>
            
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/engine' && pathname?.startsWith(item.href)) ||
                  (item.href === '/admin/term-sheets' && pathname?.startsWith('/admin'));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'text-white bg-white/5'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">{children}</div>
    </div>
  );
}

