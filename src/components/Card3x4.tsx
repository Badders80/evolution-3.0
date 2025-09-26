"use client";

import { motion } from "framer-motion";

interface Card3x4Props {
  image: string;
  title: string;
  description: string;
  bullets?: string[];
}

export default function Card3x4({
  image,
  title,
  description,
  bullets = [],
}: Card3x4Props) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/5 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] hover:ring-white/10"
    >
      {/* Image */}
      <motion.div
        initial={{ scale: 1, y: 0 }}
        whileHover={{ scale: 0.93, y: -16 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="aspect-[3/4] overflow-hidden p-3"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full rounded-xl object-cover"
        />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="px-5 text-lg font-semibold text-amber-400"
      >
        {title}
      </motion.h3>

      {/* Content (always visible on mobile, reveal on desktop hover) */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.32, ease: "easeOut" }}
        className="px-5 pb-6 text-sm text-gray-300 md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0"
      >
        <p className="mb-2">{description}</p>
        <ul className="space-y-1">
          {bullets.map((item, i) => (
            <li key={i} className="list-disc list-inside">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
