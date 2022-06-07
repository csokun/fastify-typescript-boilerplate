# --------------------
# Builder
# --------------------
FROM node:14-alpine AS builder

WORKDIR /work
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm test && \
    npm run build && \
    rm -rf node_modules && \
    npm ci --production

# --------------------
# Runtime
# --------------------
FROM node:14-alpine AS runtime

WORKDIR /app
COPY --from=builder /work/package.json /app/package.json
COPY --from=builder /work/config /app/config
COPY --from=builder /work/dist /app/dist
COPY --from=builder /work/node_modules /app/node_modules

EXPOSE 80

CMD ["npm", "start"]
