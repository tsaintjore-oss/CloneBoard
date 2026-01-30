# 🚀 Déploiement Ultra-Simple (Sans Supabase !)

## ✅ Solution : Déployer le backend sur Railway (GRATUIT et SIMPLE)

**Avantage** : Tu gardes SQLite, pas besoin de configurer Supabase, tout fonctionne automatiquement !

---

## Étape 1 : Déployer le backend sur Railway (5 minutes)

1. Va sur **https://railway.app**
2. Clique sur **"Login"** → Connecte-toi avec **GitHub**
3. Clique sur **"New Project"**
4. Clique sur **"Deploy from GitHub repo"**
5. Sélectionne ton repo **saas-ofm**
6. Railway détecte automatiquement que c'est Node.js
7. **IMPORTANT** : Clique sur ton service → **Settings** → Change :
   - **Root Directory** : `backend`
   - **Start Command** : `node server.js`
8. Clique sur **"Generate Domain"** dans l'onglet **Networking**
9. **Copie l'URL** (ex: `https://ton-backend.up.railway.app`)

**C'est tout pour le backend !** 🎉

---

## Étape 2 : Configurer les variables sur Railway

Dans Railway → Ton service → **Variables**, ajoute :

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
JWT_SECRET=ta_cle_secrete_aleatoire
BASE_URL=https://ton-site.vercel.app
FRONTEND_URL=https://ton-site.vercel.app
NODE_ENV=production
PORT=3001
```

**Note** : Ne mets **PAS** `DATABASE_URL` → Le code utilisera SQLite automatiquement !

---

## Étape 3 : Déployer le frontend sur Vercel

1. Va sur **https://vercel.com**
2. Connecte-toi avec GitHub
3. **"Add New Project"** → Sélectionne ton repo
4. **Build Command** : `npm run build`
5. **Output Directory** : `dist`
6. Clique **"Deploy"**

---

## Étape 4 : Connecter le frontend au backend

Dans Vercel → Ton projet → **Settings** → **Environment Variables**, ajoute :

```
VITE_API_URL=https://ton-backend.up.railway.app
```

Puis modifie `vite.config.js` pour utiliser cette URL dans le proxy.

---

## ✅ C'est tout !

- ✅ Backend sur Railway avec SQLite (automatique)
- ✅ Frontend sur Vercel
- ✅ Pas besoin de Supabase
- ✅ Tout fonctionne !

---

## 🐛 Si ça ne marche pas

1. Vérifie que le backend tourne sur Railway (logs dans Railway)
2. Vérifie que l'URL du backend est correcte
3. Vérifie les variables d'environnement

**C'est beaucoup plus simple que Supabase !** 🎉
