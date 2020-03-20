package proxy

import (
	"encoding/json"
	"github.com/ps-aux/spa-container/conf"
	"github.com/ps-aux/spa-container/vals"
	"net/url"
	"strings"
)

type Proxy struct {
	Path    string
	Backend url.URL
}

func GetProxyConf() ([]Proxy, error) {

	proxiesEnv := conf.EnvVarsWithPrefix(vals.ProxyConfPrefix + "_")

	// Empty list not nil
	proxies := []Proxy{}

	for _, e := range proxiesEnv {
		pair := strings.SplitN(e, ":", 2)

		location := pair[0]
		proxyPass := pair[1]

		u, err := url.Parse(proxyPass)
		if err != nil {
			return nil, err
		}
		proxies = append(proxies, Proxy{location, *u})
	}

	return proxies, nil
}

func ProxiesJson() (string, error) {
	proxies, err := GetProxyConf()
	if err != nil {
		return "", err
	}

	res := make(map[string]string)
	for _, p := range proxies {
		res[p.Path] = p.Backend.String()
	}

	b, err := json.Marshal(res)

	if err != nil {
		return "", err
	}

	return string(b), nil
}
