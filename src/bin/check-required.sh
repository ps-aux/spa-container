#!/usr/bin/env sh

require () {
    var_name=${PREFIX}_${1}
    # Read form dynamic variable name
    # ${!var_name} in Bash but this is Ash
    eval 'val=$'${var_name}
    test -z ${val} && echo "Missing env var ${var_name}" && exit 1
}

# [[ ]] parts helps with last line not ending with /n
while read var || [[ ${var} ]]
do
    require ${var}  
done
echo 'Conf variables checked'