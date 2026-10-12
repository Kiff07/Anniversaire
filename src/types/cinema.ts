export interface BirthdayStar {
  name: string;
  age: number;
  nickname: string;
  birthDate: string;
  partyDate: string;
  partyLocation: string;
  favoriteGenre: string;
  movieTitle: string;
  directorSubtitle: string;
  tagline: string;
  bio: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string; // e.g. "Cascadeur en chef", "Critique Télérama", "Co-réalisateur"
  message: string;
  starRating: number;
  timestamp: string;
  emoji: string;
}

export interface OscarCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  nominees: {
    name: string;
    reason: string;
    votes: number;
  }[];
  revealedWinnerIndex: number | null;
}

export interface QuizQuestion {
  id: number;
  type: 'quote' | 'movie' | 'friend';
  prompt: string;
  subtext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
