import React from "react";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group border border-white/10 bg-black/60 px-6 py-4 transition hover:border-brand-gold/60"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold uppercase tracking-[0.3em] text-gray-200">
            <span>{item.question}</span>
            <span className="text-brand-gold transition group-open:rotate-90">&rsaquo;</span>
          </summary>
          <div className="mt-3 text-sm leading-relaxed text-gray-300">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
