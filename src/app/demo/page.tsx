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

      {/* Marketplace Section */}
      <section className="relative px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-semibold mb-4 text-white">Marketplace</h2>
        <p className="text-gray-400 max-w-xl mb-12 leading-relaxed">
          Discover and explore digital-syndication opportunities within the Evolution ecosystem. 
          Browse upcoming offerings, ownership positions, and live data — all designed to make racehorse ownership more accessible and connected.
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Blurred listings */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#0b0b0b] border border-gray-800 shadow-lg min-h-[480px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-700">
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

          {/* Right: Information Hub */}
          <aside className="flex flex-col space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1">Information Hub</h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay connected with the latest Evolution news, interviews, and race insights.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-800">
              <Image
                src="/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg"
                alt="Information Hub"
                width={500}
                height={300}
                className="object-cover w-full h-72 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold text-white">Latest Insights</h3>
                <p className="text-gray-300 text-sm">Curated coverage of races, partnerships, and trends.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
