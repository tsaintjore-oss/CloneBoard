# 🔄 Pousser le Projet sur GitHub

## Étape 1 : Ajouter tous les fichiers

1. Ouvre un terminal dans Cursor (ou PowerShell)
2. Va dans le dossier du projet :
   ```bash
   cd "c:\Users\ordi2137649\Desktop\saas ofm"
   ```

3. Ajoute tous les fichiers :
   ```bash
   git add .
   ```

## Étape 2 : Créer un commit

```bash
git commit -m "Configuration pour déploiement Railway et Vercel"
```

## Étape 3 : Pousser sur GitHub

```bash
git push
```

Si ça te demande de te connecter :
- GitHub va ouvrir ton navigateur
- Autorise l'accès
- Retourne dans le terminal

## ✅ C'est fait !

Maintenant ton projet est à jour sur GitHub.

---

## Ensuite : Autoriser Railway/Vercel

### Sur Railway :

1. Va sur **https://railway.app**
2. Clique sur **"New Project"**
3. Clique sur **"Deploy from GitHub repo"**
4. Si tu ne vois pas ton repo, clique sur **"Configure GitHub App"** ou **"Authorize"**
5. Autorise Railway à accéder à tes repos GitHub
6. Tu devrais maintenant voir **"CloneBoard"** dans la liste

### Sur Vercel :

1. Va sur **https://vercel.com**
2. Clique sur **"Add New Project"**
3. Si tu ne vois pas ton repo, clique sur **"Adjust GitHub App Permissions"**
4. Autorise Vercel à accéder à tes repos GitHub
5. Tu devrais maintenant voir **"CloneBoard"** dans la liste

---

## 🐛 Si ça ne marche toujours pas

**Vérifie que :**
- Le repo s'appelle bien **"CloneBoard"**
- Le compte GitHub est **"tsaintjore-oss"**
- Tu es bien connecté avec le bon compte GitHub sur Railway/Vercel

**Si le repo est privé :**
- Railway et Vercel peuvent accéder aux repos privés
- Assure-toi d'avoir autorisé l'accès complet
