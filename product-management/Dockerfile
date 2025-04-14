FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install 
RUN pnpm install --save-dev jest
COPY . ./app 
EXPOSE 8080

CMD [ "pnpm", "start"]