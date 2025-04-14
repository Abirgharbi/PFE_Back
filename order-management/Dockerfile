FROM node:16.14.0-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install 
COPY . ./app

EXPOSE 8080

CMD [ "pnpm", "start"]