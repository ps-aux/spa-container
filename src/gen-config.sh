#!/usr/bin/env sh

PREFIX=${_SPA_PREFIX:=SPA}_

echo "{"

# -0 to prevent quotes
env | grep ${PREFIX} | sed -e "s/${PREFIX}\(.*\)=\(.*\)/\"\1\":\"\2\",/g" | xargs -i -0 echo '{}'


# Simple way how to handle not having comma after last record
# TODO find out better way
echo '"_eof":"-"'

echo "}"
