#!/usr/bin/env sh

env | grep ${PREFIX}_ |  sed "s/${PREFIX}_\(.*\)=\(.*\)/\1=\2/"