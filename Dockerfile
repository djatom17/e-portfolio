# Build the React application for production
FROM node:alpine AS node_builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=node_builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]