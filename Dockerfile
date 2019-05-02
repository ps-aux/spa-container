FROM nginx:1.13.12-alpine

ADD src/bin/* /usr/bin/

ADD src/default.conf /etc/nginx/conf.d/default.conf

# Debugging and testing purposes
ADD src/index.html /www/

ADD src/entry-point.sh /entry-point.sh
ENV API_PATH_PREFIX="/api"
#ENV API_PROXY_TARGET="http://172.17.0.1:8080"
ENV PREFIX SPA
ENTRYPOINT /entry-point.sh
