FROM node:14-alpine AS base

FROM base AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm cache clean --force
RUN npm install
COPY ./ ./
EXPOSE 3000
RUN npm run build
USER node
CMD [ "npm", "run", "start:prod" ]
