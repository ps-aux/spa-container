#!/usr/bin/env sh
set -e

if [ -z ${PREFIX} ];then
    echo "'PREFIX' not defined"
    exit 1
fi

env | grep "${PREFIX}"_ |  sed "s/^${PREFIX}_\(.*\)=\(.*\)/\1=\2/"

server_port=${SERVER_PORT}
if [ -z ${server_port} ];then
    server_port="80"
fi
echo "SERVER_PORT=${server_port}"

