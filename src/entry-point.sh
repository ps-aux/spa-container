#!/usr/bin/env sh
# check-required.sh < /vars.txt

conf=/conf
calc-env.sh > ${conf}

# Log
env | grep ${PREFIX}_

cat ${conf} | gen-json.sh > /www/conf.json

echo "Conf:"
cat ${conf}

cp /www/index.html /index.cp

nginx_conf=/etc/nginx/conf.d/default.conf
cat ${nginx_conf} | process-template.sh ${nginx_conf} > ${nginx_conf}

cat /index.cp | process-template.sh ${conf} > /www/index.html
rm /index.cp


echo "Starting spa-server"
nginx "-g" "daemon off;"
