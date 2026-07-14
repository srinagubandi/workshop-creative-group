# ─── Workshop Creative Group — Railway Dockerfile ─────────────────────────────
# Single-stage build: install all deps, build, then run.
# We keep devDependencies because the server's Vite integration references them
# at runtime in production (serveStatic uses vite internals).
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

# Install ALL dependencies (including devDeps — vite is needed at runtime)
RUN pnpm install --frozen-lockfile

# Copy the full source
COPY . .

# Build frontend (Vite) + backend (esbuild)
RUN pnpm run build

# Railway injects PORT automatically; default to 8080
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/index.js"]
