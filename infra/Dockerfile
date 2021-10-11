FROM node:12.22.6

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn compile

CMD [ "yarn", "start" ]
