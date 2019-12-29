#!/usr/bin/env sh

file=$1

if [ ! -f ${file} ]
then
    echo 'No required variables'
    exit 0
fi


require () {
    var_name=${1}
    # Read form dynamic variable name
    # ${!var_name} in Bash but this is Ash
    eval 'val=$'${var_name}
    test -z ${val} && echo "Missing env var ${var_name}" && exit 1
}


while read var
do
    require ${var}
done < ${file}
