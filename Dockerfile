FROM node:16

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

RUN npm run build

CMD ["node", "dist/main"]