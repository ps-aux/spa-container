package infojson

import (
	"encoding/json"
	"github.com/ps-aux/spa-container/conf"
	"github.com/ps-aux/spa-container/vals"
)

func InfoJson() (string, error) {
	m := conf.EnvVarsWithPrefix(vals.ConfPrefix + "_")
	b, err := json.Marshal(m)

	if err != nil {
		return "", err
	}

	return string(b), nil
}
