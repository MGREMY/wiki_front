FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm i --frozen-lockfile
COPY . ./
RUN pnpm exec nx run wiki:build:production

FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=build app/dist/apps/wiki/browser/ /usr/share/nginx/html
COPY docker/wiki/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

COPY --chmod=755 docker/wiki/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
