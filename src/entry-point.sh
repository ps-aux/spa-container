#!/usr/bin/env sh
set -e

/spa-go info-json > /www/info.json
/spa-go nginx-config default.conf.template > /etc/nginx/conf.d/default.conf
index_html=$(/spa-go html-index /www/index.html)

echo ${index_html} > /www.index.html

echo "Starting spa-server"
nginx "-g" "daemon off;"
