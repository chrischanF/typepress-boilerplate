# Stage 1: Build Stage
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies (including devDependencies) using npm ci for faster builds
RUN npm ci

# Copy the rest of the application code
COPY . .

# Run the build process
RUN npm run build

# Stage 2: Production Stage
FROM node:20 AS production

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json to avoid unnecessary installations
COPY package*.json ./
COPY .env.production ./.env

# Install only production dependencies (skip devDependencies)
RUN npm install --omit=dev --prefer-offline --no-audit --progress=false

# Copy the built files from the build stage
COPY --from=build /app/dist /app/dist

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]
