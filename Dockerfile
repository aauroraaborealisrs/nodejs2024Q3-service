FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install @nestjs/cli

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/doc/api.yaml ./doc/api.yaml

EXPOSE 4000

CMD ["node", "dist/main.js"]
