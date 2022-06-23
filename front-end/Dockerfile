FROM node:lts-bullseye

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app

ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

RUN npm run build
RUN rm -rf ./test

ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]