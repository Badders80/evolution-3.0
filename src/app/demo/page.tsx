'use client';

import Image from 'next/image';

export default function Demo() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0" style={{ filter: 'brightness(0.85)' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ 
              transform: 'scale(1.1)'
            }}
            ref={(video) => {
              if (video) {
                video.playbackRate = 0.7;
              }
            }}
          >
            <source src="/images/Jockey-walk-out.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-bold text-[#d4af37] mb-4">Marketplace</h1>
          <p className="text-gray-300 text-lg">
            Discover and own digital assets in the Evolution Stables ecosystem
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="min-h-screen bg-[#0a0a0a] text-white pt-24">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12 space-y-20">
        
          {/* Section 1: Marketplace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/40 mb-2">Evolution Stables</p>
              <h2 className="text-4xl font-medium tracking-tight mb-4 text-white">Marketplace</h2>
              <p className="text-base text-white/60 leading-relaxed">
                Discover and explore digital-syndication opportunities within the Evolution ecosystem. 
                Browse upcoming offerings, ownership positions, and live data — all designed to make racehorse ownership more accessible and connected.
              </p>
            </div>

          {/* Right: Blurred Table */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0b0b0b] border border-gray-800 shadow-lg min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-700">
                  <th className="px-6 py-3">Horse Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Stake</th>
                  <th className="px-6 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="text-gray-400 border-b border-gray-800">
                    <td className="px-6 py-3">••••••••</td>
                    <td className="px-6 py-3">••••••••</td>
                    <td className="px-6 py-3">••••••••</td>
                    <td className="px-6 py-3 text-right">••••••••</td>
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

        {/* Section 2: Information Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/40 mb-2">Evolution Stables</p>
            <h2 className="text-4xl font-medium tracking-tight mb-4 text-white">Information Hub</h2>
            <p className="text-base text-white/60 leading-relaxed">
              Stay connected with the latest Evolution news, interviews, and race insights.
            </p>
          </div>

          {/* Right: Image */}
          <div className="relative rounded-xl overflow-hidden border border-white/5">
            <Image
              src="/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg"
              alt="Information Hub"
              width={800}
              height={600}
              className="object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-lg font-medium tracking-tight text-white mb-1">Latest Insights</h3>
              <p className="text-sm text-white/60">Curated coverage of races, partnerships, and trends.</p>
            </div>
          </div>
        </div>

        </div>
      </section>
    </main>
  );
}
