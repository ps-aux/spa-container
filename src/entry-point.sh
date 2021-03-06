#!/bin/bash
set -e

# Assertion
if [[ -z ${HTML_INDEX_PATH} ]];then
    echo "HTML_INDEX_PATH not specified"
    exit 1
fi

# Assertion
if [[ -z ${INFO_JSON_PATH} ]];then
    echo "INFO_JSON_PATH not specified"
    exit 1
fi


/spa-go conf-json > /conf.json

/spa-go proxy-json > /proxy.json

/spa-go nginx-config default.conf.template > /etc/nginx/conf.d/default.conf

index_html=$(/spa-go html-index ${HTML_INDEX_PATH})

echo ${index_html} > ${HTML_INDEX_PATH}

echo "Starting spa-server at port ${SPA_SERVER_PORT}"
nginx "-g" "daemon off;"
