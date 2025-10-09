'use client';

import React from 'react';
import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { GrassBg } from '@/components/ui/GrassBg';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/site/HeroSection';

const faqItems = [
  {
    question: 'What do investors or racing fans get out of it?',
    answer: 'The thrill of ownership without long-term commitments. Transparent costs, flexible stakes, and real participation.'
  },
  {
    question: "What's in it for owners, syndicators, or breeders?",
    answer:
      'Access to new investors while keeping full control. You set the terms - length, price, and structure.',
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
      "We're the home of digital-syndication - combining industry knowledge with a financial-grade platform to lower barriers and grow racing for the next generation.",
  },
];

const Home = () => {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <main className="text-foreground">
        <div className="w-full bg-background px-0 shadow-[0_0_80px_RGBA(0,0,0,0.35)] m-0 p-0 border-none max-w-none">
          <HeroSection />
        </div>
        
        <section id="about" className="py-48 bg-background text-foreground">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="eyebrow mb-4">
              ABOUT
            </p>

            {/* Headline */}
            <h2 className="heading-xl mb-6">
              OWN THE EXPERIENCE
            </h2>

            {/* Lead Paragraph */}
            <p className="body-text max-w-3xl">
              Racehorse ownership has always been limited and complex. Evolution Stables is here to change that. Removing barriers - delivering access to first-time fans and seasoned owners alike to not just participate, but own the thrill of thoroughbred horse racing.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                variant="outline"
                className="gap-3 uppercase tracking-[0.2em]"
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
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[50vh]" />
        </section>

        <section id="mission" className="py-48 bg-background text-foreground">
          <div className="max-w-4xl mx-auto px-6">
            {/* Section Label */}
            <p className="eyebrow mb-4">
              OUR MISSION
            </p>

            {/* Headline and Lead Paragraph Side by Side */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <h2 className="heading-xl">
                HOW IT WORKS
              </h2>
              <p className="body-text text-foreground max-w-xs ml-24">
                Empowering every role in racing with transparent, flexible paths forward.
              </p>
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
            <p className="body-text max-w-3xl mx-auto">
              Got questions about digital racehorse ownership? We&apos;ve got answers. Our comprehensive FAQ covers everything from getting started to managing your stable.
            </p>
          </div>

          {/* FAQ Component */}
          <div className="max-w-5xl mx-auto px-6 mt-12">
            <SplitFaq items={faqItems} className="mx-auto max-w-4xl" />
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;


