package nginxconfig

import (
	"bytes"
	"github.com/ps-aux/spa-container/conf"
	"net/url"
	"os"
	"strconv"
	"strings"
	"text/template"
)

type Proxy struct {
	Path    string
	Backend url.URL
}

type ConfParams struct {
	ServerPort int64
	Proxies    []Proxy
}

func templateConf(templatePath string, params ConfParams) (string, error) {
	t, err := template.ParseFiles(templatePath)
	if err != nil {
		return "", err
	}

	buf := new(bytes.Buffer)
	err = t.Execute(buf, params)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}

func TemplateNginxConfig(templatePath string) (string, error) {

	portStr, present := os.LookupEnv("SPA_SERVER_PORT")

	if !present {
		portStr = "80"
	}
	port, err := strconv.ParseInt(portStr, 10, 32)

	if err != nil {
		return "", err
	}

	proxiesEnv := conf.EnvVarsWithPrefix("SPA_PROXY_")

	var proxies []Proxy

	for _, e := range proxiesEnv {
		pair := strings.SplitN(e, ":", 2)

		location := pair[0]
		proxyPass := pair[1]

		u, err := url.Parse(proxyPass)
		if err != nil {
			return "", err
		}
		proxies = append(proxies, Proxy{location, *u})
	}

	return templateConf(
		templatePath,
		ConfParams{
			ServerPort: port,
			Proxies:    proxies,
		})
}
