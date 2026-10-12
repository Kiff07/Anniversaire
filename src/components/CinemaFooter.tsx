import React from 'react';
import { BirthdayStar } from '../types/cinema';
import { Heart, Film, ArrowUp, Sparkles } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';

interface CinemaFooterProps {
  star: BirthdayStar;
  onReplayUniversal: () => void;
  onOpenCustomizer: () => void;
}

export const CinemaFooter: React.FC<CinemaFooterProps> = ({
  star,
  onReplayUniversal,
  onOpenCustomizer
}) => {
  const scrollToTop = () => {
    cinemaAudio.playClapSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-yellow-500/20 bg-zinc-950 text-white pt-12 pb-8 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-zinc-800">
          {/* Brand & Concept */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-yellow-500 text-black">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-cinzel font-black text-lg text-yellow-400">
                {star.name.toUpperCase()} STUDIOS & ENTERTAINMENT
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              Ce site a été conçu avec passion pour célébrer l'anniversaire mémorable de notre star {star.name}.
            </p>
          </div>

          {/* Quick Cinema Links */}
          <div className="space-y-2">
            <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-yellow-400">
              Expériences Clés
            </h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <button
                  onClick={onReplayUniversal}
                  className="hover:text-yellow-400 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                  Entrée 3D Universal Studios
                </button>
              </li>
              <li>
                <a href="#jeu-score" className="hover:text-yellow-400 transition-colors">
                  Star Catch (Jeu de score)
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-yellow-400 transition-colors">
                  Blind Test & Répliques Cultes
                </a>
              </li>
              <li>
                <a href="#films" className="hover:text-yellow-400 transition-colors">
                  Films réalisés & Backstage
                </a>
              </li>
              <li>
                <a href="#generique" className="hover:text-yellow-400 transition-colors">
                  Générique Défilant (Écritures)
                </a>
              </li>
            </ul>
          </div>

          {/* Actions & Personnalisation */}
          <div className="space-y-2">
            <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-yellow-400">
              Gestion de la Star
            </h4>
            <p className="text-xs text-gray-400">
              Envie de changer le prénom ou l'âge pour un autre ami ?
            </p>
            <button
              onClick={onOpenCustomizer}
              className="mt-2 px-3.5 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Éditer les détails du tournage
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-1">
            <span>Produit avec</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>par ses amis pour ses {star.age} ans • Tous droits réservés</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors cursor-pointer"
          >
            <span>Retour en haut de l'affiche</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
