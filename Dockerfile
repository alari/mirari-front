FROM node:5.10

ENV NODE_APP_PREFIX MR
ENV MR_ENV production
ENV MR_APP_PORT 3000
ENV MR_API_REMOTE_HOST http://api:9000
ENV MR_API_REMOTE_PATH /
ENV MR_API_ROOT api
ENV NODE_ENV $MR_ENV

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE $MR_APP_PORT

COPY node_modules /usr/src/app/node_modules
COPY . /usr/src/app

CMD ["node", "index.js"]
