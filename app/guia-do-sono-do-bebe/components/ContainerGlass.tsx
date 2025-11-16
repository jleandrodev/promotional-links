'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ContainerGlassProps {
  children: ReactNode;
  className?: string;
}

export function ContainerGlass({ children, className = '' }: ContainerGlassProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        rounded-2xl
        shadow-2xl
        p-8
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

