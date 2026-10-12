import React, { useState } from 'react';
import { BirthdayStar } from '../types/cinema';
import { Film, Sliders, Volume2, VolumeX, Sparkles, Trophy, HelpCircle, Zap, Star, Menu, X } from 'lucide-react';
import { cinemaAudio } from '../utils/audioEffects';

interface CinemaNavbarProps {
  star: BirthdayStar;
  onOpenCustomizer: () => void;
  onReplayUniversal: () => void;
  onScrollToCredits: () => void;
}

export const CinemaNavbar: React.FC<CinemaNavbarProps> = ({
  star,
  onOpenCustomizer,
  onReplayUniversal,
  onScrollToCredits
}) => {
  const [isMuted, setIsMuted] = useState(!cinemaAudio.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    cinemaAudio.enabled = !cinemaAudio.enabled;
    setIsMuted(!cinemaAudio.enabled);
    if (cinemaAudio.enabled) {
      cinemaAudio.playClapSound();
    }
  };

  const navLinks = [
    { label: 'Billet VIP', href: '#billet', icon: Sparkles },
    { label: 'Jeu Star Catch', href: '#jeu-score', icon: Zap },
    { label: 'Quiz Cinéma', href: '#quiz', icon: HelpCircle },
    { label: 'Films & Backstage', href: '#films', icon: Trophy },
    { label: 'Storyboard', href: '#storyboard', icon: Film },
    { label: 'Walk of Fame', href: '#walkoffame', icon: Star },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-yellow-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 text-black shadow-md group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="font-cinzel font-black tracking-wider text-sm sm:text-base text-yellow-400 gold-glow">
              {star.name.toUpperCase()} STUDIOS
            </div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
              ★ {star.age}TH ANNIVERSARY ★
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-gray-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 rounded-lg hover:text-yellow-400 hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={onScrollToCredits}
            className="px-3 py-2 rounded-lg text-yellow-400 hover:bg-yellow-500/10 transition-colors cursor-pointer font-cinzel font-bold"
          >
            📜 Générique
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Replay Universal Intro */}
          <button
            onClick={onReplayUniversal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/15 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 text-xs font-cinzel font-bold transition-all cursor-pointer"
            title="Revoir la prestigieuse intro 3D Universal"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intro Universal</span>
          </button>

          {/* Customizer */}
          <button
            onClick={onOpenCustomizer}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-gray-200 border border-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Modifier le prénom, l'âge et les infos de l'ami"
          >
            <Sliders className="w-4 h-4 text-yellow-400" />
            <span className="hidden md:inline">Personnaliser</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-yellow-400 border border-zinc-700 transition-colors cursor-pointer"
            title={isMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-900 text-gray-300 border border-zinc-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-zinc-900 hover:text-yellow-400 flex items-center gap-2"
            >
              <link.icon className="w-4 h-4 text-yellow-400" />
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToCredits();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-yellow-400 font-bold hover:bg-zinc-900 flex items-center gap-2"
          >
            📜 Voir le Générique de Fin
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onReplayUniversal();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-yellow-300 font-bold bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Revoir l'Intro Universal
          </button>
        </div>
      )}
    </nav>
  );
};
