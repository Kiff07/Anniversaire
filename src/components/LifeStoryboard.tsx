import React, { useState, useRef } from 'react';
import { BirthdayStar } from '../types/cinema';
import { STORYBOARD_IMAGES } from '../config/media';
import { Film, Plus, Camera, X, ImagePlus } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════
 *  🎞️ STORYBOARD DE SA VIE — AVEC VRAIES PHOTOS
 * ───────────────────────────────────────────────────────────
 *  POUR CHANGER LES PHOTOS (dans VS Code) :
 *  → Ouvre le fichier  src/config/media.ts
 *  → Modifie la section  STORYBOARD_IMAGES
 *  → Mets tes images dans  public/images/
 * ═══════════════════════════════════════════════════════════
 */

interface StoryEpisode {
  id: string;
  season: string;
  title: string;
  year: string;
  genre: string;
  synopsis: string;
  quote: string;
  image: string;
}

interface LifeStoryboardProps {
  star: BirthdayStar;
}

export const LifeStoryboard: React.FC<LifeStoryboardProps> = ({ star }) => {
  const img = (id: string, fallback: string) =>
    STORYBOARD_IMAGES.find(i => i.id === id)?.src || fallback;

  const [episodes, setEpisodes] = useState<StoryEpisode[]>([
    {
      id: '1',
      season: 'SAISON 1',
      title: 'Son caractère',
      year: 'Épisode découverte',
      genre: 'Comédie d’Aventure',
      synopsis: `Avotra,un mec plein d'energie qui fait sourire tous le monde autour de lui.
                  On peut pas se laisser de son histoire quand il commence à le raconter.
                  c'est un gars avec un grand cœur
                  `,
      quote: "« j'ai jamais pensé à avoir un amis comme lui. »",
      image: img('enfance', '/images/story-enfance.jpg')
    },
    {
      id: '2',
      season: 'SAISON 2',
      title: 'LES ANNÉES D’OR : ÉTUDES, NUITS BLANCHES & CASCADE',
      year: 'Les moments Folles',
      genre: 'Film Culte de Potes',
      synopsis: 'Avotra,,,on s\'est pas connu depuis très longtemps mais tu es déjâ précieux à mes yeux tu dégages un énergie je sais pas quoi mais je me sens le plus à l\'aise du monde quand je suis avec toi ',
      quote: "« na dia nampianatra nisotro toaka ary ty tsy manina izany fa c'est la vie😂😉 »",
      image: img('aventure', '/images/story-aventure.jpg')
    },
    {
      id: '3',
      season: 'SAISON 3',
      title: 'ENTRÉE DANS LA VIE ACTIVE (OU PRESQUE)',
      year: 'Blockbuster Récent',
      genre: 'Dramédie & Succès',
      synopsis: 'tu es une personne qui a un très bon cœur et que ça va pas changer(je le sais😜)',
      quote: "« j'ai jamais pensé avoir un amis comme toi,un vrai amis»",
      image: img('tournage', '/images/story-tournage.jpg')
    },
    {
      id: '4',
      season: 'SAISON 4',
      title: `LE CLIMAX SUPRÊME : L'ÉPISODE DES ${star.age} ANS`,
      year: 'Grand Événement',
      genre: 'Chef-d’Œuvre Festif',
      synopsis: `tu es précieux à mes yeux et compte sur moi pour juger et critiquer les gens qui te feront du mal
                  je te souhaite tous les bonheurs et la vie plein d'amour
                  une chose que j'aime beaucoup,c'est de te voir amoureux🤭😂`,
      quote: "« C'est que le début du meilleur chapitre ! »",
      image: img('anniversaire', '/images/story-anniversaire.jpg')
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [lightbox, setLightbox] = useState<StoryEpisode | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newSeason, setNewSeason] = useState('ÉPISODE BONUS');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newImage, setNewImage] = useState<string>('/images/story-anniversaire.jpg');
  const fileRef = useRef<HTMLInputElement>(null);

  // Charger une photo depuis le PC pour le nouvel épisode (aperçu immédiat)
  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(URL.createObjectURL(file));
  };

  const handleAddEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSynopsis.trim()) return;

    const newEp: StoryEpisode = {
      id: Date.now().toString(),
      season: newSeason.toUpperCase(),
      title: newTitle.trim().toUpperCase(),
      year: 'Souvenir Inédit',
      genre: 'Scène Coupée',
      synopsis: newSynopsis.trim(),
      quote: newQuote.trim() ? `« ${newQuote.trim()} »` : "« Un grand classique ! »",
      image: newImage
    };

    setEpisodes(prev => [...prev, newEp]);
    setNewTitle('');
    setNewSynopsis('');
    setNewQuote('');
    setNewImage('/images/story-anniversaire.jpg');
    setShowAddModal(false);
  };

  const Perforations = () => (
    <div className="flex gap-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-2.5 h-3.5 bg-black rounded-sm border border-zinc-700" />
      ))}
    </div>
  );

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Film className="w-6 h-6" />
            MA DESCRIPTION DE SA VIE : SAISONS & ÉPISODES
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            La rétrospective en vraies photos des plus grands moments de {star.name} !
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Ajouter une Scène Culte
        </button>
      </div>

      {/* Grille des épisodes avec photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {episodes.map((ep, idx) => (
          <div
            key={ep.id}
            className="rounded-2xl border-2 border-zinc-800 hover:border-yellow-500/50 transition-all bg-zinc-950 overflow-hidden group shadow-lg"
          >
            {/* Bande perforée haute */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex justify-between items-center select-none">
              <Perforations />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                REEL_0{idx + 1} • {ep.season}
              </span>
              <Perforations />
            </div>

            {/* PHOTO de l'épisode (cliquable pour agrandir) */}
            <button
              onClick={() => setLightbox(ep)}
              className="relative w-full h-52 sm:h-60 overflow-hidden cursor-pointer block"
              title="Cliquer pour agrandir la photo"
            >
              <img
                src={ep.image}
                alt={ep.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-yellow-300 font-mono font-bold border border-yellow-500/30">
                  {ep.genre}
                </span>
                <span className="text-[11px] text-gray-300 font-mono bg-black/60 px-2 py-0.5 rounded">
                  {ep.year}
                </span>
              </div>
            </button>

            {/* Contenu texte */}
            <div className="p-5 sm:p-6 space-y-3">
              <h4 className="font-cinzel font-black text-base sm:text-lg text-white group-hover:text-yellow-400 transition-colors leading-snug">
                {ep.title}
              </h4>

              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {ep.synopsis}
              </p>

              {ep.quote && (
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs italic text-yellow-200/90 font-playfair">
                  {ep.quote}
                </div>
              )}
            </div>

            {/* Bande perforée basse */}
            <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-2 flex justify-between items-center select-none">
              <Perforations />
              <span className="text-[9px] font-mono text-zinc-600">
                KODAK 5219 • 500T
              </span>
              <Perforations />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox photo agrandie */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img src={lightbox.image} alt={lightbox.title} className="w-full max-h-[70vh] object-contain bg-black" />
            <div className="bg-zinc-950 p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-cinzel font-bold text-yellow-300 text-sm">{lightbox.title}</div>
                <div className="text-[11px] text-gray-400 font-mono">{lightbox.season} • {lightbox.year}</div>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale d'ajout d'épisode */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="cinema-card rounded-2xl max-w-md w-full p-6 border border-yellow-500/40 my-8">
            <h3 className="text-lg font-cinzel font-bold text-yellow-400 mb-1 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Ajouter une Scène Culte
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Raconte un souvenir marquant avec {star.name} et joins sa photo !
            </p>

            <form onSubmit={handleAddEpisode} className="space-y-4">
              {/* Aperçu + choix de la photo */}
              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-1.5">
                  Photo de la scène :
                </label>
                <div className="flex items-center gap-3">
                  <img src={newImage} alt="Aperçu" className="w-20 h-20 object-cover rounded-xl border border-zinc-700" />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex-1 px-3 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-yellow-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ImagePlus className="w-4 h-4" />
                    Choisir une photo sur mon PC
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePickImage} />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-1">
                  Titre de l'épisode / scène :
                </label>
                <input
                  type="text"
                  required
                  placeholder="EX: LE VOYAGE IMPROVISÉ À BARCELONE"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-1">
                  Saison / Période :
                </label>
                <input
                  type="text"
                  value={newSeason}
                  onChange={e => setNewSeason(e.target.value)}
                  placeholder="Ex: Épisode Bonus"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-1">
                  Le Synopsis du Souvenir :
                </label>
                <textarea
                  required
                  rows={3}
                  value={newSynopsis}
                  onChange={e => setNewSynopsis(e.target.value)}
                  placeholder="Raconte ce qui s'est passé lors de ce moment inoubliable..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase tracking-wider mb-1">
                  Réplique culte de ce jour-là :
                </label>
                <input
                  type="text"
                  value={newQuote}
                  onChange={e => setNewQuote(e.target.value)}
                  placeholder="Ex: 'On ne risque absolument rien !'"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Ajouter au film
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
