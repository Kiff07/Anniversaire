import React, { useState } from 'react';
import { BirthdayStar } from '../types/cinema';
import { Sliders, Check, X, RotateCcw, PenLine } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';
import { STAR_DEFAULT_BIO } from '../config/media';

interface StarCustomizerModalProps {
  star: BirthdayStar;
  onSave: (updated: BirthdayStar) => void;
  onClose: () => void;
}

export const StarCustomizerModal: React.FC<StarCustomizerModalProps> = ({ star, onSave, onClose }) => {
  const [formData, setFormData] = useState<BirthdayStar>({ ...star });

  const handleChange = (field: keyof BirthdayStar, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cinemaAudio.playClapSound();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({
      name: 'Avotra',
      age: 26,
      nickname: 'Avotra la Légende',
      birthDate: '2000',
      partyDate: 'Mercredi 14 Octobre • 00h00',
      partyLocation: 'Le Studio 7 • Grand Tapis Rouge',
      favoriteGenre: 'Comédie, Action & Blockbuster',
      movieTitle: 'Avotra : Le Blockbuster des 26 Ans',
      directorSubtitle: 'Réalisé par Tous ses Meilleurs Complices',
      tagline: '26 ans de charisme, zéro cascadeur et 100% de fous rires garantis.',
      bio: STAR_DEFAULT_BIO
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="cinema-card rounded-2xl max-w-xl w-full p-6 sm:p-8 border-2 border-yellow-500/40 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-cinzel font-bold text-yellow-400">
              CLAP DE PERSONNALISATION
            </h3>
            <p className="text-xs text-gray-400">
              Adaptez le site, les jeux et la dédicace au prénom de votre ami !
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-yellow-300 uppercase tracking-wider mb-1">
                Prénom de l'Ami / Star :
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Ex: Alexandre, Sarah..."
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-bold text-sm focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-yellow-300 uppercase tracking-wider mb-1">
                Âge fêté :
              </label>
              <input
                type="number"
                required
                min={1}
                max={120}
                value={formData.age}
                onChange={e => handleChange('age', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-bold text-sm focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1">
              Titre du Film Officiel :
            </label>
            <input
              type="text"
              required
              value={formData.movieTitle}
              onChange={e => handleChange('movieTitle', e.target.value)}
              placeholder="Ex: Le Fabuleux Destin d'Alex"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1">
                Date & Heure de la Fête :
              </label>
              <input
                type="text"
                value={formData.partyDate}
                onChange={e => handleChange('partyDate', e.target.value)}
                placeholder="Ex: Samedi 21 Juin • 20h00"
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1">
                Lieu du Tournage / Soirée :
              </label>
              <input
                type="text"
                value={formData.partyLocation}
                onChange={e => handleChange('partyLocation', e.target.value)}
                placeholder="Ex: Le Loft des Amis, Paris"
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-1">
              Slogan / Tagline du Film :
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={e => handleChange('tagline', e.target.value)}
              placeholder="Ex: 30 ans de charisme, 0 cascadeur et 100% de rigolade."
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/25 rounded-xl p-4">
            <label className="flex items-center gap-1.5 text-xs font-mono text-yellow-300 uppercase tracking-wider mb-1.5">
              <PenLine className="w-3.5 h-3.5" />
              Ma dédicace / description de la star :
            </label>
            <p className="text-[11px] text-gray-400 mb-2">
              Ce texte apparaît entre ses 2 photos, juste sous le titre. Écris ton petit mot personnel ici 💛
            </p>
            <textarea
              rows={5}
              value={formData.bio}
              onChange={e => handleChange('bio', e.target.value)}
              placeholder="Écris ici ta petite description de ton ami..."
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none resize-y leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Réinitialiser
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs rounded-lg transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-cinzel"
              >
                <Check className="w-4 h-4" />
                Valider & Appliquer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
