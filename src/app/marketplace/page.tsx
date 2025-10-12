'use client';

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl space-y-20 px-6 pb-20 pt-24 md:px-10 lg:px-12">

        {/* Section 1: Marketplace */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-white/40">Evolution Stables</p>
            <h2 className="mb-4 text-4xl font-medium tracking-tight text-white">Marketplace</h2>
            <p className="text-base leading-relaxed text-white/60">
              Discover and explore digital-syndication opportunities within the Evolution ecosystem. Browse upcoming
              offerings, ownership positions, and live data&mdash;all designed to make racehorse ownership more
              accessible and connected.
            </p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0b0b] shadow-lg">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-700 text-sm uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-3">Horse Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Stake</th>
                  <th className="px-6 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-800 text-gray-400">
                    <td className="px-6 py-3">########</td>
                    <td className="px-6 py-3">########</td>
                    <td className="px-6 py-3">########</td>
                    <td className="px-6 py-3 text-right">########</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="text-lg font-medium text-gray-300">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
