package nginxconfig

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"io/ioutil"

	//"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestTemplateNginxConfig(t *testing.T) {

	os.Setenv("SPA_PROXY_1", "/foo:http://blabla")
	os.Setenv("SPA_PROXY_blabla", "/bar:https://bar:123")
	os.Setenv("SPA_SERVER_PORT", "80")
	os.Setenv("SPA_CACHE_EXPIRATION", "123")

	r, err := TemplateNginxConfig("../default.conf.template")

	if err != nil {
		panic(err)
	}

	dat, err := ioutil.ReadFile("conf.expected")
	if err != nil {
		panic(err)
	}

	ioutil.WriteFile("uu", []byte(r), 0777)
	// Debug
	fmt.Print(r)
	assert.Equal(t, string(dat), r)
	// Delete file

}
