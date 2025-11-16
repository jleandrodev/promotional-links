'use client';

import { ReactNode, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';

interface ButtonGlowProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function ButtonGlow({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false 
}: ButtonGlowProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative
        px-8
        py-4
        rounded-xl
        font-semibold
        text-lg
        transition-all
        duration-300
        overflow-hidden
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 shadow-lg shadow-amber-500/50' 
          : 'bg-white/20 text-white border border-white/30'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

