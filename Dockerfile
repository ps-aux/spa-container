FROM golang:1.13.5-buster AS builder

WORKDIR /build

COPY src .

RUN ./build-go.sh

FROM nginx:1.17.9

ENV WWW_CONTENT_PATH=/www/
ENV HTML_INDEX_PATH="${WWW_CONTENT_PATH}/index.html"

ENV INFO_JSON_PATH=/info.json

ENV SPA_SERVER_PORT=80

ADD src/bin/* /usr/bin/
ADD src/default.conf.template /default.conf.template

# Debugging and testing purposes
ADD src/index.html ${HTML_INDEX_PATH}

ADD src/entry-point.sh /entry-point.sh
RUN echo '{"notFilled":"true"}' > ${INFO_JSON_PATH}
ENV PREFIX SPA

COPY --from=builder /build/* /

ENTRYPOINT /entry-point.sh
