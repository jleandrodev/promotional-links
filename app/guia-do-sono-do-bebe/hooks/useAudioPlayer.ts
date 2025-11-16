'use client';

import { useRef, useCallback } from 'react';

export function useAudioPlayer() {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = useCallback((soundName: string, volume: number = 0.3) => {
    try {
      if (!audioRefs.current[soundName]) {
        audioRefs.current[soundName] = new Audio(`/sounds/${soundName}.mp3`);
        audioRefs.current[soundName].volume = volume;
      }
      audioRefs.current[soundName].play().catch(() => {
        // Silenciosamente ignora erros de reprodução (usuário pode não ter interagido ainda)
      });
    } catch (error) {
      // Ignora erros de áudio
    }
  }, []);

  return { playSound };
}

