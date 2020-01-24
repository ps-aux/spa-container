package htmlindex

import (
	"bytes"
	"github.com/ps-aux/spa-container/conf"
	"github.com/ps-aux/spa-container/vals"
	"net/url"
	"text/template"
)

type Proxy struct {
	Path    string
	Backend url.URL
}

type ConfParams struct {
	ServerPort int
	Proxies    []Proxy
}

func TemplateHtmlIndex(templatePath string) (string, error) {

	t, err := template.ParseFiles(templatePath)
	t.Option("missingkey=error")

	if err != nil {
		return "", err
	}

	conf := conf.EnvVarsWithPrefix(vals.ConfPrefix + "_")

	buf := new(bytes.Buffer)
	err = t.Execute(buf, conf)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}
