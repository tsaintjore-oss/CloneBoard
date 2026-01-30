# Guide de migration vers Supabase (PostgreSQL)

Ce guide vous explique comment migrer votre base de données SQLite locale vers Supabase PostgreSQL pour le déploiement sur Vercel.

## Étape 1 : Créer un compte Supabase

1. Allez sur **https://supabase.com**
2. Cliquez sur **"Start your project"** ou **"Sign up"**
3. Connectez-vous avec GitHub (recommandé) ou créez un compte
4. Cliquez sur **"New Project"**

## Étape 2 : Créer un nouveau projet

1. **Name** : Donnez un nom à votre projet (ex: `saas-ofm`)
2. **Database Password** : Créez un mot de passe fort (notez-le quelque part)
3. **Region** : Choisissez la région la plus proche de vos utilisateurs
4. Cliquez sur **"Create new project"**
5. Attendez 2-3 minutes que le projet soit créé

## Étape 3 : Créer les tables dans Supabase

1. Dans votre projet Supabase, allez dans **"SQL Editor"** (menu de gauche)
2. Cliquez sur **"New query"**
3. Ouvrez le fichier `supabase-schema.sql` de ce projet
4. Copiez tout le contenu du fichier
5. Collez-le dans l'éditeur SQL de Supabase
6. Cliquez sur **"Run"** (ou appuyez sur `Ctrl+Enter`)
7. Vous devriez voir "Success. No rows returned"

## Étape 4 : Récupérer l'URL de connexion

1. Dans Supabase, allez dans **"Settings"** → **"Database"**
2. Faites défiler jusqu'à **"Connection string"**
3. Sélectionnez **"URI"** dans le menu déroulant
4. Copiez l'URL (elle ressemble à : `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
5. Remplacez `[PASSWORD]` par le mot de passe que vous avez créé à l'étape 2

## Étape 5 : Configurer les variables d'environnement

### Pour le développement local

Créez un fichier `.env` à la racine du projet (s'il n'existe pas déjà) :

```env
DATABASE_URL=postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.xxxxx.supabase.co:5432/postgres
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
JWT_SECRET=votre_secret_jwt_aleatoire
BASE_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

### Pour Vercel (production)

1. Allez sur **https://vercel.com**
2. Sélectionnez votre projet
3. Allez dans **"Settings"** → **"Environment Variables"**
4. Ajoutez les variables suivantes :

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | L'URL de connexion Supabase (étape 4) |
| `STRIPE_SECRET_KEY` | Votre clé secrète Stripe (commence par `sk_`) |
| `STRIPE_PRICE_MONTHLY` | L'ID du prix mensuel Stripe |
| `STRIPE_PRICE_YEARLY` | L'ID du prix annuel Stripe |
| `JWT_SECRET` | Une chaîne secrète aléatoire (ex: `openssl rand -hex 32`) |
| `BASE_URL` | L'URL de votre site Vercel (ex: `https://ton-site.vercel.app`) |
| `FRONTEND_URL` | La même URL que `BASE_URL` |
| `NODE_ENV` | `production` |

## Étape 6 : Installer les dépendances

Dans votre terminal, à la racine du projet :

```bash
npm install
```

Cela installera le package `pg` (PostgreSQL) nécessaire pour la connexion.

## Étape 7 : Tester la connexion (optionnel)

Pour tester que tout fonctionne localement :

```bash
npm run server
```

Vous devriez voir dans la console :
```
✅ Connexion à PostgreSQL établie
Backend running on http://localhost:3001
```

## Étape 8 : Migrer les données existantes (si nécessaire)

Si vous avez déjà des utilisateurs dans votre base SQLite locale et que vous voulez les migrer :

1. Exportez les données de SQLite (manuellement ou avec un script)
2. Importez-les dans Supabase via l'éditeur SQL ou l'interface

**Note** : Pour un nouveau projet, cette étape n'est pas nécessaire.

## Étape 9 : Déployer sur Vercel

1. Poussez vos changements sur GitHub :
   ```bash
   git add .
   git commit -m "Migration vers PostgreSQL/Supabase"
   git push
   ```

2. Vercel redéploiera automatiquement votre projet
3. Vérifiez que les variables d'environnement sont bien configurées dans Vercel

## Vérification

Après le déploiement, testez :

1. ✅ Créer un compte (signup)
2. ✅ Se connecter (login)
3. ✅ Créer une session de checkout Stripe
4. ✅ Vérifier l'accès après paiement

## Dépannage

### Erreur "DATABASE_URL non définie"

- Vérifiez que la variable `DATABASE_URL` est bien définie dans `.env` (local) ou dans Vercel (production)
- Redémarrez le serveur après avoir ajouté la variable

### Erreur de connexion SSL

- En production, Vercel ajoute automatiquement `ssl: { rejectUnauthorized: false }`
- En développement local, vérifiez que votre URL Supabase est correcte

### Les tables n'existent pas

- Vérifiez que vous avez bien exécuté le script `supabase-schema.sql` dans Supabase
- Vérifiez dans Supabase → **"Table Editor"** que les tables `users` et `payments` existent

### Erreur "relation does not exist"

- Les tables n'ont pas été créées dans Supabase
- Réexécutez le script SQL dans l'éditeur SQL de Supabase

## Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans Supabase → **"Logs"** → **"Postgres Logs"**
2. Vérifiez les logs Vercel dans le dashboard
3. Vérifiez la console du navigateur pour les erreurs frontend

---

**Félicitations !** Votre base de données est maintenant prête pour la production sur Vercel. 🎉
