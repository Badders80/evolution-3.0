'use client';

import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { HeroSection } from '@/components/site/HeroSection';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

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
      'The thrill of ownership without long-term commitments. Transparent costs, flexible stakes, and real participation.',
  },
  {
    question: "What's in it for owners, syndicators, or breeders?",
    answer:
      'Access to new investors while keeping full control. You set the terms — length, price, and structure.',
  },
  {
    question: 'How does this benefit clubs, organisations, and governing bodies?',
    answer:
      'New revenue streams and engagement. Digital-syndication attracts fresh participants and helps futureproof racing.',
  },
  {
    question: 'Is this regulated?',
    answer:
      'Yes. Evolution Stables operates under NZTR rules and global digital-asset frameworks, with Tokinvest providing the compliant infrastructure.',
  },
  {
    question: 'Why is the model different?',
    answer: 'No heavy commitments. Ownership is flexible, transparent, and open to all.',
  },
  {
    question: 'How is Evolution Stables different?',
    answer:
      "We&apos;re the home of digital-syndication — combining industry knowledge with a financial-grade platform to lower barriers and grow racing for the next generation.",
  },
];

export default function Home() {
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="text-gray-100">
      <div className="w-full bg-black px-0 shadow-[0_0_80px_rgba(0,0,0,0.35)] m-0 p-0 border-none max-w-none">
        <HeroSection />

        <section id="mission" className="py-48 bg-black text-white">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
              OUR MISSION
            </p>

            {/* Headline */}
            <h2 className="text-4xl font-medium mb-6">
              OWN THE EXPERIENCE
            </h2>

            {/* Lead Paragraph */}
            <p className="text-lg leading-relaxed text-gray-300 max-w-3xl">
              Racehorse ownership has always been limited and complex. Evolution Stables is here to change that. Removing barriers—delivering access to first-time fans and seasoned owners alike to not just participate, but own the thrill of thoroughbred horse racing.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
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
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[50vh]" overlay="from-black/10 to-black/30" />
        </section>

        <section id="evolution-way" className="py-48 bg-black text-white">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
              ABOUT
            </p>

            {/* Headline */}
            <h2 className="text-4xl font-medium mb-6">
              Our <span className="text-brand-gold">Promise</span>: How It Works
            </h2>
            <p className="text-lg leading-relaxed text-gray-300 max-w-3xl mb-12">
              Empowering every role in racing with transparent, flexible paths forward.
            </p>
          </div>

          {/* Grid */}
          <div className="max-w-5xl mx-auto px-6 mt-20">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700 h-full"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold"><span className="text-brand-gold">For</span> Investors & Fans</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Step into ownership without long-term commitments.<br />
                    <span className="text-gray-300">Transparent costs, fractional stakes, and the genuine thrill of racing.</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700 h-full"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold"><span className="text-brand-gold">For</span> Breeders & Syndicators</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Unlock new income streams on your terms—flexible structures while retaining control.<br />
                    <span className="text-gray-300">Access a fresh market of passionate investors.</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700 h-full"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V9.75M9 21h6m-6-4h6m-6-4h6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold"><span className="text-brand-gold">For</span> Clubs & Organisations</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Future-proof racing by welcoming broader audiences, fostering participation, and unlocking sustainable revenue pathways.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[50vh]" overlay="from-black/10 to-black/30" />
        </section>

        <section id="digital-syndication" className="py-48 bg-black text-white">
          <div className="max-w-5xl mx-auto px-6">
            {/* Two Column Layout */}
            <div className="grid gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">

              {/* LEFT COLUMN */}
              <div className="space-y-6">
                {/* Section Label */}
                <p className="text-sm tracking-widest text-gray-400 uppercase">
                  OUR MODEL
                </p>

                {/* Headline */}
                <h2 className="text-4xl font-medium">
                  Digital <span className="text-brand-gold">Syndication</span>
                </h2>

                {/* Lead Paragraph */}
                <p className="text-lg leading-relaxed text-gray-300">
                  Forged by tradition, transformed with innovation. Syndication has stood the test of time: shared ownership, shared risk, shared passion. Our digital-syndication model isn&apos;t here to replace it — but to evolve it.
                </p>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-8 pt-16">
                {/* Features List */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <svg className="h-12 w-12 text-gray-500 mt-1" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Increased Access</h4>
                      <p className="text-gray-400 leading-relaxed max-w-[42ch]">
                        <span className="block">A digital platform that lowers barriers and</span>
                        <span className="block">opens ownership to everyone.</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <svg className="h-12 w-12 text-gray-500 mt-1" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Greater Transparency</h4>
                      <p className="text-gray-400 leading-relaxed max-w-[42ch]">
                        <span className="block">Real-time performance, clear costs, and</span>
                        <span className="block">open communication.</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <svg className="h-12 w-12 text-gray-500 mt-1" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Borderless Flexibility</h4>
                      <p className="text-gray-400 leading-relaxed max-w-[42ch]">
                        <span className="block">Fractional shares and short-term</span>
                        <span className="block">commitments for modern investors.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Horse-and-foal.jpg" height="h-[50vh]" overlay="from-black/10 to-black/40" />
        </section>

        <section id="innovation" className="py-48 bg-black text-white">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
              REGULATED MARKETPLACE
            </p>

            {/* Headline */}
            <h2 className="text-4xl font-medium mb-6">
              Transformation Powered by <span className="text-brand-gold">Tokinvest</span>
            </h2>

            {/* Lead Paragraph */}
            <p className="text-lg leading-relaxed text-gray-300 max-w-3xl">
              The Evolution Stables Marketplace is where digital-syndication comes alive — a seamless platform powered by Tokinvest&apos;s secure, compliant, and globally scalable infrastructure.
            </p>
          </div>

          {/* Features */}
          <div className="max-w-5xl mx-auto px-6 mt-20">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700 h-full"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Discover Opportunities</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Browse available syndications and short-term leases, all clearly structured and fully transparent.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700 h-full"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Trade with Confidence</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Tokinvest&apos;s regulated platform ensures secure transactions, clear ownership records, and smooth settlements.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700 h-full"></div>
                <div className="pl-6">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Follow your horses, track performance, and manage your positions in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-48 bg-black text-white">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
              SUPPORT
            </p>

            {/* Headline */}
            <h2 className="text-4xl font-medium mb-6">
              Frequently Asked Questions
            </h2>

            {/* Lead Paragraph */}
            <p className="text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto">
              Got questions about digital racehorse ownership? We&apos;ve got answers. Our comprehensive FAQ covers everything from getting started to managing your stable.
            </p>
          </div>

          {/* FAQ Component */}
          <div className="max-w-5xl mx-auto px-6 mt-12">
            <SplitFaq items={faqItems} className="mx-auto max-w-4xl" />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
