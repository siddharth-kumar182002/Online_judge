FROM node:20-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++
COPY package.json .
RUN npm i
COPY . .
EXPOSE 8080
CMD ["node","index.js"]
