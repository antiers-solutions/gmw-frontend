FROM node:14.21.1 AS builder

ARG BUILD_EXPIRE=${BUILD_EXPIRE:-""}
ARG BUILD_DOMAIN=${BUILD_DOMAIN:-""}

WORKDIR /home/node
COPY --chown=node:node . .

USER node
ENV BUILD_EXPIRE=${BUILD_EXPIRE}
ENV BUILD_DOMAIN=${BUILD_DOMAIN}
RUN rm -rf node_modules/

RUN rm -rf yarn.lock

RUN  npm install && npm run build

FROM antiers/wio:0.1.0 AS production

RUN addgroup -S app -g 1000 && adduser -S -h /home/app -s /bin/sh -u 1000 app

COPY --from=builder --chown=app:app /home/node/build /home/app

USER app
EXPOSE 8080

ENTRYPOINT ["wio"]
CMD ["-s","1","-d","/home/app"]
