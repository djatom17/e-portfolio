## Build the React application for production
#FROM node:alpine AS node_builder
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
##WORKDIR /app/api
##RUN npm install
##EXPOSE 8080
##CMD npm start
#
#FROM nginx:stable-alpine
#COPY --from=node_builder /app/build /usr/share/nginx/html
##COPY default.conf.template /etc/nginx/conf.d/default.conf.template
##CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
#
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
#
### Serve using nginx.
##FROM nginx:stable-alpine
##COPY --from=node_builder /app/build /usr/share/nginx/html
##COPY --from=node_builder /app/api /usr/share/nginx/html
FROM node:alpine AS node_builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app/server
COPY --from=node_builder /app/package*.json ./
RUN npm install
COPY --from=node_builder /app/server ./
WORKDIR /app
COPY --from=node_builder /app/build ./
CMD npm start
