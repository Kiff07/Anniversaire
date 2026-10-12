import React, { useState } from 'react';
import { QuizQuestion } from '../types/cinema';
import { cinemaAudio } from '../utils/audioEffects';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CinemaQuizProps {
  starName: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'quote',
    prompt: "« Premiere soirée? »",
    subtext: "Oviana ara no natory tany voalohany ah ooo   »",
    options: ["22 mars 2025", "15 fev 2024", "29 mars 2025", "01 janv 2025"],
    correctIndex: 2,
    explanation: "Une belle experience et soirée avec toi pour la toute première fois c'etait ouf."
  },
  {
    id: 2,
    type: 'quote',
    prompt: "« Notre premier boisson alcoolisée?  »",
    subtext: "Inona ary le nosotroina ooo ",
    options: ["Cuvée noir", "Fanta pomme", "Bex", "Sambo"],
    correctIndex: 0,
    explanation: "Tena mampisotro taoka anah annn. J'ai adoré."
  },
  {
    id: 3,
    type: 'quote',
    prompt: "«Tournage de ton film with me »",
    subtext: "Nampalahelo iny an, belle realisation",
    options: ["19 mars 2025", "17 mars 2025", "l'année prochaine", "18 mars 2025"],
    correctIndex: 3,
    explanation: "Un court-métrage si emouvant et touchant, bravo à nous"
  },
  {
    id: 4,
    type: 'quote',
    prompt: "« Ton petit bonheur?  »",
    subtext: "Tu raconte tes bons et mauvais moments (couple's situation) à qui?",
    options: ["Fy", "Za Bola", "tes amies any amfilm any", "ta maman"],
    correctIndex: 1,
    explanation: "Za aloha no fantako fa tsy aiko ze any eee"
  },
  {
    id: 5,
    type: 'movie',
    prompt: "« Ton genre de film préféré?  »",
    subtext: "Alors iza amin'reo?",
    options: ["Harry potter", "Avengers", "Romeo et Juliette", "Tsisy amreo"],
    correctIndex: 2,
    explanation: "Tsisy zava-patako koa fa mba tiko hofantatra"
  },
  {
    id: 6,
    type: 'friend',
    prompt: "Si le film de la vie de notre Star d'anniversaire devait remporter un Oscar ce soir, lequel serait-ce ?",
    subtext: "La critique internationale est unanime...",
    options: [
      "Oscar des Meilleurs Fous Rires Incontrôlables",
      "Oscar du Meilleur Ami qu'on ne changerait pour rien au monde",
      "Oscar de la Meilleure Humeur Contagieuse",
      "TOUS LES TROIS RÉUNIS À L'UNANIMITÉ !"
    ],
    correctIndex: 3,
    explanation: "C'est un grand chelem historique aux Oscars ! Aucun doute permis."
  }
];

export const CinemaQuiz: React.FC<CinemaQuizProps> = ({ starName }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === question.correctIndex) {
      cinemaAudio.playSuccessSound();
      setScore(prev => prev + 1);
    } else {
      cinemaAudio.playClapSound();
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= QUIZ_QUESTIONS.length - 1) {
        cinemaAudio.playApplause();
        try {
          confetti({ particleCount: 70, spread: 80 });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative">
      {/* Quiz Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <HelpCircle className="w-6 h-6" />
            LE BLIND TEST & QUIZ DES RÉPLIQUES CULTES
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Testez vos connaissances en cinéma et répliques d'anthologie !
          </p>
        </div>

        {!isFinished && (
          <div className="flex items-center gap-2 font-mono text-xs bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-lg">
            <span className="text-gray-400">Question</span>
            <span className="text-yellow-400 font-bold">{currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-gray-400">Score :</span>
            <span className="text-green-400 font-bold">{score}</span>
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Question Box */}
          <div className="bg-zinc-900/90 border border-yellow-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest text-yellow-500 font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {question.type === 'quote' ? 'Réplique culte à identifier' : question.type === 'movie' ? 'Énigme cinéma' : `Question Spéciale ${starName}`}
            </div>
            <div className="text-lg md:text-xl font-playfair italic font-bold text-white mb-2 leading-relaxed">
              {question.prompt}
            </div>
            {question.subtext && (
              <div className="text-xs text-gray-400 font-sans">
                {question.subtext}
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt, idx) => {
              const isChosen = selectedAnswer === idx;
              const isCorrect = idx === question.correctIndex;
              let btnClass = 'bg-zinc-900/80 border-zinc-700 text-gray-200 hover:border-yellow-400 hover:bg-zinc-800';

              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                } else if (isChosen) {
                  btnClass = 'bg-rose-950/70 border-rose-500 text-rose-200';
                } else {
                  btnClass = 'bg-zinc-900/50 border-zinc-800 text-gray-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <span className="flex-1">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="bg-zinc-950 border border-zinc-700 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="text-xs text-gray-300">
                <b className="text-yellow-400">Le saviez-vous ? </b>
                {question.explanation}
              </div>
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Question Suivante ➔' : 'Voir le Palmarès 🏆'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Results Screen */
        <div className="text-center py-8 space-y-6">
          <div className="inline-flex p-4 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
            <Award className="w-12 h-12" />
          </div>

          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-1">
              Résultat officiel de la Commission
            </div>
            <div className="text-4xl font-black font-cinzel text-yellow-400 gold-glow">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <div className="text-lg font-bold text-white mt-2">
              {score === QUIZ_QUESTIONS.length
                ? '🏆 STEVEN SPIELBERG EN PERSONNE ! Un sans-faute magistral !'
                : score >= 4
                ? '🎬 PALME D’OR ! Vous connaissez vos classiques sur le bout des doigts.'
                : '🍿 FIGURANT EN DEVENIR ! Il est temps de vous faire une soirée cinéma !'}
            </div>
          </div>

          <div className="max-w-md mx-auto text-xs text-gray-400 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
            {score >= 4
              ? `Félicitations, vous remportez votre accréditation VIP pour la table d'honneur de l'anniversaire de ${starName} !`
              : `Pas d'inquiétude, ${starName} vous offrira un cours de rattrapage cinéma durant la soirée !`}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 font-bold rounded-xl border border-yellow-500/30 flex items-center gap-2 mx-auto text-xs transition-transform hover:scale-105 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer le Quiz
          </button>
        </div>
      )}
    </div>
  );
};
