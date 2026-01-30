# API Routes pour Vercel Serverless Functions

Ce dossier contient les routes API déployées comme Serverless Functions sur Vercel.

## Structure

Vercel détecte automatiquement les fichiers dans `api/` et les déploie comme Serverless Functions.

Pour que cela fonctionne, nous devons créer des wrappers qui importent les routes Express existantes.

## Alternative : Utiliser le backend Express complet

Si vous préférez déployer le backend Express complet plutôt que des Serverless Functions individuelles, vous pouvez :

1. Déployer le backend séparément sur Railway, Render, ou Fly.io
2. Mettre à jour `FRONTEND_URL` dans les variables d'environnement
3. Configurer CORS pour autoriser votre domaine Vercel

## Note importante

Le backend actuel (`backend/server.js`) utilise Express et nécessite une adaptation pour Vercel Serverless Functions.

Pour l'instant, le backend peut être déployé séparément ou adapté pour Vercel en créant des wrappers dans ce dossier.
