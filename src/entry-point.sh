#!/usr/bin/env sh
check-required.sh < /vars.txt

if [ $? -eq 0 ]; then
    echo "Config is ok"
else
    echo "Some env vars are missing"
    exit 2
fi

env | grep ${PREFIX}_
echo /www/index.html | process-template.sh

echo "Starting spa-server"
nginx "-g" "daemon off;"
