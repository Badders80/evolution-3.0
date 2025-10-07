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
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 max-w-2xl p-6 text-center">
          <h3 className="heading-lg md:text-4xl text-foreground mb-4">
            Experience the Future of Horse Racing
          </h3>
          <p className="body-text text-lg md:text-xl text-foreground/90">
            Join the revolution in racehorse ownership today
          </p>
        </div>
      </div>
    </div>
  );
}

export default GrassBg;

