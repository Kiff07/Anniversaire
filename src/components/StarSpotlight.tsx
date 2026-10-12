import React, { useState } from 'react';
import { BirthdayStar } from '../types/cinema';
import { STAR_PHOTOS } from '../config/media';
import { Camera, Heart, PenLine, Quote, X, ZoomIn } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';

interface StarSpotlightProps {
  star: BirthdayStar;
  onOpenCustomizer: () => void;
}

/**
 * ═══════════════════════════════════════════════════════════
 *  🌟 PRÉSENTATION VEDETTE — 2 PHOTOS + DÉDICACE PERSONNELLE
 * ───────────────────────────────────────────────────────────
 *  POUR CHANGER LES PHOTOS (dans VS Code) :
 *  → Ouvre le fichier  src/config/media.ts
 *  → Modifie la section  STAR_PHOTOS
 *  → Mets tes images dans  public/images/
 * ═══════════════════════════════════════════════════════════
 */
export const StarSpotlight: React.FC<StarSpotlightProps> = ({ star, onOpenCustomizer }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    cinemaAudio.playCameraShutter();
    setLightboxIdx(idx);
  };

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative overflow-hidden">
      {/* Halo doré d'ambiance */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[240px] bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] sm:text-xs font-cinzel font-bold tracking-widest mb-3">
          <Camera className="w-4 h-4" />
          À L'AFFICHE — PORTRAIT DE LA STAR
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-cinzel tracking-wider text-white">
          {star.name.toUpperCase()} <span className="text-yellow-400">EN LUMIÈRE</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono tracking-wider uppercase">
          {star.nickname} • {star.age} ans de légende • {star.favoriteGenre}
        </p>
      </div>

      {/* Grille : photo 1 / dédicace / photo 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch relative z-10">
        {/* ── PHOTO 1 ─────────────────────────────── */}
        <button
          onClick={() => openLightbox(0)}
          className="group relative rounded-2xl overflow-hidden border-2 border-yellow-500/40 hover:border-yellow-400 transition-all cursor-pointer shadow-2xl bg-zinc-950 text-left"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={STAR_PHOTOS[0]?.src}
              alt={`Photo de ${star.name} — ${STAR_PHOTOS[0]?.caption}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/star-portrait-1.jpg';
              }}
            />
          </div>
          {/* Badge doré */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-yellow-500/50 text-yellow-300 text-[11px] font-cinzel font-bold">
            {STAR_PHOTOS[0]?.badge}
          </div>
          {/* Loupe au survol */}
          <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4" />
          </div>
          {/* Légende bas */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10">
            <p className="text-sm font-playfair italic text-yellow-100">
              « {STAR_PHOTOS[0]?.caption} »
            </p>
          </div>
        </button>

        {/* ── DÉDICACE CENTRALE ───────────────────── */}
        <div className="flex flex-col justify-center bg-gradient-to-b from-zinc-900/90 to-black/90 rounded-2xl border border-yellow-500/20 p-6 sm:p-7 relative">
          <Quote className="w-8 h-8 text-yellow-500/50 mb-3" />
          <h3 className="font-cinzel font-bold text-yellow-400 text-sm tracking-widest mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 fill-current text-red-500" />
            MOT DU RÉALISATEUR (TOI)
          </h3>
          <div className="text-sm text-gray-200 leading-relaxed font-light whitespace-pre-line flex-1">
            {star.bio}
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-gray-500">
              — Signé : ton meilleur ami ❤️
            </span>
            <button
              onClick={onOpenCustomizer}
              className="px-3.5 py-2 bg-yellow-500/15 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <PenLine className="w-3.5 h-3.5" />
              Modifier ma dédicace
            </button>
          </div>
        </div>

        {/* ── PHOTO 2 ─────────────────────────────── */}
        <button
          onClick={() => openLightbox(1)}
          className="group relative rounded-2xl overflow-hidden border-2 border-yellow-500/40 hover:border-yellow-400 transition-all cursor-pointer shadow-2xl bg-zinc-950 text-left"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={STAR_PHOTOS[1]?.src}
              alt={`Photo de ${star.name} — ${STAR_PHOTOS[1]?.caption}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/star-portrait-2.jpg';
              }}
            />
          </div>
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-yellow-500/50 text-yellow-300 text-[11px] font-cinzel font-bold">
            {STAR_PHOTOS[1]?.badge}
          </div>
          <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10">
            <p className="text-sm font-playfair italic text-yellow-100">
              « {STAR_PHOTOS[1]?.caption} »
            </p>
          </div>
        </button>
      </div>

      {/* Lightbox plein écran */}
      {lightboxIdx !== null && STAR_PHOTOS[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={STAR_PHOTOS[lightboxIdx].src}
              alt={`Photo agrandie de ${star.name}`}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="bg-zinc-950 p-4 flex items-center justify-between gap-3">
              <p className="text-sm font-playfair italic text-yellow-100">
                « {STAR_PHOTOS[lightboxIdx].caption} »
              </p>
              <button
                onClick={() => setLightboxIdx(null)}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
