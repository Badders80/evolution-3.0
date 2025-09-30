"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /**
   * Parallax intensity in pixels at most (positive values move slower than scroll)
   * e.g. 40 means the image will translate within [-40px, 40px] across its viewport exposure
   */
  intensity?: number;
  /**
   * Optional className for the wrapper
   */
  className?: string;
  /**
   * If set, fills its parent (absolute positioning). Otherwise behaves like a block element.
   */
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  /**
   * Optional class for the underlying <Image>
   */
  imageClassName?: string;
  /**
   * Slight scale to avoid revealing edges when translating
   */
  scale?: number;
}

export function ParallaxImage({
  src,
  alt,
  intensity = 40,
  className = "",
  fill = false,
  priority,
  width,
  height,
  sizes,
  imageClassName,
  scale = 1.05,
}: ParallaxImageProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });

  // Only start parallax after scrolling 50% of the page
  const delayedScrollProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, 1]
  );

  // Map scroll progress to a y-translation range
  const yRaw = useTransform(delayedScrollProgress, [0, 1], [0, -intensity * 2]);
  
  // Spring for smoothness
  const y = useSpring(yRaw, { 
    stiffness: 120, 
    damping: 20, 
    mass: 0.3 
  });

  return (
    <div
      ref={ref}
      className={`${fill ? '' : 'overflow-hidden'} ${className || ''}`}
      style={{ position: fill ? "absolute" as const : undefined, inset: fill ? 0 : undefined }}
    >
      <motion.div style={{ y, scale, willChange: "transform" }} className={fill ? "absolute inset-0" : undefined}>
        <Image
          src={src}
          alt={alt}
          priority={priority}
          {...(fill ? { fill: true } : { width: width || 1920, height: height || 1080 })}
          className={imageClassName || "object-cover"}
          sizes={sizes || (fill ? "100vw" : undefined)}
        />
      </motion.div>
    </div>
  );
}

export default ParallaxImage;
