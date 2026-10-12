import React, { useState, useEffect } from 'react';
import { BirthdayStar, GuestbookEntry } from '../types/cinema';
import { cinemaAudio } from '../utils/audioEffects';
import { Star, Send, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WalkOfFameProps {
  star: BirthdayStar;
}

const DEFAULT_ENTRIES: GuestbookEntry[] = [
  {
    id: '1',
    name: 'Franckie',
    role: 'Producteurs Associés',
    message: 'Joyeux anniversaire à toi et je te souhaite tout les meilleurs voeux, accomplis tes rêves et bon déliiire.',
    starRating: 5,
    timestamp: 'Il y a 2 heures',
    emoji: '🎬'
  },
  {
    id: '2',
    name: 'Andry Rakotoarivony',
    role: 'Chef Cascadeur',
    message: 'Prêt pour le tournage de l’épisode des 30 ans ! @ projet ONY miona ataontsika milay be io.',
    starRating: 5,
    timestamp: 'Il y a 4 heures',
    emoji: '🔥'
  },
  {
    id: '3',
    name: 'tout tes amies',
    role: 'Critique Première',
    message: 'Un scénario de vie captivant, un casting de potes incroyable, bref : 5 étoiles direct ! Ne change jamais ! Happy birthday lessy',
    starRating: 5,
    timestamp: 'Hier',
    emoji: '⭐'
  }
];

const STORAGE_KEY = 'cinema_birthday_guestbook_v2';
const LEGACY_STORAGE_KEY = 'cinema_birthday_guestbook';

// Anciennes entrées de test à ne plus afficher (insensible à la casse)
const REMOVED_NAMES = ['lucas', 'thomas', 'julie'];

// Migration des anciennes données : on garde les vrais messages
// (ex: Finaritra), on jette les anciens tests, et on garantit
// l'affichage des 3 messages par défaut ci-dessus.
const migrateLegacyEntries = (legacy: GuestbookEntry[]): GuestbookEntry[] => {
  const kept = legacy.filter(
    e => e && e.name && !REMOVED_NAMES.includes(e.name.trim().toLowerCase())
  );
  const defaultIds = new Set(DEFAULT_ENTRIES.map(d => d.id));
  const userEntries = kept.filter(e => !defaultIds.has(e.id));
  return [...userEntries, ...DEFAULT_ENTRIES];
};

export const WalkOfFameGuestbook: React.FC<WalkOfFameProps> = ({ star }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Première visite depuis la mise à jour : migrer l'ancien stockage
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) {
        const migrated = migrateLegacyEntries(JSON.parse(legacy));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        return migrated;
      }
    } catch {
      // fallback
    }
    return DEFAULT_ENTRIES;
  });

  const [authorName, setAuthorName] = useState('');
  const [role, setRole] = useState('Fan Numéro 1');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌟');

  const emojis = ['🌟', '🎬', '🍿', '🍾', '🎉', '🏆', '🎩', '❤️'];

  const roles = [
    'Fan Numéro 1',
    'Co-Réalisateur du film',
    'Chef Cascadeur',
    'Responsable Cocktails',
    'Ami de toujours',
    'Critique du Festival'
  ];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    cinemaAudio.playCameraShutter();
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: authorName.trim(),
      role: role,
      message: message.trim(),
      starRating: 5,
      timestamp: "À l'instant",
      emoji: selectedEmoji
    };

    setEntries(prev => [newEntry, ...prev]);
    setAuthorName('');
    setMessage('');
  };

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Star className="w-6 h-6 fill-current text-yellow-400" />
            LE WALK OF FAME DES AMIS (LIVRE D'OR)
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Gravez votre étoile et laissez un mot dédicacé à {star.name} sur le boulevard des célébrités !
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-mono bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/30">
          <Award className="w-4 h-4" />
          <span>{entries.length} Étoiles Scellées</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form to leave a star / dedication */}
        <div className="lg:col-span-1 bg-zinc-900/90 p-5 rounded-2xl border border-yellow-500/20">
          <h3 className="font-cinzel font-bold text-sm text-yellow-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            GRAVER VOTRE ÉTOILE
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                Votre Nom ou Surnom :
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder="Ex: Maxime & Chloé"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                Votre Rôle de Complice :
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-yellow-400 focus:border-yellow-400 focus:outline-none"
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                Choisissez votre Symbole :
              </label>
              <div className="flex gap-1.5 flex-wrap">
                {emojis.map(em => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setSelectedEmoji(em)}
                    className={`w-9 h-9 text-lg rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                      selectedEmoji === em
                        ? 'bg-yellow-500/30 border-yellow-400 scale-110'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                Votre Message de Star :
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Un souvenir inoubliable, une punchline, un vœu pour l'année à venir..."
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-white focus:border-yellow-400 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-cinzel"
            >
              <Send className="w-4 h-4" />
              Sceller mon Étoile d'Or
            </button>
          </form>
        </div>

        {/* The Walk of Fame Stars Pavement */}
        <div className="lg:col-span-2 space-y-4 max-h-[520px] overflow-y-auto pr-2">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="p-5 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-yellow-500/25 relative group hover:border-yellow-400 transition-all shadow-md"
            >
              {/* Star Emblem Background Icon */}
              <div className="absolute top-4 right-4 text-3xl opacity-80 group-hover:scale-125 transition-transform select-none">
                {entry.emoji}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-cinzel font-bold text-yellow-400 text-base">
                  {entry.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-gray-300 font-mono">
                  {entry.role}
                </span>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed font-light mb-3">
                « {entry.message} »
              </p>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono pt-2 border-t border-zinc-800/80">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(entry.starRating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="ml-1 text-[10px] text-gray-400 font-sans">
                    5/5 Étoiles
                  </span>
                </div>
                <span>{entry.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};