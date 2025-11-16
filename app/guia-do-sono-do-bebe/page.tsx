'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { LoadingIA } from './components/LoadingIA';
import { ResultScreen } from './components/ResultScreen';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import './styles/page.css';

type Screen = 'questions' | 'loading' | 'result';

export interface Answer {
  age?: string;
  wakeUps?: string;
  difficulty?: string;
  feeling?: string;
}

const QUESTIONS = [
  {
    id: 'age',
    question: 'Qual é a idade do seu bebê?',
    options: [
      { value: '0-3', label: '0–3 meses' },
      { value: '4-6', label: '4–6 meses' },
      { value: '7-12', label: '7–12 meses' },
      { value: '1+', label: '1 ano ou mais' },
    ],
  },
  {
    id: 'wakeUps',
    question: 'Quantas vezes seu bebê acorda durante a noite?',
    options: [
      { value: '1', label: '1 vez' },
      { value: '2-3', label: '2–3 vezes' },
      { value: '4+', label: '4+ vezes' },
      { value: 'perdi-as-contas', label: 'Perdi as contas' },
    ],
  },
  {
    id: 'difficulty',
    question: 'O que mais descreve sua maior dificuldade hoje?',
    options: [
      { value: 'só-dorme-colo', label: 'Meu bebê só dorme no colo' },
      { value: 'acorda-chorando', label: 'Acorda chorando o tempo todo' },
      { value: 'não-aceita-rotina', label: 'Não aceita rotina / sonecas' },
      { value: 'dormir-noite-inteira', label: 'Quero que ele durma a noite inteira' },
    ],
  },
  {
    id: 'feeling',
    question: 'Como você se sente nesse momento?',
    options: [
      { value: 'exausta', label: 'Exausta' },
      { value: 'desesperada', label: 'Desesperada' },
      { value: 'perdida', label: 'Perdida e sem saber o que fazer' },
      { value: 'preciso-ajuda', label: 'Preciso urgentemente de ajuda' },
    ],
  },
];

export default function GuiaDoSonoPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('questions');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const { playSound } = useAudioPlayer();

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const selectedValue = answers[currentQuestion.id as keyof Answer] as string | undefined;
  const canProceed = !!selectedValue;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!canProceed) return;

    playSound('next', 0.2);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Última pergunta respondida, ir para loading
      setCurrentScreen('loading');
      playSound('scan', 0.15);

      // Após 5s, ir para resultado
      setTimeout(() => {
        setCurrentScreen('result');
      }, 5000);
    }
  };

  return (
    <div className="guia-sono-container">
      <div className="guia-sono-background" />
      
      <div className="guia-sono-content">
        <AnimatePresence mode="wait">
          {currentScreen === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={QUESTIONS.length}
              />
              <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedValue={selectedValue}
                onSelect={handleSelect}
                onNext={handleNext}
                canProceed={canProceed}
              />
            </motion.div>
          )}

          {currentScreen === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <LoadingIA />
            </motion.div>
          )}

          {currentScreen === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {answers.age && answers.wakeUps && answers.difficulty && answers.feeling && (
                <ResultScreen 
                  answers={{
                    age: answers.age,
                    wakeUps: answers.wakeUps,
                    difficulty: answers.difficulty,
                    feeling: answers.feeling,
                  }} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

