FROM node:12

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN npm rebuild
COPY . .
RUN yarn compile

CMD [ "yarn", "start" ]
