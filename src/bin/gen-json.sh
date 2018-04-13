#!/usr/bin/env sh

PREFIX=${_SPA_PREFIX:=SPA}_

echo "{"

sed -e "s/\(.*\)=\(.*\)/\"\1\":\"\2\",/g"

# Simple way how to handle not having comma after last record
# TODO find out better way
echo '"_eof":"-"'

echo "}"
