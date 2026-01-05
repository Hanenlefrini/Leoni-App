# 1️⃣ Image de base Node
FROM node:18

# 2️⃣ Dossier de travail dans le conteneur
WORKDIR /app

# 3️⃣ Copier package.json
COPY package*.json ./

# 4️⃣ Installer les dépendances
RUN npm install

# 5️⃣ Copier le reste du code
COPY . .

# 6️⃣ Exposer le port du backend
EXPOSE 3000

# 7️⃣ Lancer le serveur
CMD ["npm", "start"]
