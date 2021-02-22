#!/usr/bin/env bash

export CGO_ENABLED=0 go build

go test -v ./...
go build -o build/spa-go

