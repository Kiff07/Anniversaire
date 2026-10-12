# 📸🎬 Guide : mettre les VRAIES photos & vidéos de ton ami

Tout se passe dans **UN SEUL fichier** : `src/config/media.ts`
Ouvre-le dans VS Code, tout est commenté en français. 👍

---

## 1. Les 2 photos vedette (sous le grand titre)

1. Copie tes photos dans le dossier `public/images/`
   - Exemple : `public/images/alex-1.jpg` et `public/images/alex-2.jpg`
2. Dans `src/config/media.ts`, section `STAR_PHOTOS`, change les lignes `src` :
   ```ts
   src: "/images/alex-1.jpg",
   ```
3. Change aussi `caption` (légende) et `badge` si tu veux.

> La dédicace entre les 2 photos se modifie directement sur le site
> avec le bouton **« Personnaliser » → Ma dédicace** (ou dans `STAR_DEFAULT_BIO`).

---

## 2. Les 4 photos du Storyboard (frise de sa vie)

1. Copie tes photos dans `public/images/`
   - Exemple : `public/images/enfance.jpg`, `public/images/soiree.jpg`...
2. Dans `src/config/media.ts`, section `STORYBOARD_IMAGES`, change les `src`.

---

## 3. Les films & vidéos backstage

### Option A — Vidéo enregistrée sur ton PC (recommandée)
1. Crée le dossier `public/videos/` s'il n'existe pas.
2. Copie ta vidéo dedans : `public/videos/mon-film.mp4`
3. Dans `src/config/media.ts`, section `FILM_VIDEOS` :
   ```ts
   type: "mp4",
   src: "/videos/mon-film.mp4",
   ```
4. Change le `title`, `year`, `duration` et `description`.

### Option B — Vidéo YouTube
1. Mets la vidéo en ligne (mode « non répertoriée » suffit).
2. Copie l'ID : dans `https://www.youtube.com/watch?v=XXXX`, l'ID c'est `XXXX`.
3. Dans `FILM_VIDEOS` :
   ```ts
   type: "youtube",
   src: "XXXX",
   ```

### Catégories possibles
- `"film"` → Films réalisés par lui
- `"backstage"` → Behind The Scenes / coulisses
- `"mahalatsaka"` → Bêtisier / fous rires

> Astuce : sur le site, le bouton **« Tester ma vidéo »** permet de regarder
> immédiatement une vidéo de ton PC sans toucher au code (aperçu temporaire).

---

## 4. Miniature (poster) d'une vidéo

Le champ `poster` est l'image montrée avant de lancer la lecture.
Tu peux mettre une de tes images : `"/images/miniature-film.jpg"`.

---

## 5. Rebuild

Après tes modifications, relance :
```
npm run build
```
Et c'est en ligne ! 🍿
