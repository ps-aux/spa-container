# Spa-server

Container for running SPAs.

- web server with SPA configuration:
  - redirects
  - caching
  - API request proxying
- config values injection into index.html  
- info endpoint for custom data


## Cache

The cache configuration relies on immutability of assets. 
With exception to index.html the new version of SPA assets must have new file names
(this can be easily achieved by modern bundlers such as Webpack).

The default value of expiration is 8760 hours (≈ 1 year - recommended max value by [RFC 2616](https://tools.ietf.org/html/rfc2616)). 
If necessary, the number of hours be configured via `SPA_PROXY_EXPIRATION`.
