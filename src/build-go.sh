#!/usr/bin/env bash

export CGO_ENABLED=0 go build

go test
go build -o build/spa-go

