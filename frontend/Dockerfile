
FROM node:alpine as builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN chown node:node /app

USER node

RUN npm run build

FROM nginx:alpine as stage

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
