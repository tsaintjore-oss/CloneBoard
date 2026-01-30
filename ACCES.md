# Accéder au site — dépannage

## 1. Démarrer le site

### Option A : Double-clic (Windows)
- Double-clique sur **`start.bat`** à la racine du projet.
- Le script installe les dépendances si besoin, puis lance le serveur.
- Quand tu vois `Local: http://localhost:5173/`, le site est prêt.

### Option B : Ligne de commande
```bash
cd "c:\Users\ordi2137649\Desktop\saas ofm"
npm install
npm run dev
```

---

## 2. Ouvrir dans le navigateur

Quand le serveur tourne, essaie **dans cet ordre** :

| URL | Remarque |
|-----|----------|
| **http://localhost:5173** | Adresse standard |
| **http://127.0.0.1:5173** | Si `localhost` ne marche pas |
| **http://[ton-IP]:5173** | Vite affiche cette URL au démarrage si `host: true` |

Le navigateur peut s’ouvrir tout seul. Sinon, copie-colle une des URLs ci‑dessus dans la barre d’adresse.

---

## 3. Si le site n’est toujours pas accessible

### « npm n’est pas reconnu »
- Installe **Node.js** : https://nodejs.org (version LTS).
- Coche l’option pour ajouter Node au **PATH**.
- **Ferme puis rouvre** le terminal (ou Cursor) après l’installation.

### Page blanche ou erreur dans le navigateur
- Ouvre les **Outils de développement** (F12) → onglet **Console**.
- Note le message d’erreur (en rouge) pour le partager ou le rechercher.

### Le serveur ne démarre pas / « Port 5173 already in use »
- Un autre logiciel utilise peut‑être le port 5173.
- Ferme les autres terminaux où tu as lancé `npm run dev`, ou arrête l’appli qui écoute sur 5173.
- Vite peut proposer un autre port (ex. 5174) : utilise l’URL affichée dans le terminal.

### Antivirus / pare-feu Windows
- Certains antivirus bloquent Node ou le port 5173.
- Essaie d’ajouter une **exception** pour :
  - le dossier du projet,
  - `node.exe`,
  - ou le port **5173** dans le pare-feu Windows.

### Toujours bloqué
- Vérifie qu’il n’y a pas de **VPN** ou de proxy qui modifie `localhost`.
- Teste avec un autre navigateur (Chrome, Edge, Firefox).
- Redémarre le PC après l’installation de Node.js.

---

## 4. Vérifier que tout est en place

Avant de lancer le projet, il faut :
- **Node.js** installé (`node -v` et `npm -v` dans un terminal),
- le dossier **`node_modules`** (créé par `npm install`),
- le fichier **`src/components/Dashboard.jsx`** (sans lui, l’app ne charge pas).

Si `node_modules` manque, exécute `npm install` dans le dossier du projet.
