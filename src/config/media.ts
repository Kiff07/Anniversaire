/**
 * ============================================================
 *  📸🎬 FICHIER CENTRAL DES PHOTOS & VIDÉOS — À MODIFIER ICI !
 * ============================================================
 *
 *  Salut ! C'est ICI que tu changes toutes les photos et vidéos
 *  du site, directement dans VS Code. Pas besoin de toucher aux
 *  autres fichiers.
 *
 *  COMMENT REMPLACER UNE PHOTO ?
 *  ------------------------------
 *  1. Copie ta photo dans le dossier :  public/images/
 *     Exemple : public/images/mon-ami-1.jpg
 *
 *  2. Change le chemin ci-dessous :
 *     src: "/images/mon-ami-1.jpg"
 *
 *  COMMENT REMPLACER UNE VIDÉO ?
 *  ------------------------------
 *  OPTION A — Vidéo sur ton PC :
 *    1. Copie ta vidéo dans :  public/videos/
 *       Exemple : public/videos/court-metrage.mp4
 *    2. Mets :  src: "/videos/court-metrage.mp4"  et  type: "mp4"
 *
 *  OPTION B — Vidéo YouTube :
 *    1. Récupère l'ID de ta vidéo YouTube.
 *       Exemple : pour https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *       l'ID est : dQw4w9WgXcQ
 *    2. Mets :  src: "dQw4w9WgXcQ"  et  type: "youtube"
 *
 *  ASTUCE : les images actuelles sont des exemples générés par IA.
 *  Remplace-les par les vraies photos de ton ami ! 📷
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
    // 👉 PHOTO 1 : remplace par /images/ton-fichier.jpg
    src: "public/images/8e8dd141-dba1-46f2-9c59-afc258d4fd44.jpg",
    caption: "Un bg d'un niveau exeptionnel",
    badge: "★ LA STAR",
  },
  {
    // 👉 PHOTO 2 : remplace par /images/ton-fichier.jpg
    src: "public/images/6525a6bf-c8c0-4c83-9d27-e82eeafe5f2f.jpg",
    caption: "Un sourire comme ça lors des tournages",
    badge: "🎬 LE RÉALISATEUR",
  },
];

// Texte de présentation affiché entre les 2 photos.
// 👉 Tu peux aussi le modifier directement sur le site
//    avec le bouton "Personnaliser" (champ "Ma dédicace").
export const STAR_DEFAULT_BIO = `Depuis toujours, tu transformes chaque moment ordinaire en scène de film culte. Tes courts-métrages, tes idées folles, ta façon de diriger une bande de potes comme une équipe de tournage… tout chez toi respire le cinéma.

Ce site est ton petit blog personnel : ta vie en superproduction, avec rires, adalana et tout ce qui peut te definir. Concernant les photos, c'était de la galère mais reny aloha no misy. Joyeux anniversaire, mon réalisateur préféré !`;

// ------------------------------------------------------------
// 2. LES 4 IMAGES DU STORYBOARD (frise de sa vie)
// ------------------------------------------------------------
export const STORYBOARD_IMAGES: StoryImage[] = [
  {
    id: "enfance",
    // 👉 Remplace par ta photo d'enfance
    src: "/images/d31eba6f-4b92-4cd5-92fa-3117827d862b.jpg",
    alt: "Feeling mlay foana",
  },
  {
    id: "aventure",
    // 👉 Remplace par une photo d'ado / entre amis
    src: "/images/6870764c-85be-4fae-8d26-e3e62913f7cd.jpg",
    alt: "Chic ça waaaaaw",
  },
  {
    id: "tournage",
    // 👉 Remplace par une photo de tournage / passion cinéma
    src: "/images/e32966c7-6741-4d17-acac-1aa1c2f49b69.jpg",
    alt: "Photo de tournage",
  },
  {
    id: "anniversaire",
    // 👉 Remplace par une photo de fête / anniversaire passé
    src: "/images/89a68673-393f-4bbb-8d8c-ed6f7662781a.jpg",
    alt: "Photo de fête d'anniversaire",
  },
];

// ------------------------------------------------------------
// 3. LES FILMS & VIDÉOS BACKSTAGE (galerie vidéo)
// ------------------------------------------------------------
export const FILM_VIDEOS: FilmVideo[] = [
  {
    id: "film-1",
    title: "Mon Premier Court-Métrage",
    category: "film",
    year: " 10 Jan 2025",
    duration: "1 min",
    description:
      "Ton tout premier film kely, NO RAIN, the first videos that you post in your youtube account. No rain is a reference to the drought that the actual situation of our country. it is kinda refering also to letting go and living life as it is. Enjoying life as it comes.I don't own the rights of the song Someday i'll get it - Alek Olsen.",
    type: "mp4",
    // 👉 Mets ton fichier : "/videos/mon-court-metrage.mp4"
    //    OU un id YouTube avec type: "youtube"
    src: "public/videos/44e441f-bfe6-47a2-a25f-85f21c0a9a0f.mp4",
    poster:
      "public/images/7b538de6-0bcd-455e-96d2-52dd14570181.jpg",
  },
  {
    id: "film-2",
    title: "Projet 48H — Tourné-Monté",
    category: "film",
    year: "2024",
    duration: "3 min",
    description:
      "👉 REMPLACE-MOI : décris ici son deuxième film. Le fameux défi 48h où toute l'équipe n'a pas dormi mais a fini le montage à 6h du matin !",
    type: "mp4",
    src: "https://videos.pexels.com/video-files/34677880/14698571_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/34677880/pexels-photo-34677880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
  },
  {
    id: "backstage-1",
    title: "Behind The Scenes — Jour de Tournage",
    category: "backstage",
    year: "2024",
    duration: "1 min",
    description:
      "👉 REMPLACE-MOI : raconte les coulisses ! La caméra qui tombe en panne, le perchman qui apparaît dans le champ, la pizza froide de 15h… la vraie vie d'un tournage entre potes.",
    type: "mp4",
    src: "https://videos.pexels.com/video-files/36604686/15520317_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/36604686/pexels-photo-36604686.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
  },
  {
    id: "mahalatsaka-1",
    title: "Bêtisier Officiel — Fous Rires Garantis",
    category: "mahalatsaka",
    year: "2025",
    duration: "2 min",
    description:
      "👉 REMPLACE-MOI : le meilleur moment ! Les prises ratées, les fous rires incontrôlables, les répliques oubliées… Ce que le montage final n'a jamais montré.",
    type: "mp4",
    src: "https://videos.pexels.com/video-files/36604692/15520323_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/36604692/pexels-photo-36604692.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
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
