'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ContainerGlass } from './ContainerGlass';
import { ButtonGlow } from './ButtonGlow';

interface Option {
  value: string;
  label: string;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  canProceed: boolean;
}

export function QuestionCard({
  question,
  options,
  selectedValue,
  onSelect,
  onNext,
  canProceed,
}: QuestionCardProps) {
  return (
    <ContainerGlass className="w-full max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-light text-[#141414] mb-8 text-center"
      >
        {question}
      </motion.h2>

      <div className="space-y-4 mb-8">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(option.value)}
            className={`
              w-full
              p-4
              rounded-xl
              text-left
              transition-all
              duration-300
              backdrop-blur-sm
              border-2
              ${
                selectedValue === option.value
                  ? 'bg-amber-400/30 border-amber-400 text-[#141414] shadow-lg shadow-amber-400/30'
                  : 'bg-white/10 border-white/20 text-[#141414] hover:bg-white/20 hover:border-white/30'
              }
            `}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center">
        <ButtonGlow onClick={onNext} disabled={!canProceed}>
          Próximo
        </ButtonGlow>
      </div>
    </ContainerGlass>
  );
}

