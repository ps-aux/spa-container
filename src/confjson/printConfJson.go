package confjson

import (
	"encoding/json"
	"github.com/ps-aux/spa-container/conf"
	"github.com/ps-aux/spa-container/vals"
)

func ConfJson() (string, error) {
	m := conf.EnvVarsWithPrefix(vals.ConfPrefix + "_")
	b, err := json.Marshal(m)

	if err != nil {
		return "", err
	}

	return string(b), nil
}
