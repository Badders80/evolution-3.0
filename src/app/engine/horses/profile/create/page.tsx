'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createHorse } from '@/services/horses';

function CreateHorseProfilePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const syndicatorId = searchParams?.get('syndicatorId');

  const [formData, setFormData] = useState({
    horseName: '',
    microchipNumber: '',
    lifeNumber: '',
    sex: '',
    heightHands: '',
    trainerName: '',
    trainingLocation: '',
    horseSyndicatorName: '',
    propertyName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!syndicatorId) {
    return (
      <div className="min-h-screen w-full bg-black text-white pt-32 md:pt-36">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 py-12 md:py-16">
          <p className="text-red-400">Missing syndicatorId in query string.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const horse = await createHorse(formData);
      router.push(`/engine/syndicators/term-sheet/lease?syndicatorId=${syndicatorId}&horseId=${horse.id}`);
    } catch (err: any) {
      setError(err.message ?? 'Failed to create horse profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white pt-40 md:pt-44">
      <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 py-12 md:py-16">
        <section className="mb-12">
          <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-4 text-white/30">
            STEP 2 — HORSE PROFILE
          </p>
          <h1 className="text-[36px] md:text-[48px] leading-[1.1] mb-4 text-white font-light tracking-tight">
            Create Horse Profile
          </h1>
          <p className="text-[18px] leading-[1.85] font-light text-white/65 max-w-3xl">
            Register horse identity and NZTR compliance details.
          </p>
        </section>

        <Card className="bg-white/[0.02] border-white/[0.08] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Horse Name */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Horse Name
              </label>
              <input
                type="text"
                value={formData.horseName}
                onChange={(e) => setFormData({ ...formData, horseName: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="e.g., Thunder Strike"
                required
              />
            </div>

            {/* Microchip Number */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Microchip Number
              </label>
              <input
                type="text"
                value={formData.microchipNumber}
                onChange={(e) => setFormData({ ...formData, microchipNumber: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="15-digit microchip number"
                required
              />
            </div>

            {/* Life Number */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                NZTR Life Number
              </label>
              <input
                type="text"
                value={formData.lifeNumber}
                onChange={(e) => setFormData({ ...formData, lifeNumber: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="NZTR registration number"
                required
              />
            </div>

            {/* Sex */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Sex
              </label>
              <select
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white focus:outline-none focus:border-white/[0.12] transition-colors"
                required
              >
                <option value="">Select sex</option>
                <option value="Gelding">Gelding</option>
                <option value="Mare">Mare</option>
                <option value="Stallion">Stallion</option>
                <option value="Colt">Colt</option>
                <option value="Filly">Filly</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Height (Hands)
              </label>
              <input
                type="text"
                value={formData.heightHands}
                onChange={(e) => setFormData({ ...formData, heightHands: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="e.g., 16.2"
              />
            </div>

            {/* Trainer Name */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Trainer Name
              </label>
              <input
                type="text"
                value={formData.trainerName}
                onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="Trainer's full name"
                required
              />
            </div>

            {/* Training Location */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Training Location
              </label>
              <input
                type="text"
                value={formData.trainingLocation}
                onChange={(e) => setFormData({ ...formData, trainingLocation: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="City or region"
                required
              />
            </div>

            {/* Horse Syndicator Name */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Registered Syndicator Name
              </label>
              <input
                type="text"
                value={formData.horseSyndicatorName}
                onChange={(e) => setFormData({ ...formData, horseSyndicatorName: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="As registered with NZTR"
                required
              />
            </div>

            {/* Property Name */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Property Name
              </label>
              <input
                type="text"
                value={formData.propertyName}
                onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="Property or stable name"
              />
            </div>

            {/* Submit */}
            <div className="pt-6">
              {error && (
                <p className="mb-4 text-sm text-red-400">{error}</p>
              )}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Creating Profile...' : 'Create Horse Profile'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function CreateHorseProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-black text-white pt-32 md:pt-36">
          <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 py-12 md:py-16">
            <p className="text-white/60 text-sm">Loading horse profile form...</p>
          </div>
        </div>
      }
    >
      <CreateHorseProfilePageInner />
    </Suspense>
  );
}
