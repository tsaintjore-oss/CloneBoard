# OFM Backend

API Express pour le dashboard OFM. **Une seule valeur éditée** : le total earnings par période. Tout le reste est dérivé de façon déterministe.

## Source de vérité

- `totalEarnings7d`, `totalEarnings30d`, `totalEarnings90d` (stockés dans `data.json`)
- Toutes les autres données (overview, graphiques, transactions) sont **calculées** à partir de ces totaux.

## Règles

- **Sub-values** (subscriptions, tips, messages, etc.) : pourcentages fixes appliqués au total → somme = total.
- **Earnings over time** : N jours (7, 30 ou 90), somme des montants journaliers = total. Génération déterministe (pas de random).
- **Période** : `?period=7` | `?period=30` | `?period=90`. Défaut : 30.

## Structure

```
backend/
├── server.js
├── data.json           # totalEarnings7d, totalEarnings30d, totalEarnings90d
├── dataStore.js        # loadTotals / saveTotals
├── services/
│   └── derivedData.js  # getOverview, getEarningsOverTime, getSubscriberGrowth, getTransactions
├── routes/
│   ├── dashboard.js
│   └── admin.js
└── controllers/
    ├── dashboardController.js
    └── adminController.js
```

## Lancement

```bash
npm run server   # API sur http://localhost:3001
```

## Endpoints

### Dashboard (tous acceptent `?period=7|30|90`)

- `GET /api/dashboard/overview?period=30` — overview dérivé (totalEarnings, subscriptions, …)
- `GET /api/dashboard/earnings?period=30` — earnings over time (N jours, somme = total)
- `GET /api/dashboard/growth?period=30` — subscriber growth (déterministe)
- `GET /api/dashboard/transactions?period=30` — transactions (déterministes)

### Admin (uniquement les totaux)

- `GET /api/admin/data` — `{ totalEarnings7d, totalEarnings30d, totalEarnings90d }`
- `PUT /api/admin/data` — body `{ totalEarnings7d?, totalEarnings30d?, totalEarnings90d? }` (mise à jour partielle)

## Cohérence

- Somme des valeurs par canal = total earnings.
- Somme des montants journaliers (earnings over time) = total earnings.
- Pas de régénération aléatoire : mêmes totaux + période → même sortie.
