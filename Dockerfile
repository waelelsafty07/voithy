FROM node:14

WORKDIR /usr/src/voithy

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run" ,"dev" ]