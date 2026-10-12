/**
 * ============================================================
 *  📸🎬 FICHIER CENTRAL DES PHOTOS & VIDÉOS
 * ============================================================
 *
 *  Tout est déjà branché :
 *  - Photos  →  dossier public/images/  (chemins "/images/...")
 *  - Vidéos  →  dossier public/videos/  (chemins "/videos/...")
 *
 *  Pour changer un média : remplace le fichier dans public/
 *  et mets à jour le chemin ci-dessous (ou ajoute une entrée).
 */

export interface StarPhoto {
  src: string;
  caption: string;   // légende sous la photo
  badge: string;     // petit badge doré sur la photo
}

export interface StoryImage {
  id: string;
  src: string;
  alt: string;
}

export interface GalleryPhoto {
  src: string;
  caption: string;
  badge: string;
}

export interface FilmVideo {
  id: string;
  title: string;
  category: "film" | "backstage" | "mahalatsaka"; // film = réalisé par lui, backstage = coulisses, mahalatsaka = fous rires
  year: string;
  duration: string;
  description: string;
  type: "mp4" | "youtube";
  src: string;       // chemin mp4 OU id YouTube
  poster: string;    // image miniature affichée avant lecture
}

// ------------------------------------------------------------
// 1. LES 2 PHOTOS VEDETTE (section présentation sous le titre)
// ------------------------------------------------------------
export const STAR_PHOTOS: StarPhoto[] = [
  {
    src: "/images/8e8dd141-dba1-46f2-9c59-afc258d4fd44.jpg",
    caption: "Un bg d'un niveau exceptionnel",
    badge: "★ LA STAR",
  },
  {
    src: "/images/6525a6bf-c8c0-4c83-9d27-e82eeafe5f2f.jpg",
    caption: "Un sourire comme ça lors des tournages",
    badge: "🎬 LE RÉALISATEUR",
  },
];

// Texte de présentation affiché entre les 2 photos.
// (Modifiable aussi sur le site avec le bouton "Personnaliser".)
export const STAR_DEFAULT_BIO = `Depuis toujours, tu transformes chaque moment ordinaire en scène de film culte. Tes courts-métrages, tes idées folles, ta façon de diriger une bande de potes comme une équipe de tournage… tout chez toi respire le cinéma.

Ce site est ton petit blog personnel : ta vie en superproduction, avec rires, adalana et tout ce qui peut te definir. Concernant les photos, c'était de la galère mais reny aloha no misy. Joyeux anniversaire, mon réalisateur préféré !`;

// ------------------------------------------------------------
// 2. LES 4 IMAGES DU STORYBOARD (frise de sa vie)
// ------------------------------------------------------------
export const STORYBOARD_IMAGES: StoryImage[] = [
  {
    id: "enfance",
    src: "/images/d31eba6f-4b92-4cd5-92fa-3117827d862b.jpg",
    alt: "Feeling mlay foana",
  },
  {
    id: "aventure",
    src: "/images/6870764c-85be-4fae-8d26-e3e62913f7cd.jpg",
    alt: "Chic ça waaaaaw",
  },
  {
    id: "tournage",
    src: "/images/e32966c7-6741-4d17-acac-1aa1c2f49b69.jpg",
    alt: "Photo de tournage",
  },
  {
    id: "anniversaire",
    src: "/images/89a68673-393f-4bbb-8d8c-ed6f7662781a.jpg",
    alt: "Photo de fête d'anniversaire",
  },
];

// ------------------------------------------------------------
// 3. LES FILMS & VIDÉOS (galerie vidéo)
// ------------------------------------------------------------
export const FILM_VIDEOS: FilmVideo[] = [
  {
    id: "film-1",
    title: "NO RAIN — Mon Premier Court-Métrage",
    category: "film",
    year: "10 Jan 2025",
    duration: "55 s",
    description:
      "Ton tout premier film kely, NO RAIN, the first videos that you post in your youtube account. No rain is a reference to the drought that the actual situation of our country. it is kinda refering also to letting go and living life as it is. Enjoying life as it comes. I don't own the rights of the song Someday i'll get it - Alek Olsen.",
    type: "mp4",
    src: "/videos/film-1-no-rain.mp4",
    poster: "/images/0b0ca95f-e081-4259-ae9f-1b87ffac77d1.jpg",
  },
  {
    id: "film-2",
    title: "Film 2 — Nouvelle Réalisation",
    category: "film",
    year: "2025",
    duration: "45 s",
    description:
      "Le deuxième film de Avotra : toujours derrière la caméra, toujours plein d'idées, et toujours une équipe de potes prête à le suivre dans ses délires. Une nouvelle preuve que ce gars est né pour raconter des histoires.",
    type: "mp4",
    src: "/videos/film-2.mp4",
    poster: "/images/1929d7e5-c68b-4d2b-a5dc-24099a523947.jpg",
  },
  {
    id: "film-3",
    title: "En Plein Tournage",
    category: "backstage",
    year: "2025",
    duration: "10 s",
    description:
      "Les coulisses, là où tout se joue vraiment : les réglages, les répétitions, la concentration avant la prise… La vraie vie d'un tournage entre potes, sans filtre.",
    type: "mp4",
    src: "/videos/film-3.mp4",
    poster: "/images/88c9cf84-55ac-4027-ab41-1c9404aa7108.jpg",
  },
  {
    id: "film-4",
    title: "mahalatsaka — Les Prises Ratées",
    category: "mahalatsaka",
    year: "2025",
    duration: "34 s",
    description:
      "Le meilleur moment de tous les tournages : les prises ratées, les répliques oubliées et les fous rires incontrôlables que le montage final n'a jamais montrés. À consommer sans modération !",
    type: "mp4",
    src: "/videos/film-4.mp4",
    poster: "/images/b00048ae-6342-455e-86ae-79913926870e.jpg",
  },
];

export const FILM_CATEGORIES: Record<string, { label: string; emoji: string; hint: string }> = {
  film: {
    label: "Films réalisés",
    emoji: "🎬",
    hint: "Les courts-métrages dirigés par la star",
  },
  backstage: {
    label: "Behind The Scenes",
    emoji: "📹",
    hint: "Les coulisses des tournages",
  },
  mahalatsaka: {
    label: "mahalatsaka",
    emoji: "😂",
    hint: "Prises ratées & fous rires",
  },
};

// ------------------------------------------------------------
// 4. LA GALERIE PHOTOS (pellicule souvenir)
// ------------------------------------------------------------
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/264f73d1-6f3c-448b-85a2-29968c4574b0.jpg",
    caption: "Ce sourire qui met tout le monde de bonne humeur",
    badge: "😄 BONNE HUMEUR",
  },
  {
    src: "/images/4c72ae77-0a8c-40ad-809d-433c81724c4e.jpg",
    caption: "Toujours en train de réfléchir à son prochain plan",
    badge: "🎬 EN RÉFLEXION",
  },
  {
    src: "/images/7b538de6-0bcd-455e-96d2-52dd14570181.jpg",
    caption: "En pleine inspiration, même autour d'un café",
    badge: "☕ PAUSE CAFÉ",
  },
  {
    src: "/images/8c707574-e8cc-4ebc-973d-47245d924abd.jpg",
    caption: "Le réalisateur, même en mode détente",
    badge: "🧢 MODE COOL",
  },
  {
    src: "/images/f211ad9b-d568-4765-a943-d25d9368372b.jpg",
    caption: "Quand il fait le pitre juste pour la photo",
    badge: "🤪 LE PITRE",
  },
];
