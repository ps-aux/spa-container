#!/usr/bin/env bash

export CGO_ENABLED=0 go build

go test
go build -o build/spa-go

#cd nginx-config
#go test
#go build -o ../build-nginx-config
#cd ..
#
#cd info-json
#go test
#go build -o ../build-info-json
#cd ..
