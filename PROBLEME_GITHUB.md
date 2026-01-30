# 🔧 Résoudre le Problème de Connexion GitHub

## Problème : "Failed to connect to github.com"

Cela peut être dû à :
1. **Problème de réseau** (internet, VPN, proxy)
2. **Firewall/antivirus** qui bloque la connexion
3. **Proxy mal configuré**

---

## Solutions

### Solution 1 : Vérifier la connexion Internet

1. Ouvre ton navigateur
2. Va sur **https://github.com**
3. Si GitHub ne charge pas → problème de connexion internet
4. Si GitHub charge → le problème vient de Git

### Solution 2 : Désactiver le proxy (si tu en as un)

1. Ouvre PowerShell en tant qu'administrateur
2. Tape :
   ```powershell
   git config --global --unset http.proxy
   git config --global --unset https.proxy
   ```

### Solution 3 : Utiliser GitHub Desktop (Plus Simple !)

**C'est la méthode la plus simple si Git ne fonctionne pas :**

1. Télécharge **GitHub Desktop** : https://desktop.github.com
2. Installe-le
3. Connecte-toi avec ton compte GitHub
4. Ouvre GitHub Desktop
5. Clique sur **"File"** → **"Add Local Repository"**
6. Sélectionne le dossier : `c:\Users\ordi2137649\Desktop\saas ofm`
7. GitHub Desktop détecte les changements
8. En bas, tape un message : "Configuration pour déploiement"
9. Clique sur **"Commit to main"**
10. Clique sur **"Push origin"** (en haut)

**C'est fait !** Beaucoup plus simple que la ligne de commande.

### Solution 4 : Pousser manuellement via le site GitHub

Si rien ne fonctionne :

1. Va sur **https://github.com/tsaintjore-oss/CloneBoard**
2. Clique sur **"Upload files"**
3. Glisse-dépose les nouveaux fichiers
4. Clique sur **"Commit changes"**

---

## Une fois que c'est poussé sur GitHub

Retourne sur Railway/Vercel et cherche le repo **"CloneBoard"**.

Si tu ne le vois toujours pas :

### Sur Railway :
1. Clique sur **"Configure GitHub App"** ou **"Authorize"**
2. Autorise Railway à accéder à tes repos
3. Rafraîchis la page
4. Tu devrais voir **"CloneBoard"**

### Sur Vercel :
1. Clique sur **"Adjust GitHub App Permissions"**
2. Autorise Vercel à accéder à tes repos
3. Rafraîchis la page
4. Tu devrais voir **"CloneBoard"**

---

## 🎯 Recommandation

**Utilise GitHub Desktop** → C'est le plus simple et ça évite les problèmes de connexion !
