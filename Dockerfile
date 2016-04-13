FROM node:5.6

ENV NODE_APP_PREFIX UD
ENV UD_ENV production
ENV UD_APP_PORT 3000
ENV UD_API_REMOTE_HOST http://dev.freedrink.club
ENV UD_API_REMOTE_PATH /
ENV UD_API_ROOT api
ENV UD_GOOGLE_GEOCODING_APIKEY AIzaSyAvZu6D7XMsIgtDhbWfIrPL_EkI5OW-7sM
ENV NODE_ENV $UD_ENV

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE $UD_APP_PORT

COPY node_modules /usr/src/app/node_modules
COPY . /usr/src/app

CMD ["node", "index.js"]
