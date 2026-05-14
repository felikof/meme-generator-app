# 🎭 Meme Generator App

Une application **React** moderne et interactive permettant de créer, personnaliser, sauvegarder et partager des mèmes en quelques clics grâce à un éditeur puissant basé sur l'API `<canvas>`.

---

## ✨ Fonctionnalités

### 🖌️ Édition & Personnalisation
*   **Importation multi-source** : Sélectionnez vos fichiers via l'explorateur ou utilisez le **drag & drop** directement sur l'éditeur.
*   **Textes dynamiques** :
    *   Ajout illimité de zones de texte.
    *   Personnalisation de la taille, de la couleur et du contour (stroke).
*   **Manipulation intuitive** : Déplacez vos textes par simple glisser-déposer sur l'image (Drag & Drop interactif sur Canvas).

### 📁 Gestion & Partage
*   **Galerie locale** : Sauvegardez vos créations pour les retrouver plus tard.
*   **Téléchargement** : Exportez vos mèmes au format PNG haute qualité.
*   **Partage Natif** : Intégration de la **Web Share API** pour partager vos mèmes directement sur vos réseaux sociaux ou applications mobiles.

### 📱 Interface
*   **Design Moderne** : Thème épuré et professionnel.
*   **Responsive** : Utilisable sur ordinateur, tablette et smartphone.

---

## 🛠️ Technologies utilisées

*   **Frontend** : [React](https://reactjs.org/) (Hooks : `useState`, `useEffect`, `useRef`, `useCallback`)
*   **Graphismes** : HTML5 Canvas API
*   **Style** : CSS3 (Flexbox, Grid)
*   **Build Tool** : [Vite](https://vitejs.dev/)

---

## 📂 Structure du projet

```text
MEME-GENERATOR/
└── frontend/
    ├── src/
    │   ├── assets/         # Images et ressources statiques
    │   ├── App.jsx         # Composant racine
    │   ├── Meme.jsx        # Logique de l'éditeur (Canvas)
    │   ├── Meme.css        # Styles de l'interface studio
    │   └── main.jsx        # Point d'entrée React
    ├── index.html          # Template HTML
    └── package.json        # Dépendances et scripts
```

# ⚙️ Installation et démarrage

## Prérequis

Avant de commencer, assure-toi d’avoir installé :

* [Node.js](https://nodejs.org?utm_source=chatgpt.com)
* npm (installé automatiquement avec Node.js)

Vérifie les versions :

```bash id="h7z1wd"
node -v
npm -v
```

---

# 📥 Installation du projet

## 1. Cloner le repository

```bash id="u6q3kt"
git clone https://github.com/USERNAME/meme-platform.git
```

---

## 2. Accéder au dossier du projet

```bash id="s8n1fq"
cd MEME-GENERATOR/frontend
```

---

## 3. Installer les dépendances

```bash id="d5p2ov"
npm install
```

---

# 🚀 Lancer l’application

```bash id="m3x7ze"
npm run dev
```

---

# 🌐 Ouvrir dans le navigateur

Vite affichera une adresse similaire à :

```bash id="v2t6lg"
http://localhost:5173
```

Ouvre cette adresse dans ton navigateur.

---

# 🏗️ Build de production

Pour générer la version de production :

```bash id="e9k4bc"
npm run build
```

Les fichiers générés seront dans le dossier :

```bash id="q1w8ry"
dist/
```

---

# 👀 Prévisualiser le build

```bash id="r4j7dn"
npm run preview
```
