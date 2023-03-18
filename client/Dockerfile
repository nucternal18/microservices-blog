FROM node:18-alpine

# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["yarn", "dev"]