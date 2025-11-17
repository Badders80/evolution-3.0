import Link from 'next/link';

export default function EngineHome() {
  const modules = [
    {
      name: 'Studio',
      href: '/engine/studio',
      description:
        'Upload, transcribe, enrich and refine content. Produce polished investor updates.',
    },
    {
      name: 'Valuation',
      href: '/engine/valuation',
      description:
        'Model returns, pricing, breakeven points and tokenised economics.',
    },
    {
      name: 'Registration',
      href: '/engine/registration',
      description:
        'Onboard horses and owners. Manage SR16 data and compliance workflows.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white pt-32 md:pt-36">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-semibold mb-10">
          Evolution Stables Engine
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link
              key={mod.name}
              href={mod.href}
              className="group border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900 transition"
            >
              <h2 className="text-xl font-medium mb-2 group-hover:text-white">
                {mod.name}
              </h2>
              <p className="text-sm text-neutral-400">{mod.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

