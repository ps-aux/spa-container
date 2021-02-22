FROM spa-container-e2e-base

ENV SPA_CONF_FOO=foo

ADD index.html ${WWW_CONTENT_PATH}
ADD script.js ${WWW_CONTENT_PATH}
ADD style.css ${WWW_CONTENT_PATH}
RUN echo '{"a":"b"}' > ${INFO_JSON_PATH}

