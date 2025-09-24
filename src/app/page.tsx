'use client';

import React from 'react';
import Image from 'next/image';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { FixedBg } from '@/components/ui/FixedBg';
import Link from 'next/link';
import { HeroSection } from '@/components/site/HeroSection';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

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
    question: "What’s in it for owners, syndicators, or breeders?",
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
      "No heavy commitments. Flexible, transparent, and accessible — ownership for all.",
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
      <div className="container px-0 w-full bg-black shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <HeroSection />

        <section className="px-0 pb-20 pt-16" id="entry">
          <div className="aspect-[32/9] w-full border border-border bg-surface/60 rounded-lg" />
        </section>

        <section id="mission" className="px-6 sm:px-12 md:px-24 pb-24">
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
              Traditional racehorse ownership — often limited and complex. We're changing that. Evolution Stables, through our makes it accessible, transparent, and flexible, putting the thrill of racing into the hands of everyone—from first-time fans to seasoned owners.
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

        <section className="px-0 md:px-0">
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[50vh]" overlay="from-black/20 to-black/40" />
        </section>

        <section id="evolution-way" className="px-6 sm:px-12 md:px-24 pt-24 pb-24">
          <div className="space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                OWNERSHIP, THE EVOLUTION WAY
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                DIGITAL-<span className="text-brand-gold">SYNDICATION</span>
              </h2>
              <p className="text-lg text-foreground/85 leading-relaxed">
                The modern way to experience ownership — traditional syndication with a digital twist.
                We’ve taken the time-tested principles of syndication — sharing risk, sharing reward, and enjoying the thrill of racing together — and evolved them into our own model: digital-<span className="text-brand-gold">syndication</span>. It delivers the same sense of passion and connection, while adding what today’s owners expect: clarity, flexibility, and borderless access.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Panel 1 - For Investors & Fans */}
              <div className="space-y-6 bg-surface/30 rounded-lg p-8 border border-border/50 shadow-lg shadow-black/20">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/Horse-and-foal.jpg"
                    alt="Investors enjoying racehorse ownership"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-brand-gold">
                    For Investors & Fans
                  </h3>
                  <p className="text-lg font-medium text-foreground">
                    Experience racehorse ownership without long-term commitments.
                  </p>
                  <ul className="space-y-3 text-foreground/85">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-gold mt-1">•</span>
                      <span>Transparent costs and stakes sharing so you can choose what works for you.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-gold mt-1">•</span>
                      <span>Join the community and enjoy the thrill of racing, on your terms.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Panel 2 - For Breeders & Syndicators */}
              <div className="space-y-6 bg-surface/30 rounded-lg p-8 border border-border/50 shadow-lg shadow-black/20">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/Background-hooves-back-and-white.jpg"
                    alt="Breeders and syndicators managing horses"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-brand-gold">
                    For Breeders & Syndicators
                  </h3>
                  <p className="text-lg font-medium text-foreground">
                    Unlock a new market of participants and income streams.
                  </p>
                  <ul className="space-y-3 text-foreground/85">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-gold mt-1">•</span>
                      <span>Set your own terms — length, price, and stakes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-gold mt-1">•</span>
                      <span>Maintain full control and ownership.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Panel 3 - For Clubs, Organisations & Governing Bodies */}
              <div className="space-y-6 bg-surface/30 rounded-lg p-8 border border-border/50 shadow-lg shadow-black/20">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/Hooves-on-grass.png"
                    alt="Racing industry organizations and governance"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-brand-gold">
                    For Clubs, Organisations & Governing Bodies
                  </h3>
                  <p className="text-lg font-medium text-foreground">
                    Generate new revenue streams for current participants.
                  </p>
                  <ul className="space-y-3 text-foreground/85">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-gold mt-1">•</span>
                      <span>Attract the next generation into the industry.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-gold mt-1">•</span>
                      <span>Futureproof racing through inclusivity and participation.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 md:px-0">
          <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[50vh]" overlay="from-black/10 to-black/30" />
        </section>

        <section id="innovation" className="px-6 sm:px-12 md:px-24 pt-24 pb-24">
          <div className="flex flex-col gap-16">
            <div className="space-y-3 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                Innovation
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-gray-300 via-white to-gray-300">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 via-gray-500 to-gray-300">Innovation</span>: <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-500 via-gray-600 to-gray-400">Digital Syndication</span>
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } } }}
              className="grid gap-6 md:grid-cols-3"
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

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="rounded-full border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black"
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Digital Ownership
              </Button>
            </div>

            <FixedBg src="/images/Horse-and-foal.jpg" height="h-[50vh]" overlay="from-black/10 to-black/40" />
          </div>
        </section>

        <section id="faq" className="px-6 sm:px-12 md:px-24 pt-24 pb-24">
          <div className="flex flex-col gap-12">
            <div className="space-y-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
                Support
              </span>
              <h2 className="text-4xl font-semibold uppercase text-white sm:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
            <SplitFaq items={faqItems} className="mx-auto max-w-4xl" />
          </div>
        </section>

        <section className="px-0 md:px-0">
          <FixedBg src="/images/Hooves-on-grass.png" height="h-[50vh]" overlay="from-black/10 to-black/30" />
        </section>

        <section id="mystable" className="px-6 sm:px-12 md:px-24 pt-24 pb-24 text-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
              MyStable
            </span>
            <h2 className="text-4xl font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-b from-gray-300 via-white to-gray-300 sm:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 via-gray-500 to-gray-300">MyStable</span>: <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-500 via-gray-600 to-gray-400">Everything You Need, In One Stable Place</span>
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





