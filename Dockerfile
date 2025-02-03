FROM node:22.13.1 AS base

FROM base AS builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn run build

FROM base

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/dist ./dist

ENV DATABASE_URL=file:./synonyms.db

CMD [ "yarn", "run", "start:prod" ]
