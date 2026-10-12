import React, { useState } from 'react';
import { cinemaAudio } from '../utils/audioEffects';
import { Volume2, Music, Camera, Zap, Sparkles, Radio, Trophy, Film } from 'lucide-react';

export const Soundboard: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const sounds = [
    {
      id: 'universal',
      title: 'Fanfare Universal',
      subtitle: 'Les cuivres triomphants',
      icon: Trophy,
      color: 'from-amber-500 to-yellow-600',
      action: () => cinemaAudio.playUniversalFanfare()
    },
    {
      id: 'clap',
      title: 'Clap de Tournage',
      subtitle: 'Bois massif 35mm',
      icon: Film,
      color: 'from-zinc-700 to-zinc-900',
      action: () => cinemaAudio.playClapSound()
    },
    {
      id: 'inception',
      title: 'Cor Inception',
      subtitle: 'Le mythique BRRAAAM',
      icon: Radio,
      color: 'from-red-600 to-rose-700',
      action: () => cinemaAudio.playInceptionHorn()
    },
    {
      id: 'paparazzi',
      title: 'Flash Paparazzi',
      subtitle: 'Obturateur & flashs',
      icon: Camera,
      color: 'from-blue-600 to-cyan-600',
      action: () => cinemaAudio.playCameraShutter()
    },
    {
      id: 'oscar',
      title: 'Trompettes des Oscars',
      subtitle: 'Remise de statuette',
      icon: Sparkles,
      color: 'from-yellow-400 to-amber-500',
      action: () => cinemaAudio.playOscarFanfare()
    },
    {
      id: 'applause',
      title: 'Standing Ovation',
      subtitle: 'Foule en délire',
      icon: Music,
      color: 'from-emerald-600 to-teal-700',
      action: () => cinemaAudio.playApplause()
    },
    {
      id: 'beep',
      title: 'Bip Décompte SMPTE',
      subtitle: 'Synchro 1000 Hz',
      icon: Zap,
      color: 'from-purple-600 to-violet-700',
      action: () => cinemaAudio.playCountdownBeep(true)
    },
    {
      id: 'projector',
      title: 'Projecteur 35mm',
      subtitle: 'Cliquetis de pellicule',
      icon: Volume2,
      color: 'from-orange-600 to-amber-700',
      action: () => cinemaAudio.playProjectorClick()
    }
  ];

  const triggerSound = (id: string, action: () => void) => {
    setActiveSound(id);
    action();
    setTimeout(() => setActiveSound(null), 800);
  };

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Radio className="w-6 h-6" />
            STUDIO DE BRUITAGE & FOLEY (BOÎTE À SONS)
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Lancez les effets sonores cultes d'Hollywood en direct pendant la soirée !
          </p>
        </div>

        <div className="text-xs font-mono text-yellow-400/80 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          MOTEUR SONORE PRÊT
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {sounds.map(s => {
          const Icon = s.icon;
          const isPlaying = activeSound === s.id;

          return (
            <button
              key={s.id}
              onClick={() => triggerSound(s.id, s.action)}
              className={`p-4 rounded-xl border text-left transition-all duration-150 relative overflow-hidden cursor-pointer group ${
                isPlaying
                  ? 'border-yellow-400 scale-95 shadow-lg shadow-yellow-500/30'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-yellow-500/50 hover:bg-zinc-800/80'
              }`}
            >
              {/* Subtle gradient flash */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity ${
                  isPlaying ? 'opacity-25' : ''
                }`}
              />

              <div className="flex items-center justify-between mb-3 relative z-10">
                <div
                  className={`p-2 rounded-lg bg-zinc-800 text-yellow-400 group-hover:scale-110 transition-transform ${
                    isPlaying ? 'bg-yellow-400 text-black' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isPlaying && (
                  <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase animate-pulse">
                    ON AIR
                  </span>
                )}
              </div>

              <div className="font-bold text-sm text-white relative z-10 group-hover:text-yellow-300 transition-colors">
                {s.title}
              </div>
              <div className="text-[11px] text-gray-400 relative z-10 mt-0.5">
                {s.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
