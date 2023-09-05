FROM node:16
WORKDIR /usr/src/task-chats-server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3009
CMD [ "node", "app.js" ]