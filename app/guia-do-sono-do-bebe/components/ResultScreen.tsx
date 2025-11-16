'use client';

import { motion } from 'framer-motion';
import { ContainerGlass } from './ContainerGlass';
import { ButtonGlow } from './ButtonGlow';
import { useRouter } from 'next/navigation';

import type { Answer } from '../page';

interface AnswerWithRequired extends Answer {
  age: string;
  wakeUps: string;
  difficulty: string;
  feeling: string;
}

interface ResultScreenProps {
  answers: AnswerWithRequired;
}

export function ResultScreen({ answers }: ResultScreenProps) {
  const router = useRouter();

  const getPersonalizedInsights = () => {
    const insights = [];

    if (answers.age === '0-3') {
      insights.push({
        title: 'Bebês recém-nascidos',
        text: 'Nesta fase, o sono ainda está se desenvolvendo. Nosso método adapta-se perfeitamente à idade do seu bebê.',
      });
    } else if (answers.age === '4-6') {
      insights.push({
        title: 'Período de transição',
        text: 'Entre 4-6 meses, os padrões de sono começam a se consolidar. É o momento ideal para estabelecer rotinas.',
      });
    } else if (answers.age === '7-12') {
      insights.push({
        title: 'Desenvolvimento acelerado',
        text: 'Nesta fase, seu bebê está mais ativo. Nosso método ajuda a criar hábitos de sono consistentes.',
      });
    }

    if (answers.wakeUps === '4+' || answers.wakeUps === 'perdi-as-contas') {
      insights.push({
        title: 'Múltiplos despertares',
        text: 'Despertares frequentes são comuns e têm solução. O método ensina técnicas para reduzir gradualmente esses acordares.',
      });
    }

    if (answers.difficulty === 'só-dorme-colo') {
      insights.push({
        title: 'Dependência do colo',
        text: 'Muitas mães passam por isso. O método oferece estratégias gentis para ajudar seu bebê a dormir no berço.',
      });
    }

    if (answers.feeling === 'exausta' || answers.feeling === 'desesperada') {
      insights.push({
        title: 'Você não está sozinha',
        text: 'Milhares de mães já transformaram suas noites com nosso método validado e comprovado.',
      });
    }

    return insights;
  };

  const insights = getPersonalizedInsights();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <ContainerGlass className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-light text-[#141414] mb-6"
        >
          ✨ Mamãe, você não está sozinha.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-[#141414] mb-4 leading-relaxed"
        >
          A fase que você está passando é muito mais comum do que parece — e tem solução.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-[#141414]/90 mb-6 leading-relaxed"
        >
          Com base no que você respondeu, já conseguimos identificar o caminho ideal para ajudar o seu bebê a dormir melhor e para <strong>VOCÊ</strong> voltar a descansar.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-[#141414]/90 mb-8 leading-relaxed"
        >
          Nosso <strong>Guia do Sono do Bebê</strong> utiliza um método validado, simples e gentil, que já ajudou milhares de mães exaustas a transformarem as noites em poucas semanas.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xl text-[#141414] mb-8"
        >
          Você merece paz, descanso e noites tranquilas. 💛
          <br />
          E nós vamos te ajudar a chegar lá.
        </motion.p>
      </motion.div>

      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid gap-4 mb-8"
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <h3 className="text-amber-400 font-semibold mb-2">{insight.title}</h3>
              <p className="text-[#141414]/90 text-sm">{insight.text}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="flex justify-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ButtonGlow onClick={handleCheckout} className="text-xl px-12 py-6">
            Quero acessar o método agora
          </ButtonGlow>
        </motion.div>
      </motion.div>
    </ContainerGlass>
  );
}

