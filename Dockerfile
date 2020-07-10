# --------------------
# Builder
# --------------------
FROM node:12-alpine AS builder

WORKDIR /work
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm test && npm run build && rm -rf node_modules
RUN npm install --production

# --------------------
# Runtime
# --------------------
FROM node:12-alpine AS runtime

WORKDIR /app
COPY --from=builder /work/package.json /app/package.json
COPY --from=builder /work/config /app/config
COPY --from=builder /work/dist /app/dist
COPY --from=builder /work/node_modules /app/node_modules

EXPOSE 80

CMD ["npm", "start"]