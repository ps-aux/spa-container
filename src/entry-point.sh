#!/usr/bin/env sh
gen-config.sh > /www/conf.json
echo "Starting spa-server"
# So the first line is emitted
echo "---"
nginx "-g" "daemon off;"
