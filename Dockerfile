# build stage
FROM node:12.14.0-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

## Setup production ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

# production stage
FROM nginx:1.17.6-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
