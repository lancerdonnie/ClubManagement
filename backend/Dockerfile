FROM node:current-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
ENV TZ=Africa/Lagos
ENV PORT=$PORT
ENV PG_PASSWORD=$PG_PASSWORD
ENV PG_USERNAME=$PG_USERNAME
ENV PG_HOST=$PG_HOST
ENV PG_DATABASE=$PG_DATABASE
ENTRYPOINT ["npm","start"]