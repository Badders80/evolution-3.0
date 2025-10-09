'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { useSupabase } from '@/providers/supabase-provider';
import Modal from '@/components/ui/Modal';

// Mock data for demonstration
const mockPortfolio = {
  totalValue: 245780,
  totalReturns: 18650,
  returnsPercentage: 8.2,
  activeStakes: 3,
  monthlyChange: 12.3,
};

const mockHorses = [
  {
    id: 1,
    name: 'Thunder Strike',
    stake: 15,
    investment: 45000,
    currentValue: 52300,
    returns: 7300,
    returnsPercentage: 16.2,
    status: 'racing',
    nextRace: 'Mar 28, 2025',
    performance: '3W / 8R',
  },
  {
    id: 2,
    name: 'Golden Horizon',
    stake: 25,
    investment: 62000,
    currentValue: 68900,
    returns: 6900,
    returnsPercentage: 11.1,
    status: 'racing',
    nextRace: 'Apr 5, 2025',
    performance: '5W / 12R',
  },
  {
    id: 3,
    name: 'Midnight Runner',
    stake: 10,
    investment: 28000,
    currentValue: 29800,
    returns: 1800,
    returnsPercentage: 6.4,
    status: 'training',
    nextRace: 'Apr 12, 2025',
    performance: '2W / 6R',
  },
];

export default function MyStablePage() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    let isActive = true;

    const hydrateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isActive) return;

      setSession(data.session);
      setCheckingSession(false);

      if (!data.session) {
        setShowModal(true);
        router.prefetch('/auth');
      }
    };

    hydrateSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isActive) {
        return;
      }

      setSession(nextSession);
      setShowModal(!nextSession);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  useEffect(() => {
    if (!session) {
      setIsTransitioning(false);
      setShowComingSoon(false);
      return;
    }

    const fadeTimer = setTimeout(() => setIsTransitioning(true), 1800);
    const comingSoonTimer = setTimeout(() => setShowComingSoon(true), 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(comingSoonTimer);
    };
  }, [session]);

  const firstName = session?.user?.user_metadata?.full_name?.split(' ')[0] || 
                    session?.user?.email?.split('@')[0] || 
                    'User';

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <div className="min-h-screen bg-black/80 backdrop-blur-sm" />
        {showModal && (
          <Modal
            title="Sign in required"
            message="You must be signed in to access your stable."
            confirmLabel="Sign In"
            cancelLabel="Go Home"
            onConfirm={() => router.push('/auth?redirectedFrom=/mystable')}
            onCancel={() => router.push('/')}
          />
        )}
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">
        
        {/* Header */}
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Evolution Stables</p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight md:text-5xl">MyStable</h1>
          <p className="mt-4 text-base text-white/60 max-w-2xl">
            Welcome, <span className="text-white/90">{firstName}</span>. This is your personal command center 
            for managing ownership positions, tracking performance, and staying connected to your stable.
          </p>
        </header>

        {/* Main Grid: Left (Horses) + Right (Stats) */}
        <div className="relative isolate mt-2 overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]/70 px-6 py-10 shadow-[0_28px_120px_rgba(0,0,0,0.55)]">
          <div
            className={`relative z-10 grid gap-8 lg:grid-cols-[1fr_320px] transform transition-all duration-700 ease-in-out ${
              isTransitioning
                ? 'pointer-events-none -translate-y-3 opacity-0 blur-sm'
                : 'translate-y-0 opacity-100'
            }`}
          >
          
            {/* Left: My Horses */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-medium tracking-tight">My Horses</h2>
                <p className="mt-1 text-sm text-white/50">Your active ownership stakes</p>
              </div>

              <div className="space-y-4">
                {mockHorses.map((horse) => (
                  <div
                    key={horse.id}
                    className="group relative rounded-xl border border-white/5 bg-[#111111] p-6 transition-all hover:border-white/10 hover:bg-[#151515]"
                  >
                    {/* Horse Name & Status */}
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium tracking-tight">{horse.name}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                            horse.status === 'racing' 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : 'bg-blue-500/10 text-blue-400'
                          }`}>
                            {horse.status}
                          </span>
                          <span className="text-xs text-white/40">{horse.performance}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-medium ${
                          horse.returnsPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {horse.returnsPercentage >= 0 ? '+' : ''}{horse.returnsPercentage}%
                        </p>
                        <p className="text-xs text-white/40">returns</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">Stake</p>
                        <p className="text-sm font-medium">{horse.stake}%</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">Investment</p>
                        <p className="text-sm font-medium">${(horse.investment / 1000).toFixed(0)}k</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">Value</p>
                        <p className="text-sm font-medium">${(horse.currentValue / 1000).toFixed(1)}k</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">Next Race</p>
                        <p className="text-xs text-white/60">{horse.nextRace.split(',')[0]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Right: Stats Sidebar */}
            <aside className="flex flex-col gap-4">
              
              {/* Total Value */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Total Value</p>
                <p className="text-3xl font-medium tracking-tight">${(mockPortfolio.totalValue / 1000).toFixed(1)}k</p>
                <p className="mt-1 text-sm text-emerald-400">+{mockPortfolio.monthlyChange}% this month</p>
              </div>

              {/* Total Returns */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Total Returns</p>
                <p className="text-3xl font-medium tracking-tight">${(mockPortfolio.totalReturns / 1000).toFixed(1)}k</p>
                <p className="mt-1 text-sm text-white/50">+{mockPortfolio.returnsPercentage}% ROI</p>
              </div>

              {/* Active Stakes */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Active Stakes</p>
                <p className="text-3xl font-medium tracking-tight">{mockPortfolio.activeStakes}</p>
                <p className="mt-1 text-sm text-white/50">across portfolio</p>
              </div>

              {/* Quick Links */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-xs font-medium tracking-tight mb-3">Quick Actions</p>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-white/60 hover:text-white transition-colors">
                    View Marketplace &rarr;
                  </a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors">
                    Performance Report &rarr;
                  </a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors">
                    Upcoming Races &rarr;
                  </a>
                </div>
              </div>

            </aside>
          </div>

          <div
            className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ease-out ${
              showComingSoon ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#0b0b0b]/80 px-10 py-16 text-center backdrop-blur-md">
              <p className="text-3xl font-medium tracking-tight text-white/80">Coming Soon</p>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
                The full MyStable ownership dashboard for portfolio analytics, horse performance, and race insights will unlock shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
