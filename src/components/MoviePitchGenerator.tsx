import React, { useState } from 'react';
import { BirthdayStar } from '../types/cinema';
import { cinemaAudio } from '../utils/audioEffects';
import { Sparkles, Dices, Film, Star, Share2 } from 'lucide-react';

interface MoviePitchGeneratorProps {
  star: BirthdayStar;
}

interface PitchData {
  genre: string;
  title: string;
  tagline: string;
  synopsis: string;
  budget: string;
  rating: string;
  review: string;
  actorCoStar: string;
  bgGradient: string;
}

const PITCH_TEMPLATES = [
  {
    genre: "BLOCKBUSTER D'ACTION & ESPIONNAGE",
    titles: (name: string, age: number) => [
      `MISSION : ${age} ANS - PROTOCOLE APÉRO`,
      `${name.toUpperCase()} : PERMIS DE FESTOYER`,
      `TOP GUN : ${name.toUpperCase()} MAVERICK`,
      `DIE HARD : PIÈGE EN BOÎTE DE NUIT`
    ],
    taglines: [
      "Le monde était en danger. Seul un homme pouvait commander un deuxième tour.",
      "Une mission impossible, 50 invités, et un gâteau à désamorcer.",
      "Plus rapide qu'un bouchon de champagne, plus redoutable que le réveil de 7h."
    ],
    synopses: (name: string, age: number) => [
      `Les services secrets découvrent qu'à l'aube de ses ${age} ans, l'agent d'élite ${name} a été ciblé par un syndicat de la fête internationale. Armé seulement de son charme légendaire et d'une recette secrète de cocktail, il devra sauver la soirée avant minuit.`,
      `Face à une pénurie mondiale de bonne humeur, ${name} infiltre une forteresse réputée imprenable pour subtiliser la bougie magique des ${age} ans. Poursuites en trottinette et cascades sur le dancefloor garanties.`
    ],
    budget: "250 000 000 $ (dont 90% alloués au buffet)",
    rating: "99% CERTIFIED FRESH",
    review: "« Une masterclass d'action et d'amitié. James Bond peut aller se rhabiller. » — Le Figaro",
    actorCoStar: "Avec la participation exceptionnelle de tous ses meilleurs potes",
    bgGradient: "from-amber-950 via-zinc-900 to-black"
  },
  {
    genre: "SCIENCE-FICTION & VOYAGE TEMPOREL",
    titles: (name: string, age: number) => [
      `INTER-${name.toUpperCase()} : L'ÉPOPÉE COSMIQUE`,
      `RETOUR VERS LES ${age} ANS`,
      `THE MATRIX : LA PILULE DE LA TRENTAINE`,
      `DUNE : LE MAÎTRE DU GÂTEAU`
    ],
    taglines: [
      "Dans l'espace, personne ne vous entend souffler vos bougies.",
      "Le temps est relatif. Sa jeunesse, elle, est éternelle.",
      "Il a traversé un trou de ver juste pour ne pas rater l'apéro."
    ],
    synopses: (name: string, age: number) => [
      `En franchissant la frontière dimensionnelle de ses ${age} ans, ${name} déclenche une anomalie spatio-temporelle : chaque minute passée avec ses amis en vaut dix. L'équipage s'élance à travers la galaxie pour célébrer la plus belle fête de l'univers connu.`,
      `Une civilisation extraterrestre intercepte les ondes radio des soirées mémorables de ${name}. Émerveillés, les aliens débarquent sur Terre pour lui décerner le titre de Grand Maître de la Fête Galactique.`
    ],
    budget: "180 000 000 $ et 3 disques durs de photos d'enfance",
    rating: "98% CHEF D'ŒUVRE COSMIQUE",
    review: "« Christopher Nolan en a pleuré d'émotion. Un voyage sensoriel unique. » — Télérama",
    actorCoStar: "Avec Hans Zimmer aux platines & le cosmos en figurant",
    bgGradient: "from-indigo-950 via-zinc-900 to-black"
  },
  {
    genre: "COMÉDIE DÉJANTÉE & CULTE",
    titles: (name: string, age: number) => [
      `VERY BAD ${name.toUpperCase()} : TRIP DES ${age} ANS`,
      `LE FABULEUX DESTIN DE ${name.toUpperCase()}`,
      `${name.toUpperCase()} ET LES AVENTURIERS DU GÂTEAU PERDU`,
      `L'AUBERGE ESPAGNOLE DES ${age} ANS`
    ],
    taglines: [
      "Ils voulaient juste un verre tranquille. Ça a mal tourné.",
      "Une comédie sans filtre, sans coupure pub, et 100% de rigolade.",
      "Certains naissent stars. D'autres naissent encore plus fous."
    ],
    synopses: (name: string, age: number) => [
      `Le lendemain de ses ${age} ans, ${name} se réveille avec un tigre dans la salle de bain, un tatouage éphémère du visage de son meilleur ami et la conviction absolue d'avoir passé la meilleure soirée de l'histoire moderne. Flashback sur 24h de pur délire.`,
      `Comment aborder ses ${age} ans avec panache tout en continuant à commander des pizzas à 2h du matin ? ${name} partage ses secrets d'expert dans cette comédie réconfortante saluée par la critique.`
    ],
    budget: "42 000 $ et beaucoup d'huile de coude",
    rating: "100% RIRES GARANTIS",
    review: "« On rit du début à la fin. Un personnage principal qu'on aimerait tous avoir comme pote ! » — Première",
    actorCoStar: "Scénario improvisé par la vie elle-même",
    bgGradient: "from-rose-950 via-zinc-900 to-black"
  }
];

export const MoviePitchGenerator: React.FC<MoviePitchGeneratorProps> = ({ star }) => {
  const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generateNewPitch = (): PitchData => {
    const template = getRandomItem(PITCH_TEMPLATES);
    const title = getRandomItem(template.titles(star.name, star.age));
    const tagline = getRandomItem(template.taglines);
    const synopsis = getRandomItem(template.synopses(star.name, star.age));

    return {
      genre: template.genre,
      title,
      tagline,
      synopsis,
      budget: template.budget,
      rating: template.rating,
      review: template.review,
      actorCoStar: template.actorCoStar,
      bgGradient: template.bgGradient
    };
  };

  const [pitch, setPitch] = useState<PitchData>(() => generateNewPitch());
  const [copied, setCopied] = useState(false);

  const handleRollNew = () => {
    cinemaAudio.playCameraShutter();
    setPitch(generateNewPitch());
  };

  const handleShare = () => {
    const textToCopy = `🎬 PROCHAINEMENT AU CINÉMA :\n${pitch.title}\n« ${pitch.tagline} »\nAvec ${star.name} dans son propre rôle !\nDate de sortie : ${star.partyDate}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Film className="w-6 h-6" />
            GÉNÉRATEUR D'AFFICHE & PITCH DE BLOCKBUSTER
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Imaginez le prochain chef-d'œuvre hollywoodien avec {star.name} en tête d'affiche !
          </p>
        </div>

        <button
          onClick={handleRollNew}
          className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer font-cinzel"
        >
          <Dices className="w-4 h-4" />
          Générer un autre Pitch
        </button>
      </div>

      {/* Movie Poster & Pitch Showcase */}
      <div className={`rounded-2xl border-2 border-yellow-500/30 p-6 sm:p-8 bg-gradient-to-b ${pitch.bgGradient} relative overflow-hidden shadow-2xl`}>
        {/* Golden laurels badge */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 font-mono text-[11px] font-bold border border-yellow-500/30 uppercase tracking-widest">
              {pitch.genre}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-bold bg-black/40 px-3 py-1 rounded-full border border-yellow-500/20">
            <Star className="w-3.5 h-3.5 fill-current" />
            {pitch.rating}
          </div>
        </div>

        {/* Center Poster Content */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-yellow-300/80 font-mono">
            ★ UN FILM RÉALISÉ POUR SES {star.age} ANS ★
          </p>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white tracking-wider drop-shadow-[0_4px_25px_rgba(255,215,0,0.4)]">
            {pitch.title}
          </h2>

          <p className="text-sm sm:text-base italic font-playfair text-yellow-200">
            « {pitch.tagline} »
          </p>

          <div className="w-16 h-0.5 bg-yellow-500/40 mx-auto my-3" />

          {/* Synopsis */}
          <div className="bg-black/50 backdrop-blur-md p-5 rounded-xl border border-white/10 text-xs sm:text-sm text-gray-200 leading-relaxed font-light text-left">
            <span className="font-bold text-yellow-400 font-sans block mb-1 uppercase tracking-wider text-[11px]">
              SYNOPSIS DU FILM :
            </span>
            {pitch.synopsis}
          </div>

          {/* Casting & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2 font-mono text-xs">
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-gray-400 block text-[10px] uppercase">CASTING PRINCIPAL</span>
              <span className="text-white font-bold">{star.name}</span>
              <span className="text-gray-300 block text-[11px] mt-0.5">{pitch.actorCoStar}</span>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-gray-400 block text-[10px] uppercase">BUDGET ESTIMÉ</span>
              <span className="text-yellow-400 font-bold">{pitch.budget}</span>
              <span className="text-gray-300 block text-[11px] mt-0.5">Sortie : {star.partyDate}</span>
            </div>
          </div>

          {/* Press Review Quote */}
          <div className="pt-2 text-xs italic text-gray-300">
            {pitch.review}
          </div>
        </div>

        {/* Share Button Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Tous droits réservés • Universal {star.name} Studios</span>
          </div>

          <button
            onClick={handleShare}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-yellow-400" />
            {copied ? 'Copié dans le presse-papier !' : 'Partager ce pitch'}
          </button>
        </div>
      </div>
    </div>
  );
};
