# OFM — Générateur de Dashboard Inflow OnlyFans

Site web qui génère des **tableaux de bord Inflow personnalisables** pour OnlyFans (style Infloww). Toutes les données sont fictives et entièrement personnalisables.

## Fonctionnalités

- **Layout type Infloww** : barre latérale, en-tête, onglets Aperçu / Performance créateur
- **Résumé des gains** : total + répartition (Abonnements, Publications, Messages, Pourboires, Parrainages, Streams)
- **Tendances des gains** : graphique en barres avec tooltip (gains, croissance)
- **Gains par canal** : diagramme circulaire + légende
- **Panneau « Personnaliser »** : modifier la période, le total, chaque source de revenus, et aléatoriser les tendances
- **Export PNG** : capture du dashboard pour sauvegarde ou partage

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Les fichiers de production sont dans `dist/`.

## Structure

- `src/App.jsx` — layout + état global
- `src/components/Sidebar.jsx` — menu type Infloww
- `src/components/Header.jsx` — barre supérieure
- `src/components/Dashboard.jsx` — cartes, graphiques (Recharts), export
- `src/components/Editor.jsx` — formulaire de personnalisation
- `src/data/defaults.js` — valeurs par défaut
- `src/utils/format.js` — formatage $ et %
- `src/utils/export.js` — export PNG via html2canvas

---

*Données 100 % fictives. Usage à des fins de démo ou de maquette uniquement.*
