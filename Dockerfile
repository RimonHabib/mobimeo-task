FROM node:14-alpine AS base

FROM base AS builder
WORKDIR /app
COPY package.json ./
RUN npm cache clean --force
RUN npm install
COPY ./ ./
RUN npm run build

FROM base AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install
COPY --from=builder /app/dist /app/dist
EXPOSE 3000
USER node
CMD [ "npm", "run", "start:prod" ]
