FROM node:20
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY src/ ./src
EXPOSE 3000
CMD [ "node", "./src/app.mjs" ]
