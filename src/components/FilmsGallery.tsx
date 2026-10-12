import React, { useState } from 'react';
import { BirthdayStar } from '../types/cinema';
import { FILM_VIDEOS, FILM_CATEGORIES, FilmVideo } from '../config/media';
import { Clapperboard, Play, Calendar, Clock } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';

interface FilmsGalleryProps {
  star: BirthdayStar;
}

type Filter = 'all' | 'film' | 'backstage' | 'mahalatsaka';

const CATEGORY_KEYS: Array<'film' | 'backstage' | 'mahalatsaka'> = ['film', 'backstage', 'mahalatsaka'];

export const FilmsGallery: React.FC<FilmsGalleryProps> = ({ star }) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<FilmVideo>(FILM_VIDEOS[0]);

  const filtered = filter === 'all' ? FILM_VIDEOS : FILM_VIDEOS.filter(v => v.category === filter);

  const handleSelect = (video: FilmVideo) => {
    cinemaAudio.playClapSound();
    setSelected(video);
  };

  const renderPlayer = () => {
    // Vidéo YouTube intégrée
    if (selected.type === 'youtube') {
      return (
        <iframe
          key={selected.id}
          className="w-full aspect-video bg-black"
          src={`https://www.youtube.com/embed/${selected.src}?rel=0`}
          title={selected.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    // Fichier MP4 classique
    return (
      <video key={selected.id} controls playsInline preload="metadata" className="w-full aspect-video bg-black" poster={selected.poster}>
        <source src={selected.src} type="video/mp4" />
        Votre navigateur ne peut pas lire cette vidéo.
      </video>
    );
  };

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Clapperboard className="w-6 h-6" />
            FILMS RÉALISÉS & BEHIND THE SCENES
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            La filmographie officielle de {star.name} : ses courts-métrages, les coulisses et le bêtisier !
          </p>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-yellow-500 text-black border-yellow-400'
              : 'bg-zinc-900 text-gray-300 border-zinc-700 hover:border-yellow-500/50'
          }`}
        >
          Tout voir ({FILM_VIDEOS.length})
        </button>
        {CATEGORY_KEYS.map(cat => {
          const count = FILM_VIDEOS.filter(v => v.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              title={FILM_CATEGORIES[cat].hint}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-yellow-500 text-black border-yellow-400'
                  : 'bg-zinc-900 text-gray-300 border-zinc-700 hover:border-yellow-500/50'
              }`}
            >
              {FILM_CATEGORIES[cat].emoji} {FILM_CATEGORIES[cat].label} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── LECTEUR PRINCIPAL ─────────────────── */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl overflow-hidden border-2 border-yellow-500/40 shadow-2xl bg-black">
            {renderPlayer()}
          </div>

          {/* Fiche du film sélectionné */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-mono text-[10px] font-bold border border-yellow-500/30 uppercase">
                {FILM_CATEGORIES[selected.category].emoji} {FILM_CATEGORIES[selected.category].label}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
                <Calendar className="w-3 h-3" /> {selected.year}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
                <Clock className="w-3 h-3" /> {selected.duration}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-cinzel text-white tracking-wide">
              {selected.title.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
              {selected.description}
            </p>
            <p className="text-[11px] text-gray-500 mt-3 font-mono">
              Réalisé par {star.name} • Une production {star.name.toUpperCase()} STUDIOS
            </p>
          </div>
        </div>

        {/* ── PLAYLIST / MINIATURES ───────────────── */}
        <div className="lg:col-span-2 space-y-3 max-h-[540px] overflow-y-auto pr-1">
          {filtered.map(video => {
            const isActive = selected.id === video.id;
            return (
              <button
                key={video.id}
                onClick={() => handleSelect(video)}
                className={`w-full text-left rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group ${
                  isActive
                    ? 'border-yellow-400 shadow-lg shadow-yellow-500/20'
                    : 'border-zinc-800 hover:border-yellow-500/50'
                } bg-zinc-950`}
              >
                <div className="relative">
                  <img
                    src={video.poster}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-32 sm:h-36 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {/* Bouton play */}
                  <div className={`absolute inset-0 flex items-center justify-center`}>
                    <span className={`p-3 rounded-full backdrop-blur-sm transition-all group-hover:scale-110 ${
                      isActive ? 'bg-yellow-500 text-black' : 'bg-black/60 text-yellow-400 border border-yellow-500/40'
                    }`}>
                      <Play className="w-5 h-5 fill-current" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-gray-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {video.duration}
                  </span>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-yellow-300 border border-yellow-500/30">
                    {FILM_CATEGORIES[video.category].emoji} {FILM_CATEGORIES[video.category].label}
                  </span>
                </div>
                <div className="p-3.5">
                  <div className={`font-cinzel font-bold text-sm ${isActive ? 'text-yellow-300' : 'text-white'}`}>
                    {video.title}
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                    {video.year} • {video.type === 'youtube' ? 'YouTube' : 'Fichier vidéo'}
                  </div>
                </div>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center text-sm text-gray-400 py-10 bg-zinc-950 rounded-2xl border border-zinc-800">
              Aucune vidéo dans cette catégorie pour le moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
