import React from 'react';
import { clsx } from 'clsx';

interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spaceY?: number;
}

export function SectionShell({ 
  children, 
  className, 
  id,
  spaceY = 8 
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={clsx(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        {
          'space-y-4': spaceY === 1,
          'space-y-6': spaceY === 1.5,
          'space-y-8': spaceY === 2,
          'space-y-12': spaceY === 3,
          'space-y-16': spaceY === 4,
        },
        className
      )}
    >
      {children}
    </section>
  );
}