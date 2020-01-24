package htmlindex

import (
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestTemplateHtmlIndex(t *testing.T) {

	os.Setenv("SPA_CONF_FOO", "foo-val")
	os.Setenv("SPA_CONF_BAR", "bar-val")

	res, err := TemplateHtmlIndex("test.index.html")

	if err != nil {
		panic(err)
	}
	assert.Equal(t,
		`<meta name="foo" content="foo-val">`+"\n"+
			`<meta name="bar" content="bar-val">`+"\n",
		res)
}
