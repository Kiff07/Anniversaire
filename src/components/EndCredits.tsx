import React, { useState, useEffect, useRef } from 'react';
import { BirthdayStar } from '../types/cinema';
import { Play, Pause, RotateCcw, Plus, Maximize2, Minimize2, Sparkles, Film, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EndCreditsProps {
  star: BirthdayStar;
}

interface CreditEntry {
  role: string;
  name: string;
}

const DEFAULT_CREDITS: CreditEntry[] = [
  { role: "DANS LE RÔLE DE LA LÉGENDE ABSOLUE", name: "Avotra Rafidimanantsoa" },
  { role: "RÉALISATEURS & ORGANISATEURS", name: "Bola & Kiff" },
  { role: "PRODUCTEUR EXÉCUTIF DU BONHEUR", name: "Tous les invités de la soirée" },
  { role: "RESPONSABLE DU SITE WEB", name: "KIFF" },
  { role: "BÊTISIER DU TOURNAGE", name: "• Prise 1 : Hafaliana re zao" },
  { role: "BÊTISIER DU TOURNAGE", name: "• Prise 2 : adalana koa re zao" },
  { role: "BÊTISIER DU TOURNAGE", name: "• Prise 3 : plein d'amour eee" },
  { role: "REMERCIEMENTS SPÉCIAUX", name: "A ceux qui m'ont partagé tes photos et vidéos" },
  { role: "REMERCIEMENTS SPÉCIAUX", name: "Aux fous rires incontrôlables" },
  { role: "REMERCIEMENTS SPÉCIAUX", name: "À toutes les années passées et à celles encore plus folles à venir !" },
  { role: "MENTION LÉGALE", name: "Aucun ami n'a été maltraité durant le tournage de cet anniversaire" },
  { role: "FIN DE BANDE", name: "MERCI D'ÊTRE DANS NOS VIES ET JOYEUX ANNIVERSAIRE ! ❤️" }
];

export const EndCredits: React.FC<EndCreditsProps> = ({ star }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [credits, setCredits] = useState<CreditEntry[]>(() => {
    return DEFAULT_CREDITS.map(c => 
      c.role.includes("LÉGENDE") ? { ...c, name: star.name.toUpperCase() } : c
    );
  });

  const [newRole, setNewRole] = useState('');
  const [newName, setNewName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Sync star name change
  useEffect(() => {
    setCredits(prev => prev.map(c => 
      c.role.includes("LÉGENDE") ? { ...c, name: star.name.toUpperCase() } : c
    ));
  }, [star.name]);

  // Smooth JS-based scroll with variable speed
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (isPlaying) {
        // base speed: ~45px per second
        scrollPosRef.current += 45 * speedMultiplier * delta;
        const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;

        if (scrollPosRef.current > maxScroll + 200) {
          // Trigger finale confetti when end is reached
          try {
            confetti({
              particleCount: 100,
              spread: 100,
              origin: { y: 0.5 }
            });
          } catch {
            // ignore
          }
          // Loop back to start after a pause
          scrollPosRef.current = 0;
        }

        scrollEl.scrollTop = scrollPosRef.current;
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, speedMultiplier]);

  const handleRestart = () => {
    scrollPosRef.current = 0;
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setIsPlaying(true);
  };

  const handleAddCredit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.trim() || !newName.trim()) return;
    setCredits(prev => [
      ...prev.slice(0, prev.length - 2),
      { role: newRole.trim().toUpperCase(), name: newName.trim() },
      ...prev.slice(prev.length - 2)
    ]);
    setNewRole('');
    setNewName('');
    setShowAddModal(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      id="generique"
      className="relative w-full rounded-2xl overflow-hidden cinema-card border-2 border-yellow-500/30 bg-[#050508] text-white shadow-2xl my-12"
    >
      {/* Top Header Bar */}
      <div className="bg-zinc-950/90 border-b border-yellow-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4 z-20 relative backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg border border-yellow-500/30">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-yellow-400 tracking-wider text-base sm:text-lg flex items-center gap-2">
              LE GÉNÉRIQUE DE FIN DÉFILANT
              <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-mono">
                ROLLING CREDITS
              </span>
            </h3>
            <p className="text-xs text-gray-400">
              L'hommage ultime aux complices du film de ses {star.age} ans
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
            title={isPlaying ? "Mettre en pause" : "Lancer le défilement"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-yellow-400" /> : <Play className="w-4 h-4 text-yellow-400 fill-current" />}
            {isPlaying ? "Pause" : "Lecture"}
          </button>

          <button
            onClick={handleRestart}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
            title="Revenir au début"
          >
            <RotateCcw className="w-3.5 h-3.5 text-yellow-400" />
            Début
          </button>

          {/* Speed Buttons */}
          <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-700">
            {[1, 2, 4].map(s => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                  speedMultiplier === s
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Add custom credit line */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter un rôle
          </button>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-colors cursor-pointer border border-zinc-700"
            title="Plein écran (pour projeter à la fête !)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Rolling Credits Viewing Window */}
      <div
        ref={scrollRef}
        className="relative h-[480px] sm:h-[560px] overflow-hidden select-none bg-radial from-zinc-950 via-[#07070a] to-black"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Top and Bottom Cinema Vignette gradients */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050508] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-10" />

        {/* Subtle Film Grain background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffd700_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

        {/* Scrollable Content Container */}
        <div className="pt-[440px] pb-[500px] max-w-2xl mx-auto px-6 text-center space-y-12">
          {/* Main Title Card */}
          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-yellow-400 tracking-wider gold-glow">
              {star.movieTitle.toUpperCase()}
            </h1>
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400 font-mono">
              UN FILM HOMMAGE EN {star.age} ACTES ET 1000 SOUVENIRS
            </p>
            <div className="w-24 h-0.5 bg-yellow-500/50 mx-auto" />
          </div>

          {/* Credits List */}
          <div className="space-y-8 font-mono">
            {credits.map((entry, idx) => (
              <div key={idx} className="transition-all hover:scale-105">
                <div className="text-xs sm:text-sm tracking-[0.25em] text-yellow-400/80 uppercase font-semibold font-cinzel mb-1">
                  {entry.role}
                </div>
                <div className="text-lg sm:text-2xl font-bold text-white tracking-wide font-sans">
                  {entry.name}
                </div>
              </div>
            ))}
          </div>

          {/* Golden Seal of Celebration */}
          <div className="pt-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-400 shadow-lg shadow-yellow-500/20">
              <Heart className="w-8 h-8 fill-current text-yellow-400" />
            </div>
            <div className="text-sm font-cinzel tracking-widest text-yellow-300">
              PRODUIT AVEC AMOUR PAR TOUS CEUX QUI T'AIMENT
            </div>
            <div className="text-xs text-gray-500 font-mono">
              ★ FESTIVAL INTERNATIONAL DE L'AMITIÉ • PALME D'OR {new Date().getFullYear()} ★
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint Banner */}
      <div className="bg-zinc-950/80 px-6 py-2.5 border-t border-yellow-500/10 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
        <span>🎬 Astuce : Mettez en plein écran et projetez ce générique à la fin de la soirée pour un moment inoubliable !</span>
      </div>

      {/* Modal to add custom credit */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cinema-card rounded-2xl max-w-md w-full p-6 border border-yellow-500/40">
            <h3 className="text-lg font-cinzel font-bold text-yellow-400 mb-2">
              Ajouter une ligne au générique
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Attribuez un rôle décalé ou un titre d'honneur à un ami présent !
            </p>

            <form onSubmit={handleAddCredit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">
                  Rôle ou Titre (ex: Roi du karaoké, Démon de minuit)
                </label>
                <input
                  type="text"
                  required
                  placeholder="EX: RESPONSABLE DES PIZZAS"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">
                  Nom(s) de la personne
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maxime & Julie"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
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
                  Insérer dans le générique
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
