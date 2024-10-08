FROM node:20
WORKDIR /app
COPY package*.json /app
RUN npm install -g @angular/cli
RUN npm install
COPY . .
EXPOSE 4200
CMD [ "ng", "serve" ]
