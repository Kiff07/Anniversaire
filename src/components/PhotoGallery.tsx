import React, { useState, useCallback, useEffect } from 'react';
import { BirthdayStar } from '../types/cinema';
import { GALLERY_PHOTOS } from '../config/media';
import { Images, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';

interface PhotoGalleryProps {
  star: BirthdayStar;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ star }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    cinemaAudio.playCameraShutter();
    setLightboxIdx(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightboxIdx(prev =>
        prev === null ? prev : (prev + dir + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      );
    },
    []
  );

  // Navigation au clavier dans la visionneuse
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, step, closeLightbox]);

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative overflow-hidden">
      <div className="absolute -top-20 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Images className="w-6 h-6" />
            PELLICULE D'OR — LA GALERIE PHOTOS
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Les instants volés de {star.name} : clique sur une photo pour l'admirer en grand !
          </p>
        </div>
        <div className="text-xs font-mono text-yellow-400/80 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-lg">
          📸 {GALLERY_PHOTOS.length} photos souvenirs
        </div>
      </div>

      {/* Grille photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 relative z-10">
        {GALLERY_PHOTOS.map((photo, idx) => (
          <button
            key={photo.src}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden border-2 border-zinc-800 hover:border-yellow-500/60 transition-all cursor-pointer bg-zinc-950 text-left shadow-lg"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-yellow-500/40 text-yellow-300 text-[10px] font-cinzel font-bold">
              {photo.badge}
            </div>
            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3.5 pt-8">
              <p className="text-xs font-playfair italic text-yellow-100 leading-snug">
                « {photo.caption} »
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Visionneuse plein écran */}
      {lightboxIdx !== null && GALLERY_PHOTOS[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={e => { e.stopPropagation(); step(-1); }}
            className="absolute left-3 sm:left-6 z-10 p-2.5 rounded-full bg-zinc-900/80 hover:bg-yellow-500 hover:text-black text-yellow-300 border border-yellow-500/40 transition-all cursor-pointer"
            title="Photo précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={GALLERY_PHOTOS[lightboxIdx].src}
              alt={GALLERY_PHOTOS[lightboxIdx].caption}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="bg-zinc-950 p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-playfair italic text-yellow-100 truncate">
                  « {GALLERY_PHOTOS[lightboxIdx].caption} »
                </p>
                <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                  {GALLERY_PHOTOS[lightboxIdx].badge} • {lightboxIdx + 1} / {GALLERY_PHOTOS.length}
                </div>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={e => { e.stopPropagation(); step(1); }}
            className="absolute right-3 sm:right-6 z-10 p-2.5 rounded-full bg-zinc-900/80 hover:bg-yellow-500 hover:text-black text-yellow-300 border border-yellow-500/40 transition-all cursor-pointer"
            title="Photo suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
