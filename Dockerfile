FROM nginx:1.13.12-alpine

ADD src/bin/* /usr/bin/

ADD src/default.conf.template /default.conf.template

# Debugging and testing purposes
ADD src/index.html /www/

ADD src/entry-point.sh /entry-point.sh
ENV PREFIX SPA
ENTRYPOINT /entry-point.sh
