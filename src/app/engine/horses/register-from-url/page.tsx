'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterHorseFromURLPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/horses/register-from-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register horse');
      }

      // Redirect to the horse detail page
      router.push(`/admin/horses/${data.horseId}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-8">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          Register Horse from LoveRacing
        </h1>
        <p className="text-white/60 mb-8">
          Paste a LoveRacing.nz horse profile URL to automatically register the horse
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-white/80 mb-2">
              LoveRacing URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://loveracing.nz/Breeding/428364/First-Gear-NZ-2021.aspx"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
            <p className="mt-2 text-sm text-white/40">
              Example: https://loveracing.nz/Breeding/428364/First-Gear-NZ-2021.aspx
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#D4AF37] text-black font-medium rounded-lg hover:bg-[#C4A137] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Registering...' : 'Register Horse'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/horses')}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-3">
            How it works
          </h2>
          <ol className="space-y-2 text-sm text-white/60">
            <li>1. Find a horse on LoveRacing.nz</li>
            <li>2. Copy the URL from your browser</li>
            <li>3. Paste it above and click "Register Horse"</li>
            <li>4. The system will automatically fetch all horse details</li>
            <li>5. You'll be redirected to the horse profile page</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
