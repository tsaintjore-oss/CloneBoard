# Solution Simple - Pas besoin de Supabase !

## 🎯 Solution : Déployer le backend séparément sur Railway

**Avantage** : Tu gardes SQLite, pas besoin de configurer Supabase, tout fonctionne comme en local !

---

## Étape 1 : Créer un compte Railway (2 minutes)

1. Va sur **https://railway.app**
2. Clique sur **"Login"** → Connecte-toi avec **GitHub**
3. C'est tout ! Railway est gratuit pour commencer

---

## Étape 2 : Déployer le backend (5 minutes)

1. Dans Railway, clique sur **"New Project"**
2. Clique sur **"Deploy from GitHub repo"**
3. Sélectionne ton repo **saas-ofm**
4. Railway détecte automatiquement que c'est un projet Node.js
5. **IMPORTANT** : Dans les settings du service, change :
   - **Root Directory** : `backend`
   - **Start Command** : `node server.js`
   - **Port** : `3001`

---

## Étape 3 : Configurer les variables d'environnement sur Railway

Dans Railway → Ton service → **Variables**, ajoute :

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
JWT_SECRET=ta_cle_secrete_aleatoire
BASE_URL=https://ton-site.vercel.app
FRONTEND_URL=https://ton-site.vercel.app
NODE_ENV=production
```

---

## Étape 4 : Récupérer l'URL du backend

1. Dans Railway, clique sur ton service
2. Va dans **"Settings"** → **"Networking"**
3. Clique sur **"Generate Domain"**
4. Tu obtiens une URL comme : `https://ton-backend.up.railway.app`
5. **Copie cette URL**

---

## Étape 5 : Configurer Vercel pour utiliser le backend Railway

Dans Vercel → Ton projet → **Settings** → **Environment Variables**, ajoute :

```
VITE_API_URL=https://ton-backend.up.railway.app
```

Et dans le code frontend, toutes les requêtes `/api/*` doivent pointer vers cette URL.

---

## ✅ Avantages de cette solution

- ✅ Pas besoin de Supabase
- ✅ SQLite fonctionne sur Railway
- ✅ Tout fonctionne comme en local
- ✅ Gratuit pour commencer
- ✅ Beaucoup plus simple !

---

## Alternative encore plus simple : Render

Si Railway ne te convient pas, tu peux utiliser **Render** :

1. Va sur **https://render.com**
2. Connecte-toi avec GitHub
3. **New** → **Web Service**
4. Connecte ton repo
5. Settings :
   - **Build Command** : `cd backend && npm install`
   - **Start Command** : `cd backend && node server.js`
   - **Environment** : Node
6. Ajoute les mêmes variables d'environnement

---

**C'est beaucoup plus simple que Supabase !** 🎉
