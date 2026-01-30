# Mettre le site en ligne – étapes

## Architecture du projet

Ce projet contient :
- **`sales.html`** : Page publique de vente (doit être la page d'accueil)
- **`index.html`** : Dashboard privé (accessible uniquement aux abonnés)
- **`access.html`** : Page d'accès qui vérifie l'abonnement et affiche le dashboard
- **Backend** : API Express avec authentification et gestion des abonnements Stripe

## 1. Installer Git (une seule fois)

- Va sur : **https://git-scm.com/download/win**
- Télécharge « Windows » et installe (garde les options par défaut).
- À la fin, ferme puis rouvre Cursor (ou ton terminal).

---

## 2. Préparer le projet (sur ton PC)

**Option simple : double-clique sur `preparer-deploy.bat`**

- Ce script fait : `git init`, `git add .`, `git commit`.
- Si Git n'est pas installé, le script t'indiquera quoi faire.

**Option manuelle (dans un terminal) :**

```bash
cd "c:\Users\ordi2137649\Desktop\saas ofm"
git init
git add .
git commit -m "Première version"
```

---

## 3. Créer le dépôt sur GitHub

1. Va sur **https://github.com** et connecte-toi (ou crée un compte).
2. Clique sur **« + »** → **« New repository »**.
3. **Repository name** : par ex. `saas-ofm`.
4. Ne coche **pas** « Add a README ».
5. Clique **« Create repository »**.

---

## 4. Envoyer ton code sur GitHub

Dans un terminal (dans le dossier du projet), exécute ces commandes **en remplaçant** `TON_COMPTE` par ton pseudo GitHub et `saas-ofm` par le nom du repo si différent :

```bash
git remote add origin https://github.com/TON_COMPTE/saas-ofm.git
git branch -M main
git push -u origin main
```

On te demandera peut-être de te connecter à GitHub (navigateur ou token).

---

## 5. Configurer Supabase (Base de données PostgreSQL)

**⚠️ IMPORTANT** : Le backend utilise maintenant PostgreSQL au lieu de SQLite pour fonctionner sur Vercel.

### 5.1. Créer un compte Supabase

1. Va sur **https://supabase.com** et crée un compte (gratuit)
2. Crée un nouveau projet
3. Note le mot de passe de la base de données

### 5.2. Créer les tables

1. Dans Supabase, va dans **"SQL Editor"**
2. Ouvre le fichier `supabase-schema.sql` de ce projet
3. Copie tout le contenu et colle-le dans l'éditeur SQL
4. Clique sur **"Run"**

### 5.3. Récupérer l'URL de connexion

1. Dans Supabase → **"Settings"** → **"Database"**
2. Copie l'**"Connection string"** (format URI)
3. Remplace `[PASSWORD]` par ton mot de passe

**Guide détaillé** : Voir `MIGRATION_SUPABASE.md` pour les instructions complètes.

---

## 6. Configurer les variables d'environnement

Avant de déployer, tu dois configurer les variables d'environnement sur Vercel :

### Variables requises :

1. **DATABASE_URL** : L'URL de connexion Supabase (étape 5.3)
2. **STRIPE_SECRET_KEY** : Ta clé secrète Stripe (commence par `sk_`)
3. **STRIPE_PRICE_MONTHLY** : L'ID du prix mensuel Stripe (commence par `price_`)
4. **STRIPE_PRICE_YEARLY** : L'ID du prix annuel Stripe (commence par `price_`)
5. **JWT_SECRET** : Une chaîne secrète aléatoire (ex: génère avec `openssl rand -hex 32`)
6. **BASE_URL** : L'URL de ton site Vercel (ex: `https://ton-site.vercel.app`)
7. **FRONTEND_URL** : La même URL que BASE_URL
8. **NODE_ENV** : `production`

**Note** : Pour créer les prix Stripe, utilise le script `npm run setup-stripe` ou crée-les manuellement dans le dashboard Stripe.

---

## 7. Déployer sur Vercel (site en ligne)

### 6.1. Déployer le frontend (site statique)

1. Va sur **https://vercel.com** et connecte-toi (avec GitHub si tu veux).
2. Clique **« Add New… »** → **« Project »**.
3. Choisis ton repo **saas-ofm** dans la liste.
4. **Framework Preset** : laisse **Other** ou **Vite**.
5. **Root Directory** : `.` (par défaut).
6. **Build Command** : `npm run build`
7. **Output Directory** : `dist`
8. **Install Command** : `npm install`

### 7.2. Configurer les routes

Le fichier `vercel.json` est déjà configuré pour :
- **`/`** → Redirige vers `/sales.html` (page publique)
- **`/index.html`** → Dashboard protégé (vérifie l'authentification côté client)
- **`/access.html`** → Page d'accès qui vérifie l'abonnement
- **`/api/*`** → Routes API du backend

### 6.3. Déployer le backend (Serverless Functions)

Le backend doit être déployé comme Serverless Functions sur Vercel. Deux options :

#### Option A : Déploiement automatique (recommandé)

Vercel détectera automatiquement les fichiers dans `api/` ou `backend/` et les déploiera comme Serverless Functions. Assure-toi que :
- Les routes API sont accessibles via `/api/*`
- Les variables d'environnement sont configurées dans Vercel

#### Option B : Déploiement séparé du backend

Si tu préfères déployer le backend séparément :

1. Crée un nouveau projet Vercel pour le backend
2. Configure les variables d'environnement
3. Déploie le backend sur un sous-domaine ou une URL différente
4. Met à jour `FRONTEND_URL` et `BASE_URL` dans les deux projets

### 7.4. Configuration finale

1. Clique **« Deploy »**.
2. Une fois déployé, va dans **Settings** → **Environment Variables** et ajoute toutes les variables d'environnement listées dans la section 5.
3. Redéploie le projet pour que les variables soient prises en compte.

---

## 8. Comment ça fonctionne

### Page publique (`sales.html`)
- Accessible à tous sur `/` ou `/sales.html`
- Permet de voir les offres et de s'abonner
- Gère l'authentification (login/signup)

### Page d'accès (`access.html`)
- Vérifie si l'utilisateur a un abonnement actif
- Si oui : affiche le dashboard dans un iframe
- Si non : redirige vers la page de vente

### Dashboard (`index.html`)
- Protégé par le script `protect-dashboard.js`
- Vérifie automatiquement l'authentification au chargement
- Redirige vers `/access.html` si pas d'accès
- Accessible uniquement aux utilisateurs avec un abonnement actif

### Backend API
- `/api/auth/*` : Authentification (login, signup)
- `/api/payment/*` : Gestion des paiements Stripe
- `/api/payment/check-access` : Vérifie si un utilisateur a un abonnement actif
- `/api/webhook` : Webhook Stripe pour les événements de paiement

---

## 8. Modifier le site et le mettre à jour

1. Modifie tes fichiers dans Cursor.
2. Dans un terminal :

```bash
git add .
git commit -m "Description des changements"
git push
```

3. Vercel redéploiera tout seul ; rafraîchis l'URL du site pour voir les changements.

---

## 10. Vérifier que tout fonctionne

Après le déploiement, vérifie :

1. ✅ La page d'accueil (`/`) affiche `sales.html` (page publique)
2. ✅ Le dashboard (`/index.html`) redirige vers `/access.html` si pas d'abonnement
3. ✅ La page `/access.html` vérifie l'abonnement et affiche le dashboard si valide
4. ✅ Les paiements Stripe fonctionnent correctement
5. ✅ Les webhooks Stripe sont configurés dans le dashboard Stripe

---

## 10. Configuration des webhooks Stripe

Pour que les abonnements soient automatiquement activés après paiement :

1. Va dans le **Dashboard Stripe** → **Developers** → **Webhooks**
2. Clique **« Add endpoint »**
3. URL : `https://ton-site.vercel.app/api/webhook`
4. Événements à écouter :
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copie le **Signing secret** et ajoute-le comme variable d'environnement `STRIPE_WEBHOOK_SECRET` sur Vercel

---

**Résumé :**  
Installer Git → lancer `preparer-deploy.bat` → créer le repo GitHub → `git remote` + `git push` → créer un projet Supabase et exécuter `supabase-schema.sql` → connecter le repo à Vercel → configurer toutes les variables d'environnement (DATABASE_URL, Stripe, etc.) → Deploy → configurer les webhooks Stripe.

**Important :** 
- Le dashboard est maintenant protégé et accessible uniquement aux utilisateurs avec un abonnement actif
- La page publique `sales.html` est accessible à tous
- La base de données utilise PostgreSQL (Supabase) au lieu de SQLite pour fonctionner sur Vercel
- Voir `MIGRATION_SUPABASE.md` pour les détails sur la migration de la base de données
