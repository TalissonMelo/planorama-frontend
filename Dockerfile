FROM node:latest as liberbox
WORKDIR /app
COPY package.json /app
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=liberbox app/dist/liberbox /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf