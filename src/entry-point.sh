#!/usr/bin/env sh
# check-required.sh < /vars.txt

conf=/conf
calc-env.sh > ${conf}
env | grep ${PREFIX}_

cat ${conf} | gen-json.sh > /www/conf.json

echo "Conf:"
cat ${conf}

cp /www/index.html /index.cp
cat /index.cp | process-template.sh ${conf} > /www/index.html
rm /index.cp


echo "Starting spa-server"
nginx "-g" "daemon off;"
