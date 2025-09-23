'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/site/HeroSection';
import { Footer } from '@/components/site/Footer';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';

const innovationPanels = [
  {
    title: "For Owners",
    body: [
      "Generate reliable income while keeping full control over your horse&apos;s future.",
      "Tailor lease or syndication terms to fit your model, creating stability and long-term value.",
    ],
  },
  {
    title: "For Investors",
    body: [
      "Enjoy the thrill of ownership with the flexibility to choose your level of involvement.",
      "Buy in with transparent terms, share in race performance, and connect with the racing community &mdash; all without traditional barriers.",
    ],
  },
  {
    title: "For the Industry",
    body: [
      "Drive greater participation and engagement by opening the doors to new investors.",
      "More owners, more energy, and more investment build a stronger, sustainable future for racing.",
    ],
  },
];

const faqItems = [
  {
    question: "What do investors or racing fans get out of it?",
    answer:
      "The thrill of ownership without the long-term commitment. Transparent costs and flexible stake sharing make it accessible to everyone.",
  },
  {
    question: "What&apos;s in it for owners, syndicators, or breeders?",
    answer:
      "Access to new investors while keeping full control and ownership, with flexible terms that suit your model.",
  },
  {
    question: "How does this benefit clubs, organisations, and governing bodies?",
    answer:
      "New revenue streams for current participants, while guiding the next generation into ownership.",
  },
  {
    question: "Is this regulated?",
    answer:
      "Yes, Evolution Stables works within NZTR and VARA frameworks to ensure compliance and investor protection.",
  },
  {
    question: "Why is the model different?",
    answer:
      "No heavy commitments. Flexible, transparent, and accessible &mdash; ownership for all.",
  },
  {
    question: "How is Evolution Stables different?",
    answer:
      "Our focus on transparency and liquidity removes barriers for first-time owners, turning them into active members of the racing community. At the same time, it creates new revenue streams for industry participants, futureproofing racing for generations to come.",
  },
];

export default function Home() {
  return (
    <main className="text-gray-100">
      <NavBar />
      <div className="mx-auto w-full max-w-5xl lg:max-w-6xl bg-black shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        <HeroSection />

        <section className="px-0 pb-20 pt-16" id="entry">
          <div className="aspect-[32/9] w-full border border-white/10 bg-black/60" />
        </section>

        <section id="mission" className="px-8 pb-24 md:px-12">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              Our Mission
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              Ownerhsip
              <br />
              Re-Imagined
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300">
              Traditional racehorse ownership &mdash;
              <span className="text-brand-gold"> expensive, restrictive, and opaque </span>
              &mdash; has historically excluded those who dream of experiencing the thrill firsthand.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-gray-300">
              Evolution Stables removes these barriers, delivering ownership that&apos;s
              <span className="text-brand-gold"> genuinely accessible</span>,
              <span className="text-brand-gold"> fully transparent</span>, and
              <span className="text-brand-gold"> uniquely liquid</span>.
            </p>
            <Button
              variant="outline"
              className="inline-flex items-center gap-3 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black"
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join the revolution
              <span aria-hidden className="text-base">&rsaquo;</span>
            </Button>
          </div>
        </section>

        <section className="px-0 pb-24">
          <div className="relative w-full overflow-hidden border border-white/10">
            <Image
              src="/images/Background-hooves-back-and-white.jpg"
              alt="Galloping hooves"
              width={1920}
              height={768}
              className="h-full w-full object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-black/50" />
          </div>
        </section>

        <section id="evolution-way" className="px-8 pb-24 md:px-12">
          <div className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
                Evolution Way
              </span>
              <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
                Ownership, the Evolution Way
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-brand-gold">
                  Accessible Ownership
                </h3>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-300">
                  Ownership made simple, inclusive, and engaging. Flexible options lower the barriers while keeping the joy and prestige of racing intact.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-brand-gold">
                  Transparency in Our DNA
                </h3>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-300">
                  Clear costs, open updates, no surprises. Stay in control with every decision.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-brand-gold">
                  Your Hub
                </h3>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-300">
                  The digital home for your ownership experience. Manage documents, financials, transactions, and updates &mdash; buy, sell, or trade shares securely in one place.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-brand-gold">
                  Global Racing, Made Local
                </h3>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-300">
                  From New Zealand to the world, connect to racing&apos;s global community without borders.
                </p>
              </div>
            </div>

            <div className="relative w-full overflow-hidden border border-white/10 mx-[-2rem] md:mx-[-3rem]">
              <Image
                src="/images/Horse-and-foal.jpg"
                alt="Horse and foal"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
                sizes="100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
            </div>
          </div>
        </section>

        <section id="innovation" className="px-8 pb-24 md:px-12">
          <div className="flex flex-col gap-16">
            <div className="space-y-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
                Innovation
              </span>
              <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
                Innovation: Digital-Syndication
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {innovationPanels.map((panel) => (
                <div key={panel.title} className="flex h-full flex-col gap-3 border border-white/10 bg-black/60 p-8 text-left">
                  <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-brand-gold">
                    {panel.title}
                  </h3>
                  {panel.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="rounded-full border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black"
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Digital Ownership
              </Button>
            </div>

            <figure className="relative overflow-hidden border border-white/10 mx-[-2rem] md:mx-[-3rem]">
              <Image
                src="/images/Horse-and-foal.jpg"
                alt="Owners collaborating"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
                sizes="100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/40" />
            </figure>
          </div>
        </section>

        <section id="faq" className="px-8 pb-24 md:px-12">
          <div className="flex flex-col gap-12">
            <div className="space-y-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
                Support
              </span>
              <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={faqItems} />
          </div>
        </section>

        <section className="px-0 pb-24">
          <div className="relative w-full overflow-hidden border border-white/10">
            <Image
              src="/images/Hooves-on-grass.png"
              alt="Hooves on grass"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/50" />
          </div>
        </section>

        <section id="mystable" className="px-8 pb-24 text-center md:px-12">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              MyStable
            </span>
            <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
              MyStable: Everything You Need, In One Stable Place
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-300">
              Manage your ownership, monitor your assets, stay connected. Simple, secure, and all in one spot.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="outline"
                className="rounded-full border-white/30 text-gray-100 hover:border-brand-gold hover:text-brand-gold"
                onClick={() => document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                className="rounded-full bg-brand-gold text-black hover:bg-brand-gold/90"
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
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


