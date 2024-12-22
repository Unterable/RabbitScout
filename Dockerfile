# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

LABEL org.opencontainers.image.source="https://github.com/Ralve-org/RabbitScout" \
      org.opencontainers.image.description="Modern, intuitive dashboard for RabbitMQ management" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.vendor="Ralve-org"

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
