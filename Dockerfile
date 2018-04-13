FROM nginx:1.13.12-alpine

ADD src/bin/* /usr/bin/

ADD src/default.conf /etc/nginx/conf.d/default.conf

# Debugging and testing purposes
ADD src/index.html /www/

ADD src/entry-point.sh /entry-point.sh
ENTRYPOINT /entry-point.sh
ENV PREFIX SPA