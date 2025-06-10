# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json yarn.lock* pnpm-lock.yaml* ./ 

# Install dependencies
# Use --frozen-lockfile or --immutable for reproducible builds
RUN npm install --frozen-lockfile # Or yarn install --frozen-lockfile, or pnpm install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the Next.js application
# Ensure your .env files are handled if needed by the build
# (e.g., copying .env.production if applicable)
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS runner 

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json 

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "start"]