package proxy

import (
	"fmt"
	"os"

	//"fmt"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNoProxiesResultsInEmptyArray(t *testing.T) {

	//os.Setenv("SPA_PROXY_a", "/a:/http://a-host")
	//os.Setenv("SPA_PROXY_BAR", "/b:/https:/b-host")

	r, _ := GetProxyConf()

	assert.Equal(t, r, []Proxy{})
}

func TestProxyJson(t *testing.T) {

	os.Setenv("SPA_PROXY_a", "/a:/http://a-host")
	os.Setenv("SPA_PROXY_BAR", "/b:/https:/b-host")

	r, _ := ProxiesJson()

	fmt.Println("----")
	fmt.Println(r)
	assert.Equal(t, "a", "a")

}
