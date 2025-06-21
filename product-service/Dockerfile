# Stage 1: Build dependencies and source code
FROM node:18 as build
WORKDIR /app

# Copy package files first
COPY package*.json ./

# **FIX:** Copy the Prisma schema BEFORE running npm install.
# This makes the schema available for the `postinstall` script during the build.
COPY prisma ./prisma

# Install all dependencies (including dev). This will now succeed.
RUN npm install

# Copy the rest of the application source code.
# This is done after npm install to leverage Docker layer caching.
COPY . .

# Explicitly generate the Prisma client again.
# This is a safeguard to ensure the client is up-to-date with the full source code.
RUN npx prisma generate

# Build the TypeScript application
RUN npm run build


# Stage 2: Final production image
FROM node:18 as production
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy the Prisma schema before installing for the production postinstall script
COPY prisma ./prisma

# Install only production dependencies
# Using --omit=dev is the modern replacement for --only=production
RUN npm install --omit=dev

# Copy the built application from the 'build' stage
COPY --from=build /app/dist ./dist

# Copy the pre-generated Prisma Client from the 'build' stage
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Command to run the application
CMD ["node", "dist/main"]