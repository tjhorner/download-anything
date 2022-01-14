FROM node:14.18.0-alpine3.14

WORKDIR /app

RUN apk update
RUN apk add python3 py3-pip alpine-sdk
RUN pip install yt-dlp

RUN apk del alpine-sdk

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "node", "index" ]