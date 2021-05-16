FROM node:fermium-alpine3.13 as builder
WORKDIR /app
COPY yarn.lock /app/
COPY package.json /app/
COPY tsconfig.json /app/
COPY src/ /app/src

RUN yarn install --frozen-lockfile  \
    && yarn build


FROM node:fermium-alpine3.13
WORKDIR /app
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist/ /app/dist/

CMD ["npm", "start"]
