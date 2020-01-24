package main

import (
	"fmt"
	"github.com/ps-aux/spa-container/htmlindex"
	"github.com/ps-aux/spa-container/infojson"
	"github.com/ps-aux/spa-container/nginxconfig"
	"os"
)

func HandlePossibleError(err error) {
	if err != nil {
		panic(err)
	}
}

func templateNginxConfigCmd() {
	path := os.Args[2]
	res, err := nginxconfig.TemplateNginxConfig(path)
	HandlePossibleError(err)
	fmt.Print(res)
}

func infoJsonCmd() {
	res, err := infojson.InfoJson()
	HandlePossibleError(err)
	fmt.Print(res)
}

func htmlIndexCmd() {
	path := os.Args[2]
	res, err := htmlindex.TemplateHtmlIndex(path)
	HandlePossibleError(err)
	fmt.Print(res)
}

func main() {
	command := os.Args[1]

	switch command {
	case "nginx-config":
		templateNginxConfigCmd()
	case "info-json":
		infoJsonCmd()
	case "html-index":
		htmlIndexCmd()
	default:
		panic("Unknown command '" + command + "'")
	}
}
