# 1️⃣ Image Node
FROM node:18

# 2️⃣ Dossier de travail
WORKDIR /app

# 3️⃣ Copier package.json
COPY package*.json ./

# 4️⃣ Installer les dépendances
RUN npm install

# 5️⃣ Copier le code React
COPY . .

# 6️⃣ Construire l’app React
RUN npm run build

# 7️⃣ Installer un serveur pour servir React
RUN npm install -g serve

# 8️⃣ Exposer le port
EXPOSE 8000

# 9️⃣ Lancer l’app
CMD ["serve", "-s", "build", "-l", "8000"]
