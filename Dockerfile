FROM golang:1.13.5-buster AS builder

WORKDIR /build

COPY src .

RUN ./build-go.sh


FROM nginx:1.13.12-alpine

ADD src/bin/* /usr/bin/
ADD src/default.conf.template /default.conf.template

# Debugging and testing purposes
ADD src/index.html /www/

ADD src/entry-point.sh /entry-point.sh
ENV PREFIX SPA

COPY --from=builder /build/* /

ENTRYPOINT /entry-point.sh
