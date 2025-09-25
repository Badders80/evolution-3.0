'use client';

import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { HeroSection } from '@/components/site/HeroSection';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const audiences = [
  {
    key: 'investors',
    title: 'For Investors & Fans',
    description: 'Experience racehorse ownership without long-term commitments.',
    bullets: [
      'Transparent costs and stake sharing so you can choose what works for you.',
      'Join the community and enjoy the thrill of racing, on your terms.',
    ],
    image: '/images/Horse-and-foal.jpg',
    alt: 'Investors enjoying racehorse ownership',
  },
  {
    key: 'breeders',
    title: 'For Breeders & Syndicators',
    description: 'Unlock a new market of participants and income streams.',
    bullets: [
      'Set your own terms - length, price, and stakes.',
      'Maintain full control and ownership.',
    ],
    image: '/images/Background-hooves-back-and-white.jpg',
    alt: 'Breeders and syndicators managing horses',
  },
  {
    key: 'clubs',
    title: 'For Clubs, Organisations & Governing Bodies',
    description: 'Generate new revenue streams for current participants.',
    bullets: [
      'Attract the next generation into the industry.',
      'Futureproof racing through inclusivity and participation.',
    ],
    image: '/images/Hooves-on-grass.png',
    alt: 'Racing industry organisations and governance',
  },
];

const innovationPanels = [
  {
    title: 'For Owners',
    body: [
      "Generate reliable income while keeping full control over your horse's future.",
      'Tailor lease or syndication terms to fit your model, creating stability and long-term value.',
    ],
  },
  {
    title: 'For Investors',
    body: [
      'Enjoy the thrill of ownership with the flexibility to choose your level of involvement.',
      'Buy in with transparent terms, share in race performance, and connect with the racing community without traditional barriers.',
    ],
  },
  {
    title: 'For the Industry',
    body: [
      'Drive greater participation and engagement by opening the doors to new investors.',
      'More owners, more energy, and more investment build a stronger, sustainable future for racing.',
    ],
  },
];

const faqItems = [
  {
    question: 'What do investors or racing fans get out of it?',
    answer:
      'The thrill of ownership without the long-term commitment. Transparent costs and flexible stake sharing make it accessible to everyone.',
  },
  {
    question: "What's in it for owners, syndicators, or breeders?",
    answer:
      'Access to new investors while keeping full control and ownership, with flexible terms that suit your model.',
  },
  {
    question: 'How does this benefit clubs, organisations, and governing bodies?',
    answer:
      'New revenue streams for current participants, while guiding the next generation into ownership.',
  },
  {
    question: 'Is this regulated?',
    answer:
      'Yes, Evolution Stables works within NZTR and VARA frameworks to ensure compliance and investor protection.',
  },
  {
    question: 'Why is the model different?',
    answer: 'No heavy commitments. Flexible, transparent, and accessible - ownership for all.',
  },
  {
    question: 'How is Evolution Stables different?',
    answer:
      'Our focus on transparency and liquidity removes barriers for first-time owners, turning them into active members of the racing community. At the same time, it creates new revenue streams for industry participants, futureproofing racing for generations to come.',
  },
];

function AudienceGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {audiences.map((audience) => (
        <div
          key={audience.key}
          className="flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-surface/30 shadow-lg shadow-black/20"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={audience.image}
              alt={audience.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-brand-gold">{audience.title}</h3>
              <p className="text-base font-medium text-foreground">{audience.description}</p>
            </div>
            <ul className="space-y-3 text-foreground/85">
              {audience.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="text-brand-gold" aria-hidden>
                    &bull;
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="text-gray-100">
      <div className="w-full bg-black px-0 shadow-[0_0_80px_rgba(0,0,0,0.35)] m-0 p-0 border-none max-w-none">
        <HeroSection />

        <section id="mission" className="px-6 py-48 sm:px-12 md:px-24 lg:px-32 xl:px-48 m-0 p-0 border-none mx-auto max-w-7xl">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              Our Mission
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              Ownership
              <br />
              Re-Imagined
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300">
              Traditional racehorse ownership? Limited. Complex. Not anymore. Evolution Stables delivers accessible, transparent, flexible thrills—empowering first-time fans and seasoned pros alike to own the track.
            </p>
            <Button
              variant="outline"
              className="inline-flex items-center gap-3 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black"
              onClick={() => scrollToId('get-started')}
            >
              Join the revolution
              <span aria-hidden className="text-base">
                &rsaquo;
              </span>
            </Button>
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[50vh]" overlay="from-black/10 to-black/30" />
        </section>

        <section id="evolution-way" className="px-6 py-48 sm:px-12 md:px-24 lg:px-32 xl:px-48 m-0 p-0 border-none mx-auto max-w-7xl">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              About
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              The <span className="text-brand-gold">Evolution</span> Way
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300">
              Our digital syndication model unlocks value for all in thoroughbred racing.
            </p>
          </div>
          <div className="mt-12">
            <AudienceGrid />
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[50vh]" overlay="from-black/10 to-black/30" />
        </section>

        <section id="digital-syndication" className="px-6 py-48 sm:px-12 md:px-24 lg:px-32 xl:px-48 m-0 p-0 border-none mx-auto max-w-7xl">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              Ownership, the Evolution Way
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              Digital-<span className="text-brand-gold">Syndication</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300">
              The modern way to experience ownership - traditional syndication with a digital twist. We have taken the time-tested principles of syndication and evolved them into a model that adds clarity, flexibility, and borderless access.
            </p>
          </div>
          <div className="mt-12">
            <AudienceGrid />
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Horse-and-foal.jpg" height="h-[50vh]" overlay="from-black/10 to-black/40" />
        </section>

        <section id="innovation" className="px-6 py-48 sm:px-12 md:px-24 lg:px-32 xl:px-48 m-0 p-0 border-none mx-auto max-w-7xl">
          <div className="space-y-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              Innovation
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              <span className="bg-gradient-to-b from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
                Innovation
              </span>
              :
              <span className="bg-gradient-to-b from-gray-500 via-gray-600 to-gray-400 bg-clip-text text-transparent">
                {' '}
                Digital Syndication
              </span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300 mx-auto">
              Revolutionary technology meets traditional racing - experience the future of thoroughbred ownership with our cutting-edge digital platform that makes investing accessible to everyone.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="grid gap-6 md:grid-cols-3 mt-12"
          >
            {innovationPanels.map((panel) => (
              <motion.div
                key={panel.title}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface/50 p-6 text-left shadow-lg shadow-black/20"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  {panel.title}
                </h3>
                {panel.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-foreground/85">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="faq" className="px-6 py-48 sm:px-12 md:px-24 lg:px-32 xl:px-48 m-0 p-0 border-none mx-auto max-w-7xl">
          <div className="space-y-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              Support
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300 mx-auto">
              Got questions about digital racehorse ownership? We've got answers. Our comprehensive FAQ covers everything from getting started to managing your stable.
            </p>
          </div>
          <div className="mt-12">
            <SplitFaq items={faqItems} className="mx-auto max-w-4xl" />
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Hooves-on-grass.png" height="h-[50vh]" overlay="from-black/10 to-black/30" />
        </section>

        <section id="mystable" className="px-6 py-48 text-center sm:px-12 md:px-24 lg:px-32 xl:px-48 m-0 p-0 border-none mx-auto max-w-7xl">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              MyStable
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              <span className="bg-gradient-to-b from-gray-400 via-gray-500 to-gray-300 bg-clip-text text-transparent">
                MyStable
              </span>
              :
              <span className="bg-gradient-to-b from-gray-500 via-gray-600 to-gray-400 bg-clip-text text-transparent">
                {' '}
                Everything You Need, In One Stable Place
              </span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300 mx-auto">
              Manage your ownership, monitor your assets, stay connected. Simple, secure, and all in one spot.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="outline"
                className="rounded-full border-white/30 text-gray-100 hover:border-brand-gold hover:text-brand-gold"
                onClick={() => scrollToId('login')}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                className="rounded-full bg-brand-gold text-black hover:bg-brand-gold/90"
                onClick={() => scrollToId('get-started')}
              >
                Explore Digital Ownership
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
