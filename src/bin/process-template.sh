#!/usr/bin/env sh

# List of vars to substitute
set -e
file=$1

vars=$(cat ${file} | sed "s/\(.*\)=.*/\1/" | awk '{printf "${%s},", $0}')

while read line
do
    eval "export ${line}"
done < ${file}

envsubst "${vars}"
