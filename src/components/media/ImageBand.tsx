import React from 'react';
import Image from 'next/image';

interface ImageBandProps {
  src: string;
  alt: string;
  height?: number;
  className?: string;
}

export default function ImageBand({ 
  src, 
  alt, 
  height = 300,
  className = '' 
}: ImageBandProps) {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}