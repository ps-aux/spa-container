package nginxconfig

import (
	"bytes"
	"errors"
	"github.com/ps-aux/spa-container/proxy"
	"os"
	"strconv"
	"text/template"
)

type ConfParams struct {
	ServerPort      int64
	Proxies         []proxy.Proxy
	CacheExpiration int64
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
		return "", errors.New("SPA_SERVER_PORT not specified")
	}

	port, err := strconv.ParseInt(portStr, 10, 32)

	if err != nil {
		return "", err
	}

	var cacheExpiration = int64(8760)
	cacheExpirationStr, present := os.LookupEnv("SPA_CACHE_EXPIRATION")
	if present {
		val, err := strconv.ParseInt(cacheExpirationStr, 10, 32)
		if err != nil {
			return "", err
		}
		cacheExpiration = val
	}

	proxies, err := proxy.GetProxyConf()

	if err != nil {
		return "", err
	}

	return templateConf(
		templatePath,
		ConfParams{
			ServerPort:      port,
			Proxies:         proxies,
			CacheExpiration: cacheExpiration,
		})
}
