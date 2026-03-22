FROM node:24.14.0-alpine

# Enable corepack for pnpm.
RUN corepack enable

WORKDIR /app

# Copy dependency manifests first (layer caching).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies with frozen lockfile.
RUN pnpm install --frozen-lockfile

# Copy project files.
COPY . .

# Install dependencies into the bind-mounted volume on startup so the
# host IDE can resolve types from node_modules.
ENTRYPOINT ["sh", "-c", "pnpm install --frozen-lockfile && exec \"$@\"", "--"]

# Default: run the test watcher.
CMD ["pnpm", "run", "test"]
