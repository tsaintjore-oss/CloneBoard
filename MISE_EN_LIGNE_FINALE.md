# Mise en ligne – Guide unique (Render + Vercel)

Tout est prêt côté code. Suis ces étapes **dans l’ordre**.

---

## ⚠️ SI LE BUILD RENDER ÉCHOUE

### Erreur « failed to read dockerfile: open Dockerfile: no such file or directory »

Render est en mode **Docker** mais ne trouve pas le Dockerfile. Deux options :

**Option A (recommandée) – pas de Docker :**
1. **Settings** du Web Service → **Runtime** : choisis **Node** (pas Docker).
2. **Root Directory** : `backend`
3. **Build Command** : `npm install`
4. **Start Command** : `node server.js`
5. Sauvegarde → **Manual Deploy**.

**Option B – garder Docker :**
- Le fichier **`backend/Dockerfile`** existe maintenant. Pousse le code sur GitHub (commit + push), puis sur Render garde **Root Directory** = `backend` et relance un déploiement. Render trouvera `backend/Dockerfile`.

---

### Erreur « Exited with status 1 » (crash au démarrage)

Le build réussit mais le service s’arrête tout de suite. **Regarde les logs Render** (onglet **Logs** du Web Service) : tu devrais voir des lignes `[Startup]` qui indiquent la cause.

**Cause la plus fréquente : `DATABASE_URL` manquante**

1. Sur Render → ton **Web Service** → **Environment** (ou **Settings** → **Environment**).
2. Vérifie qu’il existe une variable **`DATABASE_URL`**.
3. Si elle n’existe pas : **Add Environment Variable** → Name = `DATABASE_URL`, Value = l’**Internal Database URL** de ta base PostgreSQL Render (copier depuis la page de la base, section **Connections**).
4. Si tu as créé la base dans le même compte Render : tu peux aussi **Connect** la base au service (lien « Add Database » ou « Link existing PostgreSQL ») ; Render ajoute alors `DATABASE_URL` automatiquement.
5. Sauvegarde puis **Manual Deploy** → **Deploy latest commit**.

**Autres causes possibles :**

- **Port** : ne pas définir `PORT` manuellement ; Render injecte `PORT` tout seul.
- **Connexion refusée à la base** : vérifier que la base est dans la même région et que tu utilises l’**Internal** Database URL (pas External) si les deux services sont sur Render.

---

### « Y’a encore un problème mais je sais pas quoi » – Diagnostic

1. **Ouvre l’URL du backend** (ex. `https://saas-ofm-backend.onrender.com`) dans le navigateur. Tu dois voir une réponse (même une erreur 404 ou « Cannot GET / » = le service tourne).
2. **Ouvre la page de diagnostic** :  
   `https://ton-backend.onrender.com/api/health`  
   (remplace par ton URL Render). Tu dois voir un JSON du type :
   - `ok: true`
   - `env.hasDatabase` / `env.databaseConnected` : si `false`, la base n’est pas configurée ou pas joignable.
   - `env.hasStripeKey` / `env.hasStripePrices` : si `false`, c’est normal si tu n’as pas encore configuré Stripe (tu pourras le faire plus tard).
   - `env.hasJwtSecret` : si `false`, la connexion (login) peut poser problème.
3. **Logs Render** : onglet **Logs** du Web Service. Regarde les lignes `[Startup]` et les erreurs en rouge. Copie le message d’erreur exact si tu demandes de l’aide.
4. **Checklist rapide** :
   - Backend déployé et **Logs** affichent « Backend running on port … » ?
   - `/api/health` renvoie `databaseConnected: true` ?
   - Sur Vercel : variable **VITE_API_URL** (ou **BACKEND_URL** selon ton code) = URL du backend Render (avec `https://`) ?
   - Le site public (sales.html) s’ouvre sur l’URL Vercel ?

Si tu peux, envoie le **message d’erreur exact** des logs Render ou la réponse de `/api/health` pour cibler le problème.

---

### Autre cause fréquente : build depuis la racine au lieu de `backend`

À faire sur Render (Web Service) :
1. Va dans **Settings** du service.
2. **Root Directory** : mets exactement **`backend`** (sans slash, sans espace).
3. **Build Command** : mets exactement **`npm install`**.
4. **Start Command** : mets exactement **`node server.js`**.
5. Sauvegarde puis **Manual Deploy** → **Deploy latest commit**.

Sans **Root Directory = backend**, le build part de la racine et échoue (npm ci / lock file).

---

## Étape 0 : Pousser le code sur GitHub

1. Ouvre **GitHub Desktop** (ou fais un push en ligne de commande).
2. Ajoute tous les fichiers (dont `backend/package.json`, `backend/Dockerfile`, `render.yaml`, `nixpacks.toml`, `Dockerfile`).
3. Commit : "Prêt pour Render + Vercel".
4. **Push** vers GitHub.

Sans ça, Render et Vercel ne verront pas ton projet.

---

## PARTIE 1 : Render (base de données + backend)

### 1.1 Compte Render

1. Va sur **https://render.com**
2. **Get Started** → connecte-toi avec **GitHub**.

### 1.2 Base de données PostgreSQL

1. Dans le dashboard Render : **New +** → **PostgreSQL**.
2. **Name** : `saas-ofm-db`
3. **Region** : choisis la plus proche (ex. Frankfurt).
4. **Plan** : **Free**.
5. **Create Database**.
6. Attends 1–2 minutes.
7. Dans la page de la base, section **Connections**, copie **Internal Database URL** (commence par `postgresql://`).  
   Garde cette URL sous la main (tu en auras besoin pour le backend).

### 1.3 Créer les tables dans PostgreSQL

1. Toujours sur la page de la base Render : onglet **Info** ou **Connect**.
2. Tu peux utiliser **PSQL Command** ou **External Database URL** avec un outil (ex. DBeaver, pgAdmin), ou le **Shell** Render.
3. Ouvre le fichier **`supabase-schema.sql`** à la racine de ton projet.
4. Copie **tout** le contenu.
5. Dans Render : **Shell** (onglet de la base ou du service) ou ton client SQL :
   - Colle le SQL et exécute-le.
   - Tu dois voir les tables `users` et `payments` créées (pas d’erreur).

### 1.4 Service Web (backend)

1. Dans Render : **New +** → **Web Service**.
2. **Connect a repository** : choisis ton repo GitHub (CloneBoard / saas-ofm).
3. Si tu ne vois pas le repo : **Configure account** et autorise l’accès au bon compte/repo.
4. Une fois le repo choisi :
   - **Name** : `saas-ofm-backend`
   - **Region** : même que la base (ex. Frankfurt).
   - **Root Directory** : `backend`
   - **Runtime** : **Node**.
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`
   - **Plan** : **Free**.
5. **Advanced** → **Add Environment Variable**. Ajoute **au minimum** ces variables (Stripe peut attendre) :

| Name           | Value |
|----------------|--------|
| `NODE_ENV`     | `production` |
| `DATABASE_URL` | Colle l’**Internal Database URL** copiée à l’étape 1.2 |
| `JWT_SECRET`   | Une chaîne aléatoire (ex. `ma-cle-secrete-123`) |
| `FRONTEND_URL` | Pour l’instant `https://placeholder.vercel.app` (tu mettras l’URL Vercel après) |
| `BASE_URL`     | Idem : `https://placeholder.vercel.app` |

**Stripe (optionnel, pour plus tard)** : quand tu voudras activer les paiements, ajoute `STRIPE_SECRET_KEY`, `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_YEARLY` (et éventuellement `STRIPE_WEBHOOK_SECRET` pour les webhooks). Sans Stripe, le backend tourne normalement ; seul le bouton d’abonnement ne fonctionnera pas.

6. **Create Web Service**.
7. Attends le premier déploiement (build + start). Si tout est vert, le backend tourne.
8. En haut de la page du service, tu vois l’URL du type : **https://saas-ofm-backend.onrender.com**.  
   **Copie cette URL** (c’est l’URL du backend).

---

## PARTIE 2 : Vercel (frontend)

### 2.1 Compte Vercel

1. Va sur **https://vercel.com**
2. **Sign Up** → **Continue with GitHub**.

### 2.2 Projet frontend

1. **Add New…** → **Project**.
2. Importe le **même** repo GitHub (CloneBoard / saas-ofm).
3. Paramètres du projet :
   - **Framework Preset** : Vite (ou détecté automatiquement).
   - **Root Directory** : `.` (racine).
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
4. **Environment Variables** → ajoute :

| Name           | Value |
|----------------|--------|
| `VITE_API_URL` | L’URL du backend Render (ex. `https://saas-ofm-backend.onrender.com`) **sans** slash à la fin |
| `BACKEND_URL`  | La même URL (pour le proxy Vercel) |

5. **Deploy**.
6. Quand le déploiement est terminé, Vercel affiche l’URL du site (ex. **https://ton-projet.vercel.app**).  
   **Copie cette URL**.

---

## PARTIE 3 : Relier frontend et backend

### 3.1 Mettre l’URL Vercel dans Render

1. Retourne sur **Render** → ton service **saas-ofm-backend**.
2. **Environment** (onglet ou lien).
3. Modifie :
   - **FRONTEND_URL** : colle l’URL Vercel (ex. `https://ton-projet.vercel.app`).
   - **BASE_URL** : même valeur.
4. Sauvegarde. Render redéploie tout seul.

### 3.2 Vérifier le proxy Vercel

Sur Vercel, les appels `/api/...` sont envoyés au backend Render via le fichier `api/proxy.js`.  
Les variables **VITE_API_URL** et **BACKEND_URL** doivent bien être l’URL Render (sans slash final).  
Si tu les as ajoutées avant le premier deploy, c’est bon. Sinon : **Settings** → **Environment Variables** → ajoute ou corrige, puis **Redeploy**.

---

## PARTIE 4 : Vérifications

1. **Frontend**  
   Ouvre l’URL Vercel : tu dois voir la page de vente (sales).

2. **Backend**  
   Ouvre : `https://TON-BACKEND-URL.onrender.com/api/payment/check-access?email=test@test.com`  
   (remplace par ton URL Render). Tu dois voir du JSON avec `hasAccess: false` (ou similaire).

3. **Connexion complète**  
   Sur le site Vercel : essaie **Sign up** ou **Log in**.  
   Si ça charge sans erreur réseau, le front parle bien au backend.

---

## En cas de problème

- **Render : Build failed**  
  Vérifie que **Root Directory** = `backend` et **Start Command** = `node server.js`.  
  Vérifie que **DATABASE_URL** est bien l’Internal Database URL de ta base Render.

- **Render : Application failed to start**  
  Regarde les **Logs** du service. Souvent : **DATABASE_URL** manquante ou mauvaise, ou tables pas créées → refais l’étape 1.3.

- **Vercel : page blanche ou 404**  
  Vérifie **Output Directory** = `dist` et **Build Command** = `npm run build`.

- **Site Vercel : "Failed to fetch" ou erreur réseau sur login/signup**  
  Vérifie **VITE_API_URL** et **BACKEND_URL** sur Vercel = URL Render (sans slash).  
  Puis **Redeploy** du projet Vercel.

---

## Récap

1. **GitHub** : tout le code poussé (dont `backend/package.json`, `render.yaml`, `supabase-schema.sql`).
2. **Render** : PostgreSQL créé → exécuter `supabase-schema.sql` → Web Service avec **Root Directory** = `backend`, **Build** = `npm install`, **Start** = `node server.js`, et toutes les variables (surtout **DATABASE_URL**).
3. **Vercel** : projet depuis le même repo, build Vite, **VITE_API_URL** et **BACKEND_URL** = URL Render.
4. **Lien** : **FRONTEND_URL** et **BASE_URL** sur Render = URL Vercel.

Une fois ces étapes faites, le site est en ligne et complet (front + back + base de données).
