# Configuration du Backend pour Vercel

## Problème avec SQLite sur Vercel

Le backend actuel utilise **better-sqlite3** avec un fichier de base de données local (`users.db`). Cette approche ne fonctionne **pas** avec Vercel Serverless Functions car :

1. Les fonctions serverless sont **stateless** (pas de stockage persistant)
2. Chaque invocation peut être sur un serveur différent
3. Les fichiers locaux ne persistent pas entre les invocations

## Solutions possibles

### Option 1 : Utiliser une base de données externe (recommandé)

Remplacez SQLite par une base de données cloud :

#### A. PostgreSQL (via Supabase, Railway, ou Neon)
- Gratuit jusqu'à un certain quota
- Compatible avec Vercel
- Migration facile depuis SQLite

#### B. MongoDB Atlas
- Gratuit jusqu'à 512 MB
- Facile à configurer
- Compatible avec Node.js

#### C. PlanetScale (MySQL)
- Gratuit pour les petits projets
- Très rapide
- Compatible avec Vercel

### Option 2 : Utiliser Vercel KV (Redis)

Pour un stockage simple de données utilisateur :
- Gratuit jusqu'à 30 000 requêtes/jour
- Très rapide
- Parfait pour les sessions et données utilisateur

### Option 3 : Déployer le backend séparément

Déployez le backend sur une plateforme qui supporte SQLite :
- **Railway** : Supporte SQLite et fichiers persistants
- **Render** : Supporte les applications avec stockage persistant
- **Fly.io** : Supporte les volumes persistants

## Migration recommandée : PostgreSQL avec Supabase

### Étapes

1. **Créer un compte Supabase** : https://supabase.com
2. **Créer un nouveau projet**
3. **Créer les tables** :

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  stripe_customer_id TEXT,
  subscription_type TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  subscription_end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER,
  currency TEXT DEFAULT 'eur',
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. **Installer le client PostgreSQL** :

```bash
npm install pg
```

5. **Modifier `backend/db/users.js`** pour utiliser PostgreSQL au lieu de SQLite

6. **Ajouter la variable d'environnement** `DATABASE_URL` sur Vercel avec l'URL de connexion Supabase

## Configuration actuelle (pour développement local)

Pour le développement local, le backend fonctionne avec SQLite. Pour tester :

```bash
npm run server
```

Le backend démarre sur `http://localhost:3001` et crée automatiquement `backend/users.db`.

## Note importante

**Pour la production sur Vercel**, vous **devez** migrer vers une base de données externe. SQLite ne fonctionnera pas correctement sur Vercel Serverless Functions.
