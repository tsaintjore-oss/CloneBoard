# Mettre le site en ligne – étapes

## 1. Installer Git (une seule fois)

- Va sur : **https://git-scm.com/download/win**
- Télécharge « Windows » et installe (garde les options par défaut).
- À la fin, ferme puis rouvre Cursor (ou ton terminal).

---

## 2. Préparer le projet (sur ton PC)

**Option simple : double-clique sur `preparer-deploy.bat`**

- Ce script fait : `git init`, `git add .`, `git commit`.
- Si Git n’est pas installé, le script t’indiquera quoi faire.

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

## 5. Déployer sur Vercel (site en ligne)

1. Va sur **https://vercel.com** et connecte-toi (avec GitHub si tu veux).
2. Clique **« Add New… »** → **« Project »**.
3. Choisis ton repo **saas-ofm** dans la liste.
4. **Framework Preset** : laisse **Other** ou **Vite**.
5. **Root Directory** : `.` (par défaut).
6. Si tu n’as qu’un site statique (index.html à la racine) :
   - **Build Command** : laisse vide.
   - **Output Directory** : `.`
7. Clique **« Deploy »**.
8. À la fin, tu auras une URL du type : `https://saas-ofm-xxx.vercel.app` → c’est ton site en ligne.

---

## 6. Modifier le site et le mettre à jour

1. Modifie tes fichiers dans Cursor.
2. Dans un terminal :

```bash
git add .
git commit -m "Description des changements"
git push
```

3. Vercel redéploiera tout seul ; rafraîchis l’URL du site pour voir les changements.

---

**Résumé :**  
Installer Git → lancer `preparer-deploy.bat` (ou les commandes du §2) → créer le repo GitHub → `git remote` + `git push` → connecter le repo à Vercel → Deploy.
