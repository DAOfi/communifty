FROM node:12.22.6

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn compile

CMD [ "yarn", "start" ]
