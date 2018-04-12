FROM nginx:1.13.12-alpine
ADD src/gen-config.sh /usr/bin
ADD src/entry-point.sh /
ADD src/index.html /var/www
ENTRYPOINT /entry-point.sh