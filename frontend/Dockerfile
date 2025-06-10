# Stage 0: Base image definition. This stage is used across other stages for consistency.
# Using a specific Node.js version on Alpine for a lightweight base.
FROM node:20-alpine AS base

# Set build arguments for port and disable telemetry (optional but recommended for production)
ARG PORT=3000
ENV NEXT_TELEMETRY_DISABLED 1

# Set the working directory inside the container
WORKDIR /app

# Stage 1: Install production dependencies
# This stage is for installing only the dependencies required for the application to run in production.
FROM base AS dependencies

# Copy package.json and lock files to leverage Docker's layer caching.
# If these files don't change, Docker can reuse the cached layer for npm install.
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies. `npm ci` is preferred for clean installations based on lock file.
# You might use `yarn install --frozen-lockfile` or `pnpm install --prod` depending on your package manager.
# `npm ci` ensures exact versions from package-lock.json.
RUN npm ci --production

# Stage 2: Build the Next.js application
# This stage builds the Next.js application into a production-ready bundle.
FROM base AS build

# Copy node_modules from the dependencies stage to ensure all dependencies are available for build.
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the rest of the application source code into the container.
# Ensure your .dockerignore file is correctly configured to exclude unnecessary files.
COPY . .

# Run the Next.js build command.
# This will generate the optimized build in the .next directory, including the 'standalone' output.
RUN npm run build

# Stage 3: Production runner image
# This is the final, smallest image that contains only the necessary files to run the application.
FROM base AS runner

# Set environment to production.
ENV NODE_ENV production
ENV PORT ${PORT}

# Create a non-root user and group for security best practices.
# Running as non-root minimizes potential damage if the container is compromised.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy the standalone output, public directory, and static assets from the build stage.
# The 'standalone' output in .next/standalone includes a minimal node_modules, server.js, and other necessary files.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose the port on which the Next.js application will run.
EXPOSE ${PORT}

# Command to run the Next.js production server.
# Next.js generates a server.js in the standalone output, which is used to start the app.
CMD ["node", "server.js"]