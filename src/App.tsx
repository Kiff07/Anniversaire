import React, { useState } from 'react';
import { BirthdayStar } from './types/cinema';
import { STAR_DEFAULT_BIO } from './config/media';
import { UniversalIntro } from './components/UniversalIntro';
import { CinemaNavbar } from './components/CinemaNavbar';
import { HeroPremiere } from './components/HeroPremiere';
import { VipTicket } from './components/VipTicket';
import { StarCatchGame } from './components/StarCatchGame';
import { CinemaQuiz } from './components/CinemaQuiz';
import { FilmsGallery } from './components/FilmsGallery';
import { MoviePitchGenerator } from './components/MoviePitchGenerator';
import { Soundboard } from './components/Soundboard';
import { LifeStoryboard } from './components/LifeStoryboard';
import { WalkOfFameGuestbook } from './components/WalkOfFameGuestbook';
import { EndCredits } from './components/EndCredits';
import { StarCustomizerModal } from './components/StarCustomizerModal';
import { CinemaFooter } from './components/CinemaFooter';

const DEFAULT_STAR: BirthdayStar = {
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
};

export const App: React.FC = () => {
  // Informations de la star (avec migration douce si ancienne sauvegarde sans bio)
  const [star, setStar] = useState<BirthdayStar>(() => {
    try {
      const saved = localStorage.getItem('cinema_birthday_star_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STAR, ...parsed, bio: parsed.bio || STAR_DEFAULT_BIO };
      }
    } catch {
      // fallback
    }
    return DEFAULT_STAR;
  });

  const [showUniversalIntro, setShowUniversalIntro] = useState(true);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleSaveStar = (updated: BirthdayStar) => {
    setStar(updated);
    try {
      localStorage.setItem('cinema_birthday_star_data', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleScrollToCredits = () => {
    const el = document.getElementById('generique');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-yellow-500 selection:text-black">
      {/* 1. INTRO 3D UNIVERSAL STUDIOS */}
      {showUniversalIntro && (
        <UniversalIntro
          starName={star.name}
          age={star.age}
          onComplete={() => setShowUniversalIntro(false)}
        />
      )}

      {/* 2. BARRE DE NAVIGATION */}
      <CinemaNavbar
        star={star}
        onOpenCustomizer={() => setShowCustomizer(true)}
        onReplayUniversal={() => setShowUniversalIntro(true)}
        onScrollToCredits={handleScrollToCredits}
      />

      {/* 3. HÉROS + PRÉSENTATION VEDETTE (2 PHOTOS + DÉDICACE) */}
      <HeroPremiere
        star={star}
        onReplayUniversal={() => setShowUniversalIntro(true)}
        onOpenCustomizer={() => setShowCustomizer(true)}
      />

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
        {/* BILLET VIP */}
        <section id="billet" className="scroll-mt-24">
          <VipTicket star={star} />
        </section>

        {/* JEU FACILE À SCORE : STAR CATCH */}
        <section id="jeu-score" className="scroll-mt-24">
          <StarCatchGame />
        </section>

        {/* QUIZ & RÉPLIQUES CULTES */}
        <section id="quiz" className="scroll-mt-24">
          <CinemaQuiz starName={star.name} />
        </section>

        {/* FILMS RÉALISÉS & BEHIND THE SCENES */}
        <section id="films" className="scroll-mt-24">
          <FilmsGallery star={star} />
        </section>

        {/* GÉNÉRATEUR DE PITCH HOLLYWOODIEN */}
        <section id="pitch-generator" className="scroll-mt-24">
          <MoviePitchGenerator star={star} />
        </section>

        {/* BOÎTE À SONS DU STUDIO */}
        <section id="soundboard" className="scroll-mt-24">
          <Soundboard />
        </section>

        {/* STORYBOARD PHOTOS DE SA VIE */}
        <section id="storyboard" className="scroll-mt-24">
          <LifeStoryboard star={star} />
        </section>

        {/* WALK OF FAME / LIVRE D'OR */}
        <section id="walkoffame" className="scroll-mt-24">
          <WalkOfFameGuestbook star={star} />
        </section>

        {/* GÉNÉRIQUE DE FIN DÉFILANT */}
        <section id="credits-section" className="scroll-mt-24">
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-[0.4em] font-mono text-yellow-500 font-bold">
              ★ THE FINAL CURTAIN CALL ★
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white mt-1 gold-glow">
              LE GÉNÉRIQUE DE FIN DU FILM
            </h2>
          </div>
          <EndCredits star={star} />
        </section>
      </main>

      {/* 4. PIED DE PAGE */}
      <CinemaFooter
        star={star}
        onReplayUniversal={() => setShowUniversalIntro(true)}
        onOpenCustomizer={() => setShowCustomizer(true)}
      />

      {/* 5. MODALE DE PERSONNALISATION */}
      {showCustomizer && (
        <StarCustomizerModal
          star={star}
          onSave={handleSaveStar}
          onClose={() => setShowCustomizer(false)}
        />
      )}
    </div>
  );
};

export default App;
