FROM node:20-alpine AS builder

WORKDIR /home/web/frontend

COPY package*.json .

RUN yarn install

COPY . ./

RUN yarn build

FROM nginx:1.19.0

COPY --from=builder /home/web/frontend/dist /usr/share/nginx/html
