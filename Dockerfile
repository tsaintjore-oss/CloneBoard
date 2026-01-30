# Image Node.js
FROM node:20-slim

# Outils pour compiler better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier les fichiers du projet
COPY package.json package-lock.json* ./

# Installer les dépendances (npm install accepte un lock file désynchronisé)
RUN npm install

COPY . .

# Port exposé
ENV PORT=3001
EXPOSE 3001

# Démarrer le serveur
CMD ["node", "backend/server.js"]
