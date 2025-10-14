"use client";

import React, { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type SplitFaqProps = {
  items: FaqItem[];
  className?: string;
};

export function SplitFaq({ items, className = "" }: SplitFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  return (
    <div className={className} onMouseLeave={handleMouseLeave}>
      {items.map((item, index) => {
        const contentId = `faq-panel-${index}`;
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="animate-[slideUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <button 
              onClick={() => toggleQuestion(index)}
              className="w-full py-8 border-t border-foreground/10 transition-all duration-500 ease-out text-left cursor-pointer hover:border-foreground/20"
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg md:text-xl lg:text-2xl font-normal transition-colors duration-300 ease-out text-left ${
                  isOpen ? 'text-foreground' : 'text-foreground/80'
                }`}>
                  {item.question}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-foreground/60 transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </button>
            <div
              id={contentId}
              role="region"
              className={`overflow-hidden transition-all duration-400 ease-out ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div
                className={`text-base text-foreground/60 max-w-2xl pt-4 pb-8 transition-opacity duration-300 ease-out ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

