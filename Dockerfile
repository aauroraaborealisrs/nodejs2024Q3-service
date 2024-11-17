FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y procps

COPY package*.json ./
RUN npm ci

RUN npm install @nestjs/cli

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:20-slim

WORKDIR /app

ARG NODE_ENV=development

RUN apt-get update && apt-get install -y procps

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/doc/api.yaml ./doc/api.yaml
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/tsconfig.build.json ./

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
