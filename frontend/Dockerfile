FROM node:20-bookworm
EXPOSE 80
# Create and define the node_modules's cache directory.
WORKDIR /usr/src/cache
# Install the application's dependencies into the node_modules's cache directory.
COPY package*.json ./
COPY . ./
RUN npm install --verbose
WORKDIR /usr/src/app
