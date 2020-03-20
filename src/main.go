package main

import (
	"fmt"
	"github.com/ps-aux/spa-container/confjson"
	"github.com/ps-aux/spa-container/htmlindex"
	"github.com/ps-aux/spa-container/nginxconfig"
	"github.com/ps-aux/spa-container/proxy"
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

func confJsonCmd() {
	res, err := confjson.ConfJson()
	HandlePossibleError(err)
	fmt.Print(res)
}

func proxiesJsonCmd() {
	res, err := proxy.ProxiesJson()
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
	case "conf-json":
		confJsonCmd()
	case "proxy-json":
		proxiesJsonCmd()
	case "html-index":
		htmlIndexCmd()
	default:
		panic("Unknown command '" + command + "'")
	}
}
