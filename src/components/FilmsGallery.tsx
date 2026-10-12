import React, { useState, useRef } from 'react';
import { BirthdayStar } from '../types/cinema';
import { FILM_VIDEOS, FILM_CATEGORIES, FilmVideo } from '../config/media';
import { Clapperboard, Play, Upload, Info, Calendar, Clock, X, Film } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';

/**
 * ═══════════════════════════════════════════════════════════
 *  🎬 GALERIE FILMS & BACKSTAGE — VIDÉOS DU RÉALISATEUR
 * ───────────────────────────────────────────────────────────
 *  POUR CHANGER LES VIDÉOS (dans VS Code) :
 *  → Ouvre le fichier  src/config/media.ts
 *  → Modifie la section  FILM_VIDEOS
 *  → Vidéos MP4 : mets-les dans  public/videos/
 *  → YouTube : mets l'ID vidéo + type: "youtube"
 * ═══════════════════════════════════════════════════════════
 */

interface FilmsGalleryProps {
  star: BirthdayStar;
}

type Filter = 'all' | 'film' | 'backstage' | 'betisier';

export const FilmsGallery: React.FC<FilmsGalleryProps> = ({ star }) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<FilmVideo>(FILM_VIDEOS[0]);
  const [showHelp, setShowHelp] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = filter === 'all' ? FILM_VIDEOS : FILM_VIDEOS.filter(v => v.category === filter);

  const handleSelect = (video: FilmVideo) => {
    cinemaAudio.playClapSound();
    setSelected(video);
    setPreviewUrl(null);
    setPreviewName('');
  };

  // Aperçu instantané d'une vidéo depuis le PC (sans passer par VS Code)
  const handleLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPreviewName(file.name);
    cinemaAudio.playSuccessSound();
  };

  const renderPlayer = () => {
    // 1. Aperçu d'un fichier local choisi par l'utilisateur
    if (previewUrl) {
      return (
        <video key={previewUrl} controls playsInline className="w-full aspect-video bg-black" poster={selected.poster}>
          <source src={previewUrl} type="video/mp4" />
          Votre navigateur ne peut pas lire cette vidéo.
        </video>
      );
    }
    // 2. Vidéo YouTube intégrée
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
    // 3. Fichier MP4 classique
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-yellow-500/15 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            title="Regarder immédiatement une vidéo de ton PC (aperçu temporaire)"
          >
            <Upload className="w-4 h-4" />
            Tester ma vidéo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleLocalFile}
          />
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-gray-300 border border-zinc-700 transition-colors cursor-pointer"
            title="Comment changer les vidéos dans VS Code ?"
          >
            <Info className="w-4 h-4 text-yellow-400" />
          </button>
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
        {(Object.keys(FILM_CATEGORIES) as Array<'film' | 'backstage' | 'betisier'>).map(cat => {
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
              {previewName ? `Aperçu : ${previewName}` : selected.title.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
              {previewName
                ? "Tu regardes un aperçu temporaire depuis ton PC. Pour l'ajouter définitivement, copie le fichier dans public/videos/ puis déclare-le dans src/config/media.ts."
                : selected.description}
            </p>
            <p className="text-[11px] text-gray-500 mt-3 font-mono">
              Réalisé par {star.name} • Une production {star.name.toUpperCase()} STUDIOS
            </p>
          </div>
        </div>

        {/* ── PLAYLIST / MINIATURES ───────────────── */}
        <div className="lg:col-span-2 space-y-3 max-h-[540px] overflow-y-auto pr-1">
          {filtered.map(video => {
            const isActive = selected.id === video.id && !previewUrl;
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
                    className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-300"
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

      {/* Astuce VS Code */}
      <div className="mt-6 text-center text-[11px] text-gray-500 font-mono">
        💡 Pour mettre les vrais films de {star.name} : ouvre <span className="text-yellow-400">src/config/media.ts</span> → section <span className="text-yellow-400">FILM_VIDEOS</span> (MP4 dans <span className="text-yellow-400">public/videos/</span> ou lien YouTube)
      </div>

      {/* Modale d'aide */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cinema-card rounded-2xl max-w-lg w-full p-6 border border-yellow-500/40 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-cinzel font-bold text-yellow-400 flex items-center gap-2">
                <Film className="w-5 h-5" />
                Comment ajouter mes vidéos ?
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
              <p><b className="text-yellow-300">Méthode 1 — Fichier vidéo (recommandée) :</b></p>
              <ol className="list-decimal ml-5 space-y-1 text-gray-400">
                <li>Copie ta vidéo dans le dossier <span className="text-yellow-400 font-mono">public/videos/</span> (crée-le s'il n'existe pas).</li>
                <li>Ouvre <span className="text-yellow-400 font-mono">src/config/media.ts</span> dans VS Code.</li>
                <li>Dans <span className="text-yellow-400 font-mono">FILM_VIDEOS</span>, change le <span className="text-yellow-400 font-mono">src</span> : <span className="text-yellow-400 font-mono">"/videos/ma-video.mp4"</span> avec <span className="text-yellow-400 font-mono">type: "mp4"</span>.</li>
                <li>Change aussi le titre, l'année et la description. C'est tout !</li>
              </ol>
              <p><b className="text-yellow-300">Méthode 2 — YouTube :</b></p>
              <ol className="list-decimal ml-5 space-y-1 text-gray-400">
                <li>Mets ta vidéo en ligne (non répertoriée suffit).</li>
                <li>Copie l'ID : tout ce qui suit <span className="text-yellow-400 font-mono">watch?v=</span> dans l'adresse.</li>
                <li>Dans <span className="text-yellow-400 font-mono">FILM_VIDEOS</span>, mets cet ID dans <span className="text-yellow-400 font-mono">src</span> avec <span className="text-yellow-400 font-mono">type: "youtube"</span>.</li>
              </ol>
              <p><b className="text-yellow-300">Astuce express :</b> le bouton <span className="text-yellow-400">"Tester ma vidéo"</span> permet de regarder immédiatement une vidéo de ton PC sans toucher au code (aperçu temporaire).</p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-4 w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Compris !
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
