#!/usr/bin/env sh
set -e

env | grep ${PREFIX}_ |  sed "s/^${PREFIX}_\(.*\)=\(.*\)/\1=\2/"

if [ -z ${SERVER_PORT} ];then
    echo "SERVER_PORT=80"
fi

