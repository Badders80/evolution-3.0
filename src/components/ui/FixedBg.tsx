"use client";

import React from "react";

type FixedBgProps = {
  src: string;
  alt?: string; // for semantics if we decide to add an <img> fallback later
  height?: string; // any Tailwind height class e.g. 'h-[60vh]' | 'h-[50svh]' | 'h-96'
  overlay?: string; // Tailwind background overlay e.g. 'from-black/40 to-black/60'
  className?: string;
};

/**
 * A fixed-background section where content scrolls over a locked background image.
 * Uses CSS background-image for performance. On small screens, falls back to bg-scroll.
 */
export function FixedBg({ src, height = 'h-[60vh]', overlay = 'from-black/20 to-black/40', className = '' }: FixedBgProps) {
  return (
    <div className={`relative w-screen left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] ${className}`}>
      <div
        className={`relative ${height} bg-center bg-cover bg-no-repeat bg-scroll md:bg-fixed`}
        style={{ backgroundImage: `url(${src})` }}
        aria-hidden
      >
        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${overlay}`} />
      </div>
    </div>
  );
}

export default FixedBg;
