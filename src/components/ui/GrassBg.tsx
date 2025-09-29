"use client";

import React, { useState } from "react";
import FixedBg from "./FixedBg";

type GrassBgProps = {
  src: string;
  height?: string;
  className?: string;
};

export function GrassBg({ 
  src, 
  height = 'h-[50vh]', 
  className = '' 
}: GrassBgProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FixedBg 
        src={src} 
        height={height} 
        overlay="from-black/10 to-black/40"
      />
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="relative z-10 text-center p-6 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 transform transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            Experience the Future of Horse Racing
          </h3>
          <p className="text-gray-200 text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
            Join the revolution in racehorse ownership today
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </div>
  );
}

export default GrassBg;
