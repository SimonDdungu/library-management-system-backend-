FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN chmod +x /startDocker.sh

RUN npm run build

EXPOSE 3008

ENTRYPOINT ["/startDocker.sh"]