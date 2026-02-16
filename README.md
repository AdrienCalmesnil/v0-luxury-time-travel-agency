# TimeTravel Agency

Landing page immersive pour une agence de voyage temporel fictive de luxe. Le site propose une experience visuelle cinematique avec un design dark mode, des accents dores, du glassmorphism et des animations fluides pour transporter les visiteurs dans un univers de voyage dans le temps.

---

## Technologies utilisees

- **Next.js 16** (App Router) - Framework React full-stack
- **React 19** - Bibliotheque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI accessibles (Button, Input, Badge, Card)
- **next/font** - Optimisation des polices Google (Inter, Cormorant Garamond)
- **next/image** - Optimisation et lazy-loading des images

## Features implementees

- **Hero cinematique** - Image de fond avec animation Ken Burns (zoom/pan continu sur 25s), particules dorees flottantes, et CTA anime
- **Navigation glassmorphism** - Barre de navigation transparente avec effet blur, liens ancres et menu mobile responsive
- **Statistiques agence** - Compteurs animes avec icones dans des cartes glassmorphism
- **Galerie de destinations** - 3 cartes interactives (Paris 1889, Cretace, Florence Renaissance) avec effet hover reveal et badges epoque/prix
- **Previews en alternance** - Sections detaillees avec layout image/texte alterne, tags et descriptions
- **Carrousel de temoignages** - Rotation automatique avec avatars, notes etoiles et navigation manuelle
- **Section reservation (CTA)** - Formulaire avec selecteur de destination, date et nombre de voyageurs
- **Chatbot "Chronos"** - Widget flottant avec reponses pre-configurees, animation de frappe et quick replies
- **Footer complet** - 4 colonnes avec liens, reseaux sociaux et mentions legales
- **Animations au scroll** - Apparition progressive (fade-in) de chaque section via Intersection Observer
- **Design responsive** - Adaptation mobile-first sur toutes les tailles d'ecran

## Outils IA utilises

Ce projet a ete entierement genere avec l'assistance d'outils d'intelligence artificielle, dans un souci de transparence :

| Outil | Utilisation |
|-------|-------------|
| **v0 by Vercel** | Generation du code complet (composants React, styles Tailwind, architecture Next.js), orchestration du projet et assemblage des sections |
| **v0 GenerateImage** | Creation des 4 images du site (hero background, Paris 1889, Cretace, Florence Renaissance) via generation d'images par IA |
| **v0 GenerateDesignInspiration** | Generation du brief de design initial (palette de couleurs, typographie, direction artistique) |

Aucun code n'a ete ecrit manuellement - l'integralite du projet est le resultat d'une collaboration humain-IA via prompts iteratifs.

## Instructions d'installation

### Prerequis

- Node.js 18+
- pnpm (recommande) ou npm

### Installation via shadcn CLI (recommande)

```bash
npx shadcn@latest init
```

### Installation manuelle

```bash
# Cloner le repository
git clone <url-du-repo>
cd timetravel-agency

# Installer les dependances
pnpm install

# Lancer le serveur de developpement
pnpm dev
```

L'application sera accessible sur `http://localhost:3000`.

### Build de production

```bash
pnpm build
pnpm start
```

### Deploiement

Le projet est optimise pour un deploiement sur **Vercel** en un clic via le bouton "Publish" dans v0, ou via :

```bash
npx vercel
```

## Credits

### APIs et services

- **Vercel** - Hebergement et infrastructure
- **Google Fonts** - Polices Inter et Cormorant Garamond (licences open source)

### Assets

- Toutes les images ont ete generees par IA (v0 GenerateImage) et ne representent pas de lieux ou evenements reels
- Les icones utilisent des composants Lucide React (licence ISC)

### Modeles IA

- **v0 by Vercel** (v0.dev) - Assistant de generation de code et de design

---

Projet realise dans le cadre d'une demonstration de capacites de generation IA pour le developpement web.
