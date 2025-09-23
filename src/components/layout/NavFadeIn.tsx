'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface NavFadeInProps {
  children: React.ReactNode;
  delay?: number;
}

export function NavFadeIn({ children, delay = 0 }: NavFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}