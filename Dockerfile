################ Build the React application for production ####################
# Using a node image to build the application.
FROM node:alpine AS builder

# Set the working directory, should not be putting everything in root.
WORKDIR /app

# Copy over the package information files, to see what can be used from cache.
COPY package*.json ./

# Use cached dependencies, and install if required module doesn't exist.
RUN npm install

# Copy over the rest of the frontend app into the working directory.
COPY src ./src
COPY public ./public

# Create an optimised build of the application.
RUN npm run build

############### Install dependencies for the server and deploy #################
# Using a node image to run the server on.
FROM node:alpine AS server

# Set the working directory, should not be putting everything in root.
WORKDIR /server

# Copy over the package information files, to see what can be used from cache.
COPY ./server/package*.json ./

# Use cached dependencies, and install if required module doesn't exist.
RUN npm install

# Copy over the server application.
COPY server /server

# Copy over the built version of the application from previous stage.
COPY --from=builder /app/build /build

# Start the Express server.
CMD npm start