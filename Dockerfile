FROM nginx:1.13.12-alpine
ADD src/gen-config.sh /usr/bin
ADD src/entry-point.sh /
ADD src/default.conf /etc/nginx/conf.d/default.conf
ADD src/index.html /www/
ENTRYPOINT /entry-point.sh