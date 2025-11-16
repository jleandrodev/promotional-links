'use client';

import { motion } from 'framer-motion';
import { ContainerGlass } from './ContainerGlass';

export function LoadingIA() {
  return (
    <ContainerGlass className="w-full max-w-2xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-light text-[#141414] mb-8"
      >
        IA analisando suas respostas…
      </motion.h2>

      <div className="flex justify-center items-center space-x-2 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-amber-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-md mx-auto h-1 bg-white/10 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="mt-8 text-[#141414]/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Processando informações personalizadas...
      </motion.div>
    </ContainerGlass>
  );
}

