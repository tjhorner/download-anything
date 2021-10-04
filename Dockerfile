FROM node:14.18.0-alpine3.14

WORKDIR /app

RUN apk update
RUN apk add python3 py3-pip
RUN pip install youtube-dl

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "node", "index" ]