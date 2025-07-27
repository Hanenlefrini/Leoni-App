
FROM node:alpine AS builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN chown -R node:node /app

USER node

RUN npm run build

FROM nginx:alpine AS stage

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
