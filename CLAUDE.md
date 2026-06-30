# Notes pour Claude Code — StratiBuddy

## Nature du projet
Application web autonome, **hors ligne**, en HTML/CSS/JavaScript pur, sans framework ni dépendance réseau. Cible : smartphone, usage de terrain en archéologie. Trois outils : MiniHarris (matrice de Harris), Calculs d'altis (nivellement), Mémos de fouille.

## Contraintes à respecter impérativement
- **Aucune dépendance réseau** : pas de CDN, pas de Google Fonts, pas de bibliothèque externe. Tout doit fonctionner hors ligne une fois la page chargée.
- **Pas de `localStorage`/`sessionStorage`** : choix de conception, aucune persistance entre sessions. L'export CSV remplace la sauvegarde.
- **Vanilla JS uniquement** : pas de build, pas de bundler. Les fichiers sont chargés directement par `index.html`.
- **Mobile d'abord** : cibles tactiles larges, lisibilité en plein soleil, fort contraste.

## Organisation du code
- `index.html` — structure : en-tête, écran d'accueil (`#accueil`), trois `<section class="volet">` (`#v-harris`, `#v-alti`, `#v-memos`).
- `src/styles.css` — système de design (`:root` avec tokens StratiBuddy) puis styles par composant.
- `src/app.js` — un seul fichier, organisé par blocs commentés : navigation accueil↔volets, logique Harris (state, relations, `dessinerSVG`), altimétrie, mémos (tableau `MEMOS`).

## Vérifier le JS après modification
```bash
node --check src/app.js
```

## Travail en cours / pistes
- Harmoniser la DA des composants internes (boutons `.action`/`.ghost`, champs, titres `h2`, blocs du diagramme SVG, cartes mémos) avec la charte « Terrain sobre » : rayons arrondis (`--r-card`, `--r-btn`), ombres (`--shadow-card`), surfaces crème (`--surface`).
- Remplacer le contenu de démonstration des mémos (tableau `MEMOS` dans `app.js`) par les textes réels ; intégrer les illustrations en base64 (champ `img` de chaque section `figure`).
- Le diagramme de Harris utilise un routage de liens heuristique (gouttière + ponts en arc). Pour des stratigraphies très denses, un vrai algorithme de routage orthogonal serait nécessaire.

## Style de réponse souhaité
Rigueur, prose argumentée, pas d'approximation. Signaler explicitement les limites et les compromis.
