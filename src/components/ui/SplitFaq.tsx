"use client";

import React from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type SplitFaqProps = {
  items: FaqItem[];
  className?: string;
};

export function SplitFaq({ items, className = "" }: SplitFaqProps) {
  return (
    <div className={className}>
      {items.map((item, index) => {
        const contentId = `faq-panel-${index}`;
        return (
          <div
            key={item.question}
            className="group animate-[slideUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="w-full py-8 border-t border-foreground/10 transition-all duration-700 ease-out">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-700 ease-out text-left">
                  {item.question}
                </h3>
                <svg
                  className="h-5 w-5 shrink-0 text-foreground/60 transition-transform duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)] group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
            <div
              id={contentId}
              role="region"
              className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)] group-hover:max-h-96 max-h-0"
            >
              <div
                className="text-base text-foreground/60 max-w-2xl pt-4 pb-8 transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:delay-150"
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

