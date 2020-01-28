package conf

import (
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestExtractConf(t *testing.T) {

	os.Setenv("SPA_CONF_FOO", "foo")
	os.Setenv("SPA_CONF_BAR", "bar")
	os.Setenv("SPA_OTHER", "other")
	r := EnvVarsWithPrefix("SPA_CONF_")

	expected := make(map[string]string)
	expected["FOO"] = "foo"
	expected["BAR"] = "bar"

	assert.Equal(t, expected, r)
}
