import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cinemaAudio } from '../utils/audioEffects';
import { Star, Trophy, Bomb, Timer, Play, RotateCcw, Zap, Crown, Medal, MousePointerClick } from 'lucide-react';
import confetti from 'canvas-confetti';

type Difficulty = 'facile' | 'star' | 'legende';
type ItemType = 'star' | 'bonus' | 'bomb';
type Phase = 'idle' | 'playing' | 'finished';

interface CellItem {
  type: ItemType;
  key: number;
}

const DIFFICULTIES: Record<Difficulty, { label: string; spawnMs: number; lifeMs: number; hint: string }> = {
  facile: { label: 'Facile', spawnMs: 850, lifeMs: 1300, hint: 'Tranquille, pour les plus jeunes' },
  star: { label: 'Star', spawnMs: 650, lifeMs: 1000, hint: 'Le rythme officiel du plateau' },
  legende: { label: 'Légende', spawnMs: 450, lifeMs: 750, hint: 'Que pour les vrais cascadeurs !' },
};

const GAME_DURATION = 30;

export const StarCatchGame: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('star');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [combo, setCombo] = useState(0);
  const [cells, setCells] = useState<(CellItem | null)[]>(Array(9).fill(null));
  const [best, setBest] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('star_catch_best') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [lastGain, setLastGain] = useState<{ value: number; key: number } | null>(null);
  const [hits, setHits] = useState(0);

  const keyRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const phaseRef = useRef<Phase>('idle');
  const spawnTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  phaseRef.current = phase;

  const clearTimers = () => {
    if (spawnTimer.current) clearInterval(spawnTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    spawnTimer.current = null;
    countdownTimer.current = null;
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const spawnItem = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    const config = DIFFICULTIES[difficulty];

    setCells(prev => {
      const emptyIndices = prev
        .map((c, i) => (c === null ? i : -1))
        .filter(i => i !== -1);
      if (emptyIndices.length === 0) return prev;

      // 1 ou 2 apparitions selon la difficulté
      const spawnCount = difficulty === 'legende' && emptyIndices.length > 3 && Math.random() > 0.5 ? 2 : 1;
      const next = [...prev];

      for (let s = 0; s < spawnCount; s++) {
        const pool = next.map((c, i) => (c === null ? i : -1)).filter(i => i !== -1);
        if (pool.length === 0) break;
        const idx = pool[Math.floor(Math.random() * pool.length)];

        const roll = Math.random();
        const type: ItemType = roll < 0.68 ? 'star' : roll < 0.85 ? 'bonus' : 'bomb';
        const key = ++keyRef.current;
        next[idx] = { type, key };

        // Disparition automatique après lifeMs
        setTimeout(() => {
          setCells(cur => {
            if (cur[idx]?.key === key && phaseRef.current === 'playing') {
              const copy = [...cur];
              copy[idx] = null;
              return copy;
            }
            return cur;
          });
        }, config.lifeMs);
      }
      return next;
    });
  }, [difficulty]);

  const startGame = () => {
    clearTimers();
    scoreRef.current = 0;
    comboRef.current = 0;
    setScore(0);
    setCombo(0);
    setHits(0);
    setTimeLeft(GAME_DURATION);
    setCells(Array(9).fill(null));
    setIsNewRecord(false);
    setLastGain(null);
    setPhase('playing');
    cinemaAudio.playCountdownBeep(true);

    const config = DIFFICULTIES[difficulty];

    spawnTimer.current = setInterval(spawnItem, config.spawnMs);
    // Premier spawn immédiat pour ne pas attendre
    setTimeout(spawnItem, 150);

    countdownTimer.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishGame();
          return 0;
        }
        if (prev <= 6) cinemaAudio.playCountdownBeep(false);
        return prev - 1;
      });
    }, 1000);
  };

  const finishGame = () => {
    clearTimers();
    setCells(Array(9).fill(null));
    setPhase('finished');
    const finalScore = scoreRef.current;

    let record = false;
    try {
      const prevBest = parseInt(localStorage.getItem('star_catch_best') || '0', 10);
      if (finalScore > prevBest) {
        localStorage.setItem('star_catch_best', String(finalScore));
        setBest(finalScore);
        record = true;
      }
    } catch {
      // ignore
    }
    setIsNewRecord(record);

    if (record && finalScore > 0) {
      cinemaAudio.playApplause();
      try {
        confetti({ particleCount: 90, spread: 85, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } else {
      cinemaAudio.playOscarFanfare();
    }
  };

  const handleCellClick = (idx: number) => {
    if (phase !== 'playing') return;
    const item = cells[idx];
    if (!item) {
      // Clic dans le vide : petit malus de combo, sans perdre de points (jeu facile !)
      comboRef.current = 0;
      setCombo(0);
      return;
    }

    // Retire l'item cliqué
    setCells(prev => {
      const copy = [...prev];
      copy[idx] = null;
      return copy;
    });

    if (item.type === 'star') {
      comboRef.current += 1;
      const newCombo = comboRef.current;
      setCombo(newCombo);
      setHits(h => h + 1);
      // Bonus de combo : tous les 5 coups d'affilée = +10 supplémentaires
      const comboBonus = Math.floor(newCombo / 5) * 10;
      const gain = 10 + comboBonus;
      scoreRef.current += gain;
      setScore(scoreRef.current);
      setLastGain({ value: gain, key: Date.now() });
      cinemaAudio.playSuccessSound();
    } else if (item.type === 'bonus') {
      comboRef.current += 1;
      setCombo(comboRef.current);
      setHits(h => h + 1);
      scoreRef.current += 50;
      setScore(scoreRef.current);
      setLastGain({ value: 50, key: Date.now() });
      cinemaAudio.playOscarFanfare();
      try {
        confetti({ particleCount: 25, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } else {
      // Bombe / tomate : -15 points (jamais en dessous de 0), combo réinitialisé
      comboRef.current = 0;
      setCombo(0);
      scoreRef.current = Math.max(0, scoreRef.current - 15);
      setScore(scoreRef.current);
      setLastGain({ value: -15, key: Date.now() });
      cinemaAudio.playClapSound();
    }
  };

  const getRank = (s: number) => {
    if (s >= 400) return { title: 'SUPERSTAR D’HOLLYWOOD', icon: Crown, color: 'text-yellow-400' };
    if (s >= 250) return { title: 'STAR MONTANTE', icon: Trophy, color: 'text-amber-300' };
    if (s >= 120) return { title: 'SECOND RÔLE PROMETTEUR', icon: Medal, color: 'text-orange-300' };
    return { title: 'FIGURANT MOTIVÉ', icon: Star, color: 'text-gray-300' };
  };

  const rank = getRank(score);
  const RankIcon = rank.icon;
  const progress = (timeLeft / GAME_DURATION) * 100;

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Zap className="w-6 h-6" />
            STAR CATCH : ATTRAPE LES ÉTOILES !
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Jeu ultra-facile : touche un max d'étoiles en 30 secondes et fais grimper ton score !
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 border border-yellow-500/30 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Record : <b className="text-yellow-400 font-mono text-sm">{best}</b></span>
          </div>
        </div>
      </div>

      {/* Règles express */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-xs">
        <div className="flex items-center gap-2.5 bg-zinc-900/70 border border-zinc-800 rounded-xl px-3.5 py-2.5">
          <span className="p-1.5 rounded-lg bg-yellow-500/20"><Star className="w-4 h-4 text-yellow-400 fill-current" /></span>
          <span><b className="text-yellow-300">Étoile = +10 pts</b><br /><span className="text-gray-400">Combo tous les 5 = bonus</span></span>
        </div>
        <div className="flex items-center gap-2.5 bg-zinc-900/70 border border-zinc-800 rounded-xl px-3.5 py-2.5">
          <span className="p-1.5 rounded-lg bg-amber-500/20"><Trophy className="w-4 h-4 text-amber-400" /></span>
          <span><b className="text-amber-300">Trophée rare = +50 pts</b><br /><span className="text-gray-400">Ne le laisse pas filer !</span></span>
        </div>
        <div className="flex items-center gap-2.5 bg-zinc-900/70 border border-zinc-800 rounded-xl px-3.5 py-2.5">
          <span className="p-1.5 rounded-lg bg-red-500/20"><Bomb className="w-4 h-4 text-red-400" /></span>
          <span><b className="text-red-300">Bombe = −15 pts</b><br /><span className="text-gray-400">Ne touche surtout pas !</span></span>
        </div>
      </div>

      {/* Sélecteur de difficulté */}
      {phase !== 'playing' && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-gray-400 uppercase">Difficulté :</span>
          {(Object.keys(DIFFICULTIES) as Difficulty[]).map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              title={DIFFICULTIES[d].hint}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                difficulty === d
                  ? 'bg-yellow-500 text-black border-yellow-400 shadow-md'
                  : 'bg-zinc-900 text-gray-300 border-zinc-700 hover:border-yellow-500/50'
              }`}
            >
              {DIFFICULTIES[d].label}
            </button>
          ))}
        </div>
      )}

      {/* HUD : score / temps / combo */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex-1 min-w-[130px] bg-zinc-950 border border-yellow-500/25 rounded-xl px-4 py-3 text-center relative overflow-hidden">
          <div className="text-[10px] font-mono text-gray-400 uppercase">Score</div>
          <div className="text-3xl font-black font-mono text-yellow-400">{score}</div>
          {lastGain && phase === 'playing' && (
            <span
              key={lastGain.key}
              className={`absolute top-1 right-2 text-sm font-black font-mono animate-bounce ${lastGain.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
            >
              {lastGain.value >= 0 ? `+${lastGain.value}` : lastGain.value}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-[130px] bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-center">
          <div className="text-[10px] font-mono text-gray-400 uppercase flex items-center justify-center gap-1">
            <Timer className="w-3 h-3" /> Temps restant
          </div>
          <div className={`text-3xl font-black font-mono ${timeLeft <= 5 && phase === 'playing' ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {timeLeft}s
          </div>
        </div>
        <div className="flex-1 min-w-[130px] bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-center">
          <div className="text-[10px] font-mono text-gray-400 uppercase">Combo</div>
          <div className="text-3xl font-black font-mono text-orange-400">x{combo}</div>
        </div>
      </div>

      {/* Barre de progression du temps */}
      {phase === 'playing' && (
        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden mb-5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-yellow-500 to-amber-400'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Arène de jeu 3x3 */}
      {phase !== 'finished' ? (
        <div className="relative">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-md mx-auto">
            {cells.map((cell, idx) => (
              <button
                key={idx}
                onClick={() => handleCellClick(idx)}
                disabled={phase !== 'playing'}
                className={`aspect-square rounded-2xl border-2 flex items-center justify-center transition-all duration-150 select-none ${
                  phase !== 'playing'
                    ? 'bg-zinc-900/50 border-zinc-800 opacity-60 cursor-default'
                    : cell
                      ? cell.type === 'bomb'
                        ? 'bg-red-950/60 border-red-500/60 cursor-pointer hover:scale-105 active:scale-95'
                        : cell.type === 'bonus'
                          ? 'bg-amber-500/20 border-amber-400 cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/30 animate-pulse'
                          : 'bg-yellow-500/15 border-yellow-400/70 cursor-pointer hover:scale-105 active:scale-90'
                      : 'bg-zinc-900/80 border-zinc-800 cursor-pointer hover:border-zinc-600 active:bg-zinc-800'
                }`}
                aria-label={`Case ${idx + 1}`}
              >
                {cell?.type === 'star' && (
                  <Star className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-400 fill-current drop-shadow-[0_0_12px_rgba(250,204,21,0.8)] animate-bounce" />
                )}
                {cell?.type === 'bonus' && (
                  <Trophy className="w-10 h-10 sm:w-14 sm:h-14 text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.9)]" />
                )}
                {cell?.type === 'bomb' && (
                  <Bomb className="w-10 h-10 sm:w-14 sm:h-14 text-red-400" />
                )}
              </button>
            ))}
          </div>

          {/* Écran de démarrage par-dessus */}
          {phase === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl">
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-black font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-yellow-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer font-cinzel"
              >
                <Play className="w-5 h-5 fill-current" />
                Lancer la partie (30s)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Écran de fin de partie */
        <div className="text-center py-6 space-y-5 bg-zinc-950/60 rounded-2xl border border-yellow-500/20 px-4">
          {isNewRecord && score > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 text-xs font-bold animate-pulse">
              <Crown className="w-4 h-4" /> NOUVEAU RECORD !
            </div>
          )}
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-1">Score final</div>
            <div className="text-6xl font-black font-mono text-yellow-400 gold-glow">{score}</div>
            <div className={`mt-2 text-sm font-cinzel font-bold flex items-center justify-center gap-2 ${rank.color}`}>
              <RankIcon className="w-5 h-5" />
              {rank.title}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 font-mono">
            <span><MousePointerClick className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />{hits} touches</span>
            <span>•</span>
            <span>Record : <b className="text-yellow-400">{best}</b></span>
          </div>
          <button
            onClick={startGame}
            className="px-7 py-3.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer font-cinzel"
          >
            <RotateCcw className="w-4 h-4" />
            REJOUER
          </button>
        </div>
      )}
    </div>
  );
};
