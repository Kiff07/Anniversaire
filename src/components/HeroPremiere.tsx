import React from 'react';
import { BirthdayStar } from '../types/cinema';
import { Trophy, Calendar, MapPin, Play, Heart, Clapperboard, Sparkles, Star } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';
import { StarSpotlight } from './StarSpotlight';

interface HeroPremiereProps {
  star: BirthdayStar;
  onReplayUniversal: () => void;
  onOpenCustomizer: () => void;
}

export const HeroPremiere: React.FC<HeroPremiereProps> = ({
  star,
  onReplayUniversal,
  onOpenCustomizer,
}) => {
  const scrollTo = (id: string) => {
    cinemaAudio.playClapSound();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      {/* Projecteurs cinéma en fond */}
      <div className="absolute top-0 left-1/4 w-96 h-[600px] bg-gradient-to-b from-yellow-500/15 via-yellow-500/5 to-transparent -rotate-12 blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-[600px] bg-gradient-to-b from-yellow-500/15 via-yellow-500/5 to-transparent rotate-12 blur-2xl pointer-events-none" />

      {/* Lueur du tapis rouge */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-t from-red-600/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Sélection officielle */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs sm:text-sm font-cinzel font-bold mb-6">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>FESTIVAL INTERNATIONAL DU MEILLEUR AMI • SÉLECTION OFFICIELLE</span>
        </div>

        {/* Titre principal */}
        <div className="space-y-4 mb-8">
          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-gray-400 uppercase">
            CE SOIR, EN EXCLUSIVITÉ MONDIALE AU TAPIS ROUGE
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-cinzel tracking-wider text-white gold-glow leading-tight">
            {star.name.toUpperCase()}
            <span className="block text-2xl sm:text-4xl md:text-5xl mt-2 text-yellow-400 font-bebas tracking-widest">
              L'ÉPISODE DES {star.age} ANS
            </span>
          </h1>

          <p className="text-base sm:text-xl font-playfair italic text-gray-300 max-w-2xl mx-auto">
            « {star.tagline} »
          </p>
        </div>

        {/* Badges événement */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-300 mb-10">
          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span>{star.partyDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>{star.partyLocation}</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>Casting 5 étoiles : Les Meilleurs Amis</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => scrollTo('jeu-score')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-yellow-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer font-cinzel"
          >
            <Play className="w-5 h-5 fill-current" />
            Jouer & Marquer des Points
          </button>

          <button
            onClick={() => scrollTo('films')}
            className="px-6 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-sm rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Clapperboard className="w-4 h-4 text-yellow-400" />
            Voir ses Films & Backstage
          </button>

          <button
            onClick={onReplayUniversal}
            className="px-6 py-4 bg-black/60 hover:bg-black/90 text-yellow-300 font-semibold text-sm rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Star className="w-4 h-4 text-yellow-400" />
            Intro Universal Studios 3D
          </button>
        </div>

        {/* ── PRÉSENTATION VEDETTE : 2 PHOTOS + DÉDICACE ── */}
        <div className="text-left">
          <StarSpotlight star={star} onOpenCustomizer={onOpenCustomizer} />
        </div>

        {/* Mini sommaire des activités */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono">
          <span className="text-gray-500 uppercase tracking-widest mr-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Au programme :
          </span>
          {[
            { label: 'Jeu Star Catch', id: 'jeu-score' },
            { label: 'Quiz Cinéma', id: 'quiz' },
            { label: 'Films & Backstage', id: 'films' },
            { label: 'Storyboard Photos', id: 'storyboard' },
            { label: 'Walk of Fame', id: 'walkoffame' },
            { label: 'Générique de Fin', id: 'generique' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-gray-300 hover:text-yellow-300 hover:border-yellow-500/50 transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
