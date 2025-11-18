import Link from 'next/link';

/**
 * Engine Home - Syndicator-facing tools and workflows
 */
export default function EngineHome() {
  const modules = [
    {
      name: 'Studio',
      href: '/engine/studio',
      description:
        'Upload, transcribe, enrich and refine content. Produce polished investor updates.',
      icon: '🎬',
    },
    {
      name: 'Valuation',
      href: '/engine/valuation',
      description:
        'Model returns, pricing, breakeven points and tokenised economics.',
      icon: '📊',
    },
    {
      name: 'Registration',
      href: '/engine/registration',
      description:
        'Onboard horses and owners. Manage SR16 data and compliance workflows.',
      icon: '📋',
    },
    {
      name: 'Syndicators',
      href: '/engine/syndicators/profile/create',
      description:
        'Create and manage syndicator profiles with contact information and compliance.',
      icon: '👥',
    },
    {
      name: 'Horses',
      href: '/engine/horses/profile/create',
      description:
        'Register horses with complete profiles, microchip numbers, and training details.',
      icon: '🐴',
    },
    {
      name: 'Term Sheets',
      href: '/engine/syndicators/term-sheet/lease',
      description:
        'Generate lease term sheets for digital syndication and tokenization.',
      icon: '📄',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-8">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Evolution Stables Engine
          </h1>
          <p className="text-white/60">
            Complete toolkit for digital racehorse syndication and tokenization
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link
              key={module.name}
              href={module.href}
              className="group bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="text-4xl mb-4">{module.icon}</div>
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                {module.name}
              </h2>
              <p className="text-sm text-white/60">{module.description}</p>
            </Link>
          ))}
        </div>

        {/* Admin Access */}
        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Internal Management
              </h3>
              <p className="text-sm text-white/60">
                Access admin tools for oversight and compliance
              </p>
            </div>
            <Link
              href="/admin"
              className="px-6 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-md hover:bg-[#D4AF37]/20 transition-colors"
            >
              Go to Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

