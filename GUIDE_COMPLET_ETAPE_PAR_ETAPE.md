# 🚀 Guide Complet - Étape par Étape (Pour Débutants)

## 📖 Explication Simple

Ton site a **2 parties** :
1. **Le Frontend** = Ce que les visiteurs voient (pages web)
2. **Le Backend** = Le serveur qui gère les connexions, paiements, etc.

On va déployer les 2 parties séparément :
- **Frontend** → Sur Vercel (gratuit)
- **Backend** → Sur Railway (gratuit)

---

## PARTIE 1 : Déployer le Backend sur Railway

### Étape 1.1 : Créer un compte Railway

1. Ouvre ton navigateur (Chrome, Edge, Firefox)
2. Va sur : **https://railway.app**
3. Tu vois une page avec un bouton **"Login"** ou **"Get Started"**
4. Clique dessus
5. Choisis **"Login with GitHub"** (c'est le plus simple)
6. Autorise Railway à accéder à ton compte GitHub
7. **C'est fait !** Tu es maintenant sur Railway

---

### Étape 1.2 : Créer un nouveau projet

1. Sur Railway, tu vois un bouton **"New Project"** (en haut à droite)
2. Clique dessus
3. Tu vois plusieurs options, clique sur **"Deploy from GitHub repo"**
4. Railway va te montrer la liste de tes projets GitHub
5. **Trouve et clique sur ton projet** (probablement "saas-ofm" ou "CloneBoard")
6. Railway commence à déployer automatiquement

---

### Étape 1.3 : Configurer le Backend

**IMPORTANT** : Par défaut, Railway essaie de déployer tout le projet. On doit lui dire de déployer seulement le dossier `backend`.

1. Sur Railway, tu vois ton projet qui se déploie
2. Clique sur le **service** (la boîte qui apparaît)
3. En haut, tu vois des onglets : **"Deployments"**, **"Settings"**, **"Variables"**, etc.
4. Clique sur **"Settings"**
5. Tu vois plusieurs champs à remplir :

   **Root Directory** :
   - Clique dans le champ
   - Tape : `backend`
   - (Cela dit à Railway de chercher dans le dossier backend)

   **Start Command** :
   - Clique dans le champ
   - Tape : `node server.js`
   - (Cela dit à Railway comment démarrer le serveur)

6. Clique sur **"Save"** ou **"Update"** en bas

---

### Étape 1.4 : Obtenir l'URL du Backend

1. Toujours dans Railway, clique sur l'onglet **"Networking"** (ou **"Settings"** → **"Networking"**)
2. Tu vois une section **"Public Networking"**
3. Clique sur le bouton **"Generate Domain"** ou **"Add Domain"**
4. Railway génère automatiquement une URL comme : `https://ton-projet.up.railway.app`
5. **COPIE CETTE URL** (clic droit → Copier, ou sélectionne et Ctrl+C)
6. **GARDE-LA QUELQUE PART** (dans un fichier texte, Notepad, etc.)

**Exemple d'URL** : `https://saas-ofm-production.up.railway.app`

---

### Étape 1.5 : Ajouter les Variables d'Environnement

Les variables d'environnement sont des "secrets" que le backend doit connaître pour fonctionner.

1. Dans Railway, clique sur l'onglet **"Variables"**
2. Tu vois un bouton **"New Variable"** ou **"Add Variable"**
3. Clique dessus
4. Tu dois ajouter ces variables **UNE PAR UNE** :

   **Variable 1** :
   - **Name** : `STRIPE_SECRET_KEY`
   - **Value** : Ta clé Stripe (commence par `sk_test_` ou `sk_live_`)
   - Clique **"Add"**

   **Variable 2** :
   - **Name** : `STRIPE_PRICE_MONTHLY`
   - **Value** : L'ID du prix mensuel (commence par `price_`)
   - Clique **"Add"**

   **Variable 3** :
   - **Name** : `STRIPE_PRICE_YEARLY`
   - **Value** : L'ID du prix annuel (commence par `price_`)
   - Clique **"Add"**

   **Variable 4** :
   - **Name** : `JWT_SECRET`
   - **Value** : Une chaîne aléatoire (ex: `ma_cle_secrete_123456`)
   - Clique **"Add"**

   **Variable 5** :
   - **Name** : `BASE_URL`
   - **Value** : L'URL de ton site Vercel (on la mettra après, pour l'instant mets : `http://localhost:5173`)
   - Clique **"Add"**

   **Variable 6** :
   - **Name** : `FRONTEND_URL`
   - **Value** : La même que BASE_URL (`http://localhost:5173` pour l'instant)
   - Clique **"Add"**

   **Variable 7** :
   - **Name** : `NODE_ENV`
   - **Value** : `production`
   - Clique **"Add"**

   **Variable 8** :
   - **Name** : `PORT`
   - **Value** : `3001`
   - Clique **"Add"**

5. **IMPORTANT** : Ne mets **PAS** de variable `DATABASE_URL` → Le code utilisera SQLite automatiquement !

---

### Étape 1.6 : Vérifier que le Backend fonctionne

1. Dans Railway, clique sur l'onglet **"Deployments"**
2. Tu vois l'historique des déploiements
3. Le dernier déploiement doit être **vert** avec un ✅
4. Si c'est **rouge** ❌, clique dessus pour voir l'erreur
5. Si tout est vert, ton backend fonctionne !

**Test rapide** :
- Ouvre un nouvel onglet dans ton navigateur
- Va sur l'URL que tu as copiée (ex: `https://ton-projet.up.railway.app`)
- Tu devrais voir une erreur "Cannot GET /" → **C'est normal !** Ça veut dire que le serveur fonctionne.

---

## PARTIE 2 : Déployer le Frontend sur Vercel

### Étape 2.1 : Créer un compte Vercel

1. Ouvre un nouvel onglet dans ton navigateur
2. Va sur : **https://vercel.com**
3. Clique sur **"Sign Up"** ou **"Login"**
4. Choisis **"Continue with GitHub"**
5. Autorise Vercel à accéder à ton compte GitHub
6. **C'est fait !** Tu es maintenant sur Vercel

---

### Étape 2.2 : Créer un nouveau projet

1. Sur Vercel, tu vois un bouton **"Add New..."** (en haut à droite)
2. Clique dessus
3. Choisis **"Project"**
4. Vercel te montre la liste de tes projets GitHub
5. **Trouve et clique sur ton projet** (le même que Railway)
6. Vercel détecte automatiquement que c'est un projet Vite/React

---

### Étape 2.3 : Configurer le Frontend

Avant de cliquer sur "Deploy", configure ces paramètres :

1. **Framework Preset** :
   - Laisse **"Vite"** ou **"Other"** (Vercel l'a détecté automatiquement)

2. **Root Directory** :
   - Laisse **"."** (point) → Cela signifie "racine du projet"

3. **Build Command** :
   - Clique dans le champ
   - Tape : `npm run build`
   - (Cela dit à Vercel de construire le site)

4. **Output Directory** :
   - Clique dans le champ
   - Tape : `dist`
   - (Cela dit à Vercel où trouver les fichiers finaux)

5. **Install Command** :
   - Laisse **`npm install`** (par défaut)

---

### Étape 2.4 : Ajouter les Variables d'Environnement sur Vercel

**AVANT** de cliquer sur "Deploy", ajoute les variables :

1. Clique sur **"Environment Variables"** (en bas de la page)
2. Clique sur **"Add"** ou **"New"**

   **Variable 1** :
   - **Name** : `VITE_API_URL`
   - **Value** : L'URL de ton backend Railway (celle que tu as copiée à l'étape 1.4)
   - Exemple : `https://ton-projet.up.railway.app`
   - Clique **"Add"**

3. **C'est tout pour l'instant !** On ajoutera les autres après.

---

### Étape 2.5 : Déployer

1. Clique sur le gros bouton **"Deploy"** (en bas)
2. Vercel commence à construire et déployer ton site
3. Tu vois une barre de progression
4. Attends 2-3 minutes
5. Quand c'est terminé, tu vois **"Congratulations!"**
6. Vercel te donne une URL comme : `https://ton-projet.vercel.app`
7. **COPIE CETTE URL** aussi !

---

### Étape 2.6 : Mettre à jour les Variables

Maintenant qu'on a l'URL Vercel, on doit mettre à jour les variables :

**Sur Railway** :
1. Retourne sur Railway
2. Va dans **"Variables"**
3. Trouve `BASE_URL` et `FRONTEND_URL`
4. Remplace `http://localhost:5173` par ton URL Vercel (ex: `https://ton-projet.vercel.app`)
5. Sauvegarde

**Sur Vercel** :
1. Retourne sur Vercel
2. Va dans ton projet → **"Settings"** → **"Environment Variables"**
3. Ajoute ces variables si nécessaire :

   - `VITE_API_URL` = URL de Railway (déjà fait)
   - Toutes les autres variables Stripe si nécessaire

---

## PARTIE 3 : Connecter le Frontend au Backend

**BONNE NOUVELLE** : Le fichier `vite.config.js` a déjà été modifié pour utiliser automatiquement l'URL Railway ! 

Tu n'as **RIEN à modifier** dans le code. Il suffit d'ajouter la variable `VITE_API_URL` sur Vercel (déjà fait à l'étape 2.4).

Le code détecte automatiquement :
- En développement → utilise `localhost:3001`
- En production → utilise l'URL Railway depuis `VITE_API_URL`

**C'est tout ! Pas besoin de modifier de code.** ✅

---

### Étape 3.2 : Configurer le Proxy API

**BONNE NOUVELLE** : Tout est déjà configuré automatiquement !

Le fichier `api/proxy.js` a été créé pour rediriger automatiquement les appels `/api/*` vers Railway.

Il faut juste ajouter l'URL Railway dans les variables d'environnement Vercel :

1. Sur Vercel, va dans ton projet → **"Settings"** → **"Environment Variables"**
2. Ajoute une nouvelle variable :
   - **Name** : `RAILWAY_URL`
   - **Value** : L'URL de ton backend Railway (ex: `https://ton-projet.up.railway.app`)
   - Clique **"Add"**
3. Vérifie aussi que `VITE_API_URL` est définie avec la même URL

**C'est tout !** Vercel redirigera automatiquement tous les appels `/api/*` vers Railway.

### Étape 3.3 : Redéployer (si nécessaire)

**Sur Vercel** :
1. Si tu as ajouté/modifié des variables, Vercel redéploie automatiquement
2. Sinon, va dans **"Deployments"** → Clique sur les **3 points** (⋯) → **"Redeploy"**

**Sur Railway** :
1. Si tu as modifié quelque chose dans le backend, Railway redéploie automatiquement
2. Sinon, pas besoin de faire quoi que ce soit

---

## PARTIE 4 : Tester que tout fonctionne

### Test 1 : Vérifier le Frontend

1. Ouvre ton navigateur
2. Va sur ton URL Vercel (ex: `https://ton-projet.vercel.app`)
3. Tu devrais voir la page `sales.html` (page publique)
4. ✅ Si ça marche, le frontend fonctionne !

### Test 2 : Vérifier le Backend

1. Dans ton navigateur, va sur : `https://ton-projet.up.railway.app/api/payment/check-access?email=test@test.com`
2. Tu devrais voir du JSON avec `{"hasAccess":false,...}`
3. ✅ Si ça marche, le backend fonctionne !

### Test 3 : Tester la connexion complète

1. Sur ton site Vercel, essaie de te connecter ou créer un compte
2. Si ça fonctionne, ✅ tout est connecté !

---

## 🐛 Problèmes Courants

### Le backend ne démarre pas sur Railway

**Erreur** : "Cannot find module" ou "Error starting"
**Solution** :
1. Vérifie que `Root Directory` = `backend`
2. Vérifie que `Start Command` = `node server.js`
3. Vérifie les logs dans Railway → "Deployments" → Clique sur le déploiement → Voir les logs

### Le frontend ne trouve pas le backend

**Erreur** : "Failed to fetch" ou "Network error"
**Solution** :
1. Vérifie que `VITE_API_URL` sur Vercel = URL de Railway
2. Vérifie que le proxy dans `vite.config.js` pointe vers Railway
3. Vérifie que Railway est bien démarré (vert ✅)

### Erreur CORS

**Erreur** : "CORS policy" dans la console
**Solution** :
1. Sur Railway, dans les variables, vérifie que `FRONTEND_URL` = URL de Vercel
2. Redéploie Railway après avoir changé la variable

---

## ✅ Checklist Finale

- [ ] Backend déployé sur Railway
- [ ] URL Railway copiée
- [ ] Variables d'environnement ajoutées sur Railway
- [ ] Backend fonctionne (test avec l'URL)
- [ ] Frontend déployé sur Vercel
- [ ] URL Vercel copiée
- [ ] Variable `VITE_API_URL` ajoutée sur Vercel
- [ ] `vite.config.js` modifié avec l'URL Railway
- [ ] Frontend redéployé sur Vercel
- [ ] Variables `BASE_URL` et `FRONTEND_URL` mises à jour sur Railway
- [ ] Tests effectués et tout fonctionne !

---

## 🎉 Félicitations !

Ton site est maintenant en ligne ! 🚀

- **Frontend** : Accessible sur Vercel
- **Backend** : Fonctionne sur Railway
- **Base de données** : SQLite (automatique, pas besoin de configurer)

---

## 📞 Besoin d'aide ?

Si tu es bloqué à une étape :
1. Note exactement où tu es
2. Note le message d'erreur (s'il y en a un)
3. Dis-moi et je t'aiderai !
