FROM node:12-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN yarn compile
COPY . .

CMD [ "yarn", "start" ]
