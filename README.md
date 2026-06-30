# StratiBuddy

Application mobile de terrain pour l'archéologie, conçue pour les étudiants et les fouilleurs. Outil autonome, fonctionnant **hors ligne**, sans dépendance réseau ni serveur.

## Ce que fait l'application

Trois outils accessibles depuis un écran d'accueil :

- **MiniHarris** — construction et visualisation d'une matrice de Harris (jusqu'à 20 US). Saisie des relations stratigraphiques par blocs manipulables (`sur`, `sous`, `coupe`, `=`, `equ.`), génération du diagramme avec réduction transitive, détection de cycles, tracé orthogonal des liens (contournement par gouttière, ponts en arc aux croisements), glissement horizontal des blocs et alignement vertical de colonnes.
- **Calculs d'altis** — nivellement direct par rayonnement. Altitude du plan de visée, altitude de l'axe de coupe, et jusqu'à 20 points levés. Calculs développés à l'écran, export CSV.
- **Mémos de fouille** — fiches de méthode consultables sur le terrain (Terrain, Documentation, Dessins, Photographie). Contenu intégré au fichier, illustrations encodées.

## Structure du projet

```
stratibuddy/
├── index.html              Point d'entrée (structure HTML)
├── manifest.webmanifest    Manifeste PWA (installabilité)
├── sw.js                   Service worker (cache hors ligne)
├── src/
│   ├── styles.css           Système de design + tous les styles
│   └── app.js                Toute la logique (navigation, Harris, altimétrie, mémos)
├── assets/
│   ├── logo.svg              Logo complet (S + wordmark)
│   ├── monogram.svg          Monogramme S seul (utilisé dans l'en-tête)
│   ├── app-icon.svg          Icône d'application (source)
│   └── icons/                Icônes PNG rastérisées (192/512/apple-touch)
├── CLAUDE.md                Notes pour Claude Code
└── README.md
```

> Note : dans `index.html`, le monogramme est actuellement **intégré en SVG inline** dans l'en-tête (et non chargé depuis `assets/monogram.svg`), pour garantir le fonctionnement hors ligne sans requête de fichier. Les SVG d'`assets/` sont les sources de référence.

## Direction artistique — « Terrain sobre »

Identité StratiBuddy : compagnon de terrain sobre, carnet de fouille raffiné, chaleureux mais sérieux. Palette terre/minéral, typographie système robuste (proche Inter / Manrope, chargée sans dépendance réseau), cartes arrondies, ombres douces.

Tokens de couleur (voir `:root` dans `styles.css`) :

| Token | Hex | Usage |
|---|---|---|
| `--terracotta` | `#B85C38` | action principale |
| `--slate` | `#2F3A40` | texte principal |
| `--sand` | `#EDE3D1` | sable clair |
| `--ochre` | `#C89A4B` | accent secondaire |
| `--sage` | `#7B8B62` | vert sauge |
| `--petrol` | `#2E7C83` | bleu pétrole |
| `--background` | `#F7F1E6` | fond |
| `--surface` | `#FFF8EC` | surface carte |

## Lancer en local

Ouvrir `index.html` dans un navigateur. Comme l'application charge `src/styles.css` et `src/app.js` en fichiers séparés, certains navigateurs bloquent ces chargements depuis `file://` ; lancer un petit serveur local lève la contrainte :

```bash
# Python (présent partout)
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Installer sur téléphone (hors ligne)

Ouvrir l'URL dans le navigateur mobile, puis « Ajouter à l'écran d'accueil ».

## État et chantiers en cours

- L'écran d'accueil et l'identité sont en place.
- L'habillage DA des composants **internes** aux volets (boutons, champs, titres, blocs du diagramme, cartes de mémos) reste à harmoniser avec la charte (rayons, ombres, surfaces crème).
- Les mémos contiennent un **contenu de démonstration** à remplacer par les textes réels ; les emplacements d'illustration attendent les croquis/planches encodés en base64.
- Aucune persistance entre sessions (choix assumé) ; export CSV pour conserver les relevés.
