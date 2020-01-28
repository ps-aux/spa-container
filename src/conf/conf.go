package conf

import (
	"os"
	"strings"
)

func EnvVarsWithPrefix(prefix string) map[string]string {
	res := make(map[string]string)
	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		key := pair[0]
		val := pair[1]
		if strings.HasPrefix(key, prefix) {
			key = strings.TrimPrefix(key, prefix)
			res[key] = val
		}
	}
	return res
}
