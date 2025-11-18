import Link from 'next/link';
import { supabaseServer } from '@/lib/supabaseServer';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Admin Dashboard - Overview and quick access to management tools
 */
export default async function AdminDashboard() {
  // Fetch overview data directly with server client (bypasses RLS)
  const [syndicatorsResult, horsesResult, termSheetsResult] = await Promise.all([
    supabaseServer.from('syndicators').select('*'),
    supabaseServer.from('horses').select('*'),
    supabaseServer.from('term_sheets').select('*'),
  ]);

  const syndicators = syndicatorsResult.data || [];
  const horses = horsesResult.data || [];
  const termSheets = termSheetsResult.data || [];

  console.log('Admin Dashboard Data:', { 
    syndicatorsCount: syndicators.length, 
    horsesCount: horses.length, 
    termSheetsCount: termSheets.length 
  });

  const stats = [
    {
      label: 'Syndicators',
      value: syndicators.length,
      href: '/admin/syndicators',
      description: 'Registered syndicator profiles',
    },
    {
      label: 'Horses',
      value: horses.length,
      href: '/admin/horses',
      description: 'Horses in the system',
    },
    {
      label: 'Term Sheets',
      value: termSheets.length,
      href: '/admin/term-sheets',
      description: 'Active and pending term sheets',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-8">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/60">
            Internal management and oversight tools for Evolution Stables
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                  {stat.label}
                </h3>
                <svg
                  className="w-5 h-5 text-white/40 group-hover:text-[#D4AF37] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                {stat.value}
              </div>
              <p className="text-sm text-white/40">{stat.description}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/syndicators"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div>
                <div className="font-medium text-white mb-1">
                  View All Syndicators
                </div>
                <div className="text-sm text-white/60">
                  Manage syndicator profiles and compliance
                </div>
              </div>
              <svg
                className="w-5 h-5 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="/admin/horses"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div>
                <div className="font-medium text-white mb-1">
                  View All Horses
                </div>
                <div className="text-sm text-white/60">
                  Manage horse profiles and details
                </div>
              </div>
              <svg
                className="w-5 h-5 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="/admin/term-sheets"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div>
                <div className="font-medium text-white mb-1">
                  View Term Sheets
                </div>
                <div className="text-sm text-white/60">
                  Review and manage all term sheets
                </div>
              </div>
              <svg
                className="w-5 h-5 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="/engine"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div>
                <div className="font-medium text-white mb-1">
                  Switch to Engine
                </div>
                <div className="text-sm text-white/60">
                  Access syndicator-facing tools
                </div>
              </div>
              <svg
                className="w-5 h-5 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
