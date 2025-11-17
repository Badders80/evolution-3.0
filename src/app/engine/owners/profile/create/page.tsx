'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createOwner } from '@/services/owners';

export default function CreateOwnerProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    ownerConfirmsRightToLease: false,
    ownerApprovesDigitalSyndication: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const owner = await createOwner(formData);
      router.push(`/engine/horses/profile/create?ownerId=${owner.id}`);
    } catch (err: any) {
      setError(err.message ?? 'Failed to create syndicator profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white pt-40 md:pt-44">
      <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 py-12 md:py-16">
        <section className="mb-12">
          <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-4 text-white/30">
            STEP 1 — SYNDICATOR PROFILE
          </p>
          <h1 className="text-[36px] md:text-[48px] leading-[1.1] mb-4 text-white font-light tracking-tight">
            Create Syndicator Profile
          </h1>
          <p className="text-[18px] leading-[1.85] font-light text-white/65 max-w-3xl">
            Establish authorised syndicator identity and compliance declarations.
          </p>
        </section>

        <Card className="bg-white/[0.02] border-white/[0.08] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Authorised Syndicator */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Authorised Syndicator
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="Full name"
                required
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Contact Person
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="Contact person name"
                required
              />
            </div>

            {/* Contact/Email */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="owner@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-light mb-2 text-white/70">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                placeholder="+64 21 123 4567"
                required
              />
            </div>

            {/* Confirmations */}
            <div className="space-y-4 pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ownerConfirmsRightToLease}
                  onChange={(e) => setFormData({ ...formData, ownerConfirmsRightToLease: e.target.checked })}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-white/70">
                  I confirm that I have the legal right to lease this horse for digital-syndication purposes.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ownerApprovesDigitalSyndication}
                  onChange={(e) => setFormData({ ...formData, ownerApprovesDigitalSyndication: e.target.checked })}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-white/70">
                  I approve the digital-syndication of my horse through Evolution Stables and Tokinvest.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-6">
              {error && (
                <p className="mb-4 text-sm text-red-400">{error}</p>
              )}
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Creating Profile...' : 'Create Syndicator Profile'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
