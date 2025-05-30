FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only dependency files first (cache optimization)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy rest of the source code
COPY . .

# Set environment variable for production build
ENV NODE_ENV=production

# Build the Next.js app
RUN pnpm run build

# Expose port
EXPOSE 80

# Start the app
CMD ["pnpm", "start"]