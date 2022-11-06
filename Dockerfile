FROM node:lts-alpine as base

RUN npm i -g pnpm

FROM base as build

ARG PORT=3001

ENV PORT=${PORT}

WORKDIR /src

COPY ./package.json ./pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile --prod

COPY ./src ./src

CMD ["pnpm", "start:prod"]