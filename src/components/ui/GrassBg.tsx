"use client";

import React from "react";
import FixedBg from "./FixedBg";

type GrassBgProps = {
  src: string;
  height?: React.ComponentProps<typeof FixedBg>["height"];
  className?: string;
};

export function GrassBg({
  src,
  height = 'h-[50vh]',
  className = '',
}: GrassBgProps) {
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <FixedBg
        src={src}
        height={height}
        overlay="from-background/20 to-background/60"
      />
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 opacity-95 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/45 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-90" />
        <div className="relative z-10 max-w-2xl p-6 text-center">
          <h3 className="heading-lg md:text-4xl text-foreground mb-4 transition-transform duration-700 group-hover:-translate-y-1">
            Experience the Future of Horse Racing
          </h3>
          <p className="body-text text-lg md:text-xl text-foreground/90 transition-colors duration-700 group-hover:text-foreground">
            Join the revolution in racehorse ownership today
          </p>
        </div>
      </div>
    </div>
  );
}

export default GrassBg;


