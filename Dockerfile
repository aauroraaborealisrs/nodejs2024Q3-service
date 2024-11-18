# FROM node:18-alpine AS build

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .

# # Stage 2: Development
# FROM node:18-alpine

# WORKDIR /usr/src/app

# COPY --from=build /usr/src/app ./

# EXPOSE 4000

# CMD ["sh", "-c", "npm run start:dev"]

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app ./

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]