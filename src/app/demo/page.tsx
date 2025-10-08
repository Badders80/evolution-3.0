'use client';

import Image from 'next/image';

export default function Demo() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden flex flex-col items-center justify-center text-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/Jockey-walk-out.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-bold text-[#d4af37] mb-4">Marketplace</h1>
          <p className="text-gray-300 text-lg">
            Discover and own digital assets in the Evolution Stables ecosystem
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative px-8 py-16 max-w-7xl mx-auto">
        {/* Demo label */}
        <span className="absolute top-4 right-6 text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          DEMO MODE
        </span>

        <h2 className="text-3xl font-semibold mb-2">Marketplace Prototype</h2>
        <p className="text-gray-400 mb-10">
          This demo area previews how the live marketplace will display listings and updates once integrated.
        </p>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Marketplace Mock Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-[#0b0b0b] border border-gray-800 shadow-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-300 text-sm uppercase tracking-wider border-b border-gray-700">
                    <th className="px-6 py-3">Horse Name</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Stake Available</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="text-gray-400 border-b border-gray-800">
                      <td className="px-6 py-3">••••••••</td>
                      <td className="px-6 py-3">••••••••</td>
                      <td className="px-6 py-3">••••••••</td>
                      <td className="px-6 py-3">••••••••</td>
                      <td className="px-6 py-3 text-right space-x-2">
                        <button className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-500 cursor-not-allowed">
                          Buy
                        </button>
                        <button className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-500 cursor-not-allowed">
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Blur overlay */}
              <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center">
                <span className="text-gray-300 text-lg font-medium">Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Right: Information Hub */}
          <aside className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1">Insights & Updates</h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay connected to the latest Evolution Stables stories, interviews, and race insights.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-800">
              <Image
                src="/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg"
                alt="Information Hub"
                width={500}
                height={300}
                className="object-cover w-full h-64 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold text-white">Industry Insights</h3>
                <p className="text-gray-300 text-sm">Curated coverage of races, partnerships, and trends.</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Link back to live version */}
        <p className="text-center text-gray-500 text-sm mt-12">
          View the live version at{" "}
          <a href="/marketplace" className="text-[#d4af37] hover:underline">
            /marketplace
          </a>
        </p>
      </section>
    </main>
  );
}
