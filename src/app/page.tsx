'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/site/HeroSection';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { Button } from '@/components/ui/Button';
import { FixedBg } from '@/components/ui/FixedBg';
import { GrassBg } from '@/components/ui/GrassBg';

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

        <section className="px-8 pb-24 md:px-12">
          <div className="w-full -mx-8 md:-mx-12">
            <Image
              src="/images/Background-hooves-back-and-white.jpg"
              alt="Galloping hooves"
              width={1920}
              height={768}
              className="w-full h-auto object-cover border border-white/10"
              priority
              sizes="100vw"
            />
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

            <div className="w-full -mx-8 md:-mx-12">
              <Image
                src="/images/Horse-and-foal.jpg"
                alt="Horse and foal"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover border border-white/10"
                sizes="100vw"
              />
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

            <figure className="w-full -mx-8 md:-mx-12">
              <Image
                src="/images/Horse-and-foal.jpg"
                alt="Owners collaborating"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover border border-white/10"
                sizes="100vw"
              />
            </figure>
          </div>
        </section>

        <section id="regulated-marketplace" className="px-8 pb-24 md:px-12">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
                Regulated Marketplace
              </span>
              <h2 className="text-4xl font-semibold text-white sm:text-5xl">
                Transformation Powered by <span className="text-brand-gold">Tokinvest</span>
              </h2>
              <p className="max-w-3xl text-base leading-relaxed text-gray-300">
                The Evolution Stables Marketplace is where digital-syndication comes alive - a seamless platform powered by Tokinvest&apos;s secure, compliant, and globally scalable infrastructure.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col gap-3 text-left">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                  <svg className="h-6 w-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white">
                  Discover Opportunities
                </h3>
                <p className="text-sm font-light leading-relaxed text-gray-300">
                  Browse available syndications and short-term leases, all clearly structured and fully transparent.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-left">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                  <svg className="h-6 w-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white">
                  Trade with Confidence
                </h3>
                <p className="text-sm font-light leading-relaxed text-gray-300">
                  Tokinvest&apos;s regulated platform ensures secure transactions, clear ownership records, and smooth settlements.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-left">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                  <svg className="h-6 w-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white">
                  Stay Connected
                </h3>
                <p className="text-sm font-light leading-relaxed text-gray-300">
                  Follow your horses, track performance, and manage your positions in real time.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-4">
              <Button
                variant="outline"
                className="inline-flex items-center gap-3 rounded-3xl border-brand-gold uppercase tracking-[0.2em] text-brand-gold hover:bg-brand-gold hover:text-black"
                asChild
              >
                <Link href="https://tokinvest.capital/" target="_blank" rel="noopener noreferrer">
                  Learn About Tokinvest
                  <span aria-hidden className="text-base">&rsaquo;</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center gap-3 rounded-3xl border-brand-gold uppercase tracking-[0.2em] text-brand-gold hover:bg-brand-gold hover:text-black"
                asChild
              >
                <Link href="/marketplace">
                  Explore Marketplace
                  <span aria-hidden className="text-base">&rsaquo;</span>
                </Link>
              </Button>
            </div>
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

            {/* Steps List */}
            <div className="space-y-4">
              {/* Step One */}
              <div className="group rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-baseline">
                  <div className="flex flex-shrink-0 items-baseline sm:w-56 sm:justify-end">
                    <span className="text-xl font-medium uppercase tracking-[0.4em] text-muted-foreground group-hover:scale-110 group-hover:text-primary transition-all duration-300 text-left sm:text-right">
                      STEP ONE
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-semibold uppercase">For Investors & Fans</h3>
                    <p className="max-w-md leading-relaxed text-muted-foreground">
                      Step into ownership without long-term commitments. Transparent costs,
                      fractional stakes, and the genuine thrill of racing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Two */}
              <div className="group rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-baseline">
                  <div className="flex flex-shrink-0 items-baseline sm:w-56 sm:justify-end">
                    <span className="text-xl font-medium uppercase tracking-[0.4em] text-muted-foreground group-hover:scale-110 group-hover:text-primary transition-all duration-300 text-left sm:text-right">
                      STEP TWO
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-semibold uppercase">For Breeders & Syndicators</h3>
                    <p className="max-w-md leading-relaxed text-muted-foreground">
                      Unlock new income streams on your terms while retaining control. Access a fresh market of
                      passionate investors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Three */}
              <div className="group rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-baseline">
                  <div className="flex flex-shrink-0 items-baseline sm:w-56 sm:justify-end">
                    <span className="text-xl font-medium uppercase tracking-[0.4em] text-muted-foreground group-hover:scale-110 group-hover:text-primary transition-all duration-300 text-left sm:text-right">
                      STEP THREE
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-semibold uppercase">For Clubs & Organizations</h3>
                    <p className="max-w-md leading-relaxed text-muted-foreground">
                      Future-proof racing by welcoming broader audiences, fostering participation, and unlocking
                      sustainable revenue pathways.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[50vh]" />
        </section>

        <section id="digital-syndication" className="py-48 bg-background text-foreground">
          <div className="max-w-5xl mx-auto px-6">
            {/* Two Column Layout */}
            <div className="grid gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">

              {/* LEFT COLUMN */}
              <div className="space-y-6">
                {/* Section Label */}
                <p className="eyebrow">
                  OUR MODEL
                </p>

                {/* Headline */}
                <h2 className="heading-xl">
                  Digital <span className="text-primary">Syndication</span>
                </h2>

                {/* Lead Paragraph */}
                <p className="body-text">
                  Forged by tradition, transformed with innovation. Syndication has stood the test of time: shared ownership, shared risk, shared passion. Our digital-syndication model isn&apos;t here to replace it - but to evolve it.
                </p>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-8 pt-16">
                {/* Features List */}
                <div className="space-y-4">
                  {/* Increased Access Section */}
                  <div className="group p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Image 
                          src="/images/Untitled design (35).svg" 
                          alt="INCREASED ACCESS"
                          width={48}
                          height={48}
                          className="w-10 h-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(90%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-subheading font-medium text-foreground mb-2 uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
                          INCREASED ACCESS
                        </h4>
                        <p className="text-muted leading-relaxed max-w-[42ch] group-hover:text-foreground transition-colors duration-300">
                          <span className="block">A digital platform that lowers barriers and</span>
                          <span className="block">opens ownership to everyone.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Greater Transparency Section */}
                  <div className="group p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Image 
                          src="/images/Untitled design (37).svg" 
                          alt="GREATER TRANSPARENCY"
                          width={48}
                          height={48}
                          className="w-10 h-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(90%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-subheading font-medium text-foreground mb-2 uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
                          GREATER TRANSPARENCY
                        </h4>
                        <p className="text-muted leading-relaxed max-w-[42ch] group-hover:text-foreground transition-colors duration-300">
                          <span className="block">Real-time performance, clear costs, and</span>
                          <span className="block">open communication.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Borderless Flexibility Section */}
                  <div className="group p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Image 
                          src="/images/Untitled design (36).svg" 
                          alt="BORDERLESS FLEXIBILITY"
                          width={48}
                          height={48}
                          className="w-10 h-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(90%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-subheading font-medium text-foreground mb-2 uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
                          BORDERLESS FLEXIBILITY
                        </h4>
                        <p className="text-muted leading-relaxed max-w-[42ch] group-hover:text-foreground transition-colors duration-300">
                          <span className="block">Fractional shares and short-term</span>
                          <span className="block">commitments for modern investors.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Horse-and-foal.jpg" height="h-[50vh]" />
        </section>

        <section id="innovation" className="py-48 bg-background text-foreground">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="eyebrow mb-4">
              REGULATED MARKETPLACE
            </p>

            {/* Headline */}
            <h2 className="heading-xl mb-6">
              Transformation Powered by <span className="text-primary">Tokinvest</span>
            </h2>

            {/* Lead Paragraph */}
            <p className="body-text max-w-3xl">
              The Evolution Stables Marketplace is where digital-syndication comes alive - a seamless platform powered by Tokinvest&apos;s secure, compliant, and globally scalable infrastructure.
            </p>
          </div>

          {/* Features */}
          <div className="max-w-5xl mx-auto px-6 mt-20">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="group flex flex-col gap-4 relative p-6 rounded-lg transition-colors duration-300">
                <div className="absolute left-0 -top-4 -bottom-4 w-[0.5px] bg-border/80 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-muted group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h4 className="text-subheading font-medium text-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">Discover Opportunities</h4>
                  <p className="text-muted leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    Browse available syndications and short-term leases, all clearly structured and fully transparent.
                  </p>
                </div>
              </div>

              <div className="group flex flex-col gap-4 relative p-6 rounded-lg transition-colors duration-300">
                <div className="absolute left-0 -top-4 -bottom-4 w-[0.5px] bg-border/80 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-muted group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h4 className="text-subheading font-medium text-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">Trade with Confidence</h4>
                  <p className="text-muted leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    Tokinvest&apos;s regulated platform ensures secure transactions, clear ownership records, and smooth settlements.
                  </p>
                </div>
              </div>

              <div className="group flex flex-col gap-4 relative p-6 rounded-lg transition-colors duration-300">
                <div className="absolute left-0 -top-4 -bottom-4 w-[0.5px] bg-border/80 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-muted group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-subheading font-medium text-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-300">Stay Connected</h4>
                  <p className="text-muted leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    Follow your horses, track performance, and manage your positions in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="get-started" className="bg-background">
          <GrassBg src="/images/Hooves-on-grass.png" />
        </section>


        <section id="faq" className="py-48 bg-background text-foreground">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="eyebrow mb-4">
              FAQ
            </p>

            {/* Headline */}
            <h2 className="heading-xl mb-6">
              Frequently Asked Questions
            </h2>

            {/* Lead Paragraph */}
            <p className="body-text max-w-3xl">
              Got questions about digital racehorse ownership? We&apos;ve got answers. Our comprehensive FAQ covers everything from getting started to managing your stable.
            </p>
          </div>

          {/* FAQ Component */}
          <div className="max-w-5xl mx-auto px-6 mt-48">
            <SplitFaq items={faqItems} className="mx-auto max-w-4xl" />
          </div>
        </section>

        <section className="px-8 pb-24 md:px-12">
          <div className="w-full -mx-8 md:-mx-12">
            <Image
              src="/images/Hooves-on-grass.png"
              alt="Hooves on grass"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover border border-white/10"
              sizes="100vw"
            />
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





