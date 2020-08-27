FROM node:13.12.0-alpine

RUN npm install -g serve

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD serve -p $PORT -s dist