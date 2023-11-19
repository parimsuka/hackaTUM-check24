FROM node:20-alpine

# Create and define the node_modules's cache directory.
RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . ./

EXPOSE 80

