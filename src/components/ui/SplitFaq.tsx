"use client";

import React from "react";
import { motion } from "framer-motion";

export type FaqItem = {
  question: string;
  answer: string;
};

type SplitFaqProps = {
  items: FaqItem[];
  className?: string;
};

export function SplitFaq({ items, className = "" }: SplitFaqProps) {
  // Start with all items collapsed so only questions are visible at rest
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className={`grid gap-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-panel-${index}`;
        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl bg-surface/60 ring-1 ring-border/60 shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`group flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors ${
                isOpen ? 'bg-white/5' : 'hover:bg-white/5'
              }`}
            >
              <span className="flex-1 text-base md:text-lg font-medium leading-6 text-foreground">
                {item.question}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 text-brand-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              id={contentId}
              role="region"
              className={`grid overflow-hidden px-6 transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden text-[0.95rem] leading-relaxed text-foreground/85 ${
                  isOpen ? 'py-5 opacity-100' : 'py-0 opacity-0'
                } transition-[padding,opacity] duration-300 ease-out`}
                aria-hidden={!isOpen}
              >
                {item.answer}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}




