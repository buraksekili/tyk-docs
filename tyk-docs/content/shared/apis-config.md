### info
Info contains the main metadata about the API definition.

### info.id
Type: `string`<br />

Old API Definition: `api_id`

ID is the unique ID of the API.


### info.dbID
Type: `apidef.ObjectId`<br />

Old API Definition: `id`

DBID is the unique database ID of the API.


### info.orgID
Type: `string`<br />

Old API Definition: `org_id`

OrgID is the ID of the organisation which the API belongs to.


### info.name
Type: `string` - <b>required</b><br />

Old API Definition: `name`

Name is the name of the API.


### info.state
State contains the configurations related to the state of the API.

### info.state.active
Type: `bool` - <b>required</b><br />

Old API Definition: `active`

Active enables the API.


### info.state.internal
Type: `bool`<br />

Old API Definition: `internal`

Internal makes the API accessible only internally.


### upstream
Upstream contains the configurations related to the upstream.

### upstream.url
Type: `string` - <b>required</b><br />

Old API Definition: `proxy.target_url`

URL defines the target URL that the request should be proxied to.


### upstream.serviceDiscovery
Old API Definition: `proxy.service_discovery`

ServiceDiscovery contains the configuration related to Service Discovery.


### upstream.serviceDiscovery.enabled
Type: `bool` - <b>required</b><br />

Old API Definition: `service_discovery.use_discovery_service`

Enabled enables the Service Discovery.


### upstream.serviceDiscovery.queryEndpoint
Type: `string`<br />

Old API Definition: `service_discovery.query_endpoint`

QueryEndpoint is the endpoint to call, this would probably be Consul, etcd or Eureka K/V store.


### upstream.serviceDiscovery.dataPath
Type: `string`<br />

Old API Definition: `service_discovery.data_path`

DataPath is the namespace of the data path - where exactly in your service response the namespace can be found.
For example, if your service responds with:
```
{
 "action": "get",
 "node": {
   "key": "/services/single",
   "value": "http://httpbin.org:6000",
   "modifiedIndex": 6,
   "createdIndex": 6
 }
}
```

then your namespace would be `node.value`.


### upstream.serviceDiscovery.useNestedQuery
Type: `bool`<br />

Old API Definition: `service_discovery.use_nested_query`

UseNestedQuery enables using a combination of the data_path and parent_data_path.
It is necessary when the data lives within this string-encoded JSON object.
```
{
 "action": "get",
 "node": {
   "key": "/services/single",
   "value": "{"hostname": "http://httpbin.org", "port": "80"}",
   "modifiedIndex": 6,
   "createdIndex": 6
 }
}
```


### upstream.serviceDiscovery.parentDataPath
Type: `string`<br />

Old API Definition: `service_discovery.parent_data_path`

ParentDataPath is the namespace of the where to find the nested value, if `useNestedQuery` is `true`.
In the above example, it would be `node.value`. You would then change the `data_path` setting to be `hostname`,
since this is where the host name data resides in the JSON string.
Tyk automatically assumes that the `data_path` in this case is in a string-encoded JSON object and will try to deserialize it.


### upstream.serviceDiscovery.portDataPath
Type: `string`<br />

Old API Definition: `service_discovery.port_data_path`

PortDataPath is the port of the data path. In the above nested example, we can see that there is a separate `port` value
for the service in the nested JSON. In this case, you can set the `port_data_path` value and Tyk will treat `data_path`
as the hostname and zip them together (this assumes that the hostname element does not end in a slash or resource identifier
such as `/widgets/`). In the above example, the `port_data_path` would be `port`.


### upstream.serviceDiscovery.useTargetList
Type: `bool`<br />

Old API Definition: `service_discovery.use_target_list`

UseTargetList is set this value true, if you are using load balancing. Tyk will treat the data path as a list and
inject it into the target list of your API Definition.


### upstream.serviceDiscovery.cacheTimeout
Type: `int64`<br />

Old API Definition: `service_discovery.cache_timeout`

CacheTimeout is the timeout of a cache value when a new data is loaded from a discovery service.
Setting it too low will cause Tyk to call the SD service too often, setting it too high could mean that
failures are not recovered from quickly enough.


### upstream.serviceDiscovery.targetPath
Type: `string`<br />

Old API Definition: `service_discovery.target_path`

TargetPath is to set a target path to append to the discovered endpoint, since many SD services
only provide host and port data. It is important to be able to target a specific resource on that host.
Setting this value will enable that.


### upstream.serviceDiscovery.endpointReturnsList
Type: `bool`<br />

Old API Definition: `service_discovery.endpoint_returns_list`

EndpointReturnsList is set `true` when the response type is a list instead of object.


### upstream.test
Test contains the configuration related to uptime tests.

### upstream.test.serviceDiscovery
Old API Definition: `proxy.service_discovery`

ServiceDiscovery contains the configuration related to test Service Discovery.


### upstream.test.serviceDiscovery.enabled
Type: `bool` - <b>required</b><br />

Old API Definition: `service_discovery.use_discovery_service`

Enabled enables the Service Discovery.


### upstream.test.serviceDiscovery.queryEndpoint
Type: `string`<br />

Old API Definition: `service_discovery.query_endpoint`

QueryEndpoint is the endpoint to call, this would probably be Consul, etcd or Eureka K/V store.


### upstream.test.serviceDiscovery.dataPath
Type: `string`<br />

Old API Definition: `service_discovery.data_path`

DataPath is the namespace of the data path - where exactly in your service response the namespace can be found.
For example, if your service responds with:
```
{
 "action": "get",
 "node": {
   "key": "/services/single",
   "value": "http://httpbin.org:6000",
   "modifiedIndex": 6,
   "createdIndex": 6
 }
}
```

then your namespace would be `node.value`.


### upstream.test.serviceDiscovery.useNestedQuery
Type: `bool`<br />

Old API Definition: `service_discovery.use_nested_query`

UseNestedQuery enables using a combination of the data_path and parent_data_path.
It is necessary when the data lives within this string-encoded JSON object.
```
{
 "action": "get",
 "node": {
   "key": "/services/single",
   "value": "{"hostname": "http://httpbin.org", "port": "80"}",
   "modifiedIndex": 6,
   "createdIndex": 6
 }
}
```


### upstream.test.serviceDiscovery.parentDataPath
Type: `string`<br />

Old API Definition: `service_discovery.parent_data_path`

ParentDataPath is the namespace of the where to find the nested value, if `useNestedQuery` is `true`.
In the above example, it would be `node.value`. You would then change the `data_path` setting to be `hostname`,
since this is where the host name data resides in the JSON string.
Tyk automatically assumes that the `data_path` in this case is in a string-encoded JSON object and will try to deserialize it.


### upstream.test.serviceDiscovery.portDataPath
Type: `string`<br />

Old API Definition: `service_discovery.port_data_path`

PortDataPath is the port of the data path. In the above nested example, we can see that there is a separate `port` value
for the service in the nested JSON. In this case, you can set the `port_data_path` value and Tyk will treat `data_path`
as the hostname and zip them together (this assumes that the hostname element does not end in a slash or resource identifier
such as `/widgets/`). In the above example, the `port_data_path` would be `port`.


### upstream.test.serviceDiscovery.useTargetList
Type: `bool`<br />

Old API Definition: `service_discovery.use_target_list`

UseTargetList is set this value true, if you are using load balancing. Tyk will treat the data path as a list and
inject it into the target list of your API Definition.


### upstream.test.serviceDiscovery.cacheTimeout
Type: `int64`<br />

Old API Definition: `service_discovery.cache_timeout`

CacheTimeout is the timeout of a cache value when a new data is loaded from a discovery service.
Setting it too low will cause Tyk to call the SD service too often, setting it too high could mean that
failures are not recovered from quickly enough.


### upstream.test.serviceDiscovery.targetPath
Type: `string`<br />

Old API Definition: `service_discovery.target_path`

TargetPath is to set a target path to append to the discovered endpoint, since many SD services
only provide host and port data. It is important to be able to target a specific resource on that host.
Setting this value will enable that.


### upstream.test.serviceDiscovery.endpointReturnsList
Type: `bool`<br />

Old API Definition: `service_discovery.endpoint_returns_list`

EndpointReturnsList is set `true` when the response type is a list instead of object.


### server
Server contains the configurations related to the server.

### server.listenPath
ListenPath represents the path to listen on. Any requests coming into the host, on the port that Tyk is configured to run on,
that match this path will have the rules defined in the API Definition applied.

### server.listenPath.value
Type: `string` - <b>required</b><br />

Old API Definition: `proxy.listen_path`

Value is value of the listen path e.g. `/api/` or `/` or `/httpbin/`.


### server.listenPath.strip
Type: `bool`<br />

Old API Definition: `proxy.strip_listen_path`

Strip removes the inbound listen path in the outgoing request. e.g. `http://acme.com/httpbin/get` where `httpbin`
is the listen path. The `httpbin` listen path which is used to identify the API loaded in Tyk is removed,
and the outbound request would be `http://httpbin.org/get`.


### server.slug
Type: `string`<br />

Old API Definition: `slug`

Slug is the Tyk Cloud equivalent of listen path.


### server.authentication
Authentication contains the configurations related to authentication to the API.

### server.authentication.stripAuthorizationData
Type: `bool`<br />

Old API Definition: `strip_auth_data`

StripAuthorizationData ensures that any security tokens used for accessing APIs are stripped and not leaked to the upstream.


### server.authentication.baseIdentityProvider
Type: `apidef.AuthTypeEnum`<br />

Old API Definition: `base_identity_provided_by`

BaseIdentityProvider enables multi authentication mechanism and provides the session object that determines rate limits, ACL rules and quotas.
It should be set to one of the followings:
- `auth_token`
- `hmac_key`
- `basic_auth_user`
- `jwt_claim`
- `oidc_user`
- `oauth_key`



### server.authentication.token
Old API Definition: `auth_configs["authToken"]`

Token contains the configurations related to standard token based authentication mode.


### server.authentication.token.enabled
Type: `bool` - <b>required</b><br />

Old API Definition: `api_id`

Enabled enables the token based authentication mode.


### server.authentication.token.enableClientCertificate
Type: `bool`<br />

Old API Definition: `auth_configs["authToken"].use_certificate`

EnableClientCertificate allows to create dynamic keys based on certificates.


### server.authentication.token.signatureValidation

Old API Definition:

### server.authentication.basic
Old API Definition: `auth_configs["basic"]`

Basic contains the configurations related to basic authentication mode.


### server.authentication.basic.enabled
Type: `bool` - <b>required</b><br />

Old API Definition: `use_basic_auth`

Enabled enables the basic authentication mode.


### server.authentication.basic.disableCaching
Type: `bool`<br />

Old API Definition: `basic_auth.disable_caching`

DisableCaching disables the caching of basic authentication key.


### server.authentication.basic.cacheTTL
Type: `int`<br />

Old API Definition: `basic_auth.cache_ttl`

CacheTTL is the TTL for a cached basic authentication key in seconds.


### server.authentication.basic.extractCredentialsFromBody
ExtractCredentialsFromBody helps to extract username and password from body. In some cases, like dealing with SOAP,
user credentials can be passed via request body.

### server.authentication.basic.extractCredentialsFromBody.enabled
Type: `bool` - <b>required</b><br />

Old API Definition: `basic_auth.extract_from_body`

Enabled enables extracting credentials from body.


### server.authentication.basic.extractCredentialsFromBody.userRegexp
Type: `string`<br />

Old API Definition: `basic_auth.userRegexp`

UserRegexp is the regex for username e.g. `<User>(.*)</User>`.


### server.authentication.basic.extractCredentialsFromBody.passwordRegexp
Type: `string`<br />

Old API Definition: `basic_auth.passwordRegexp`

PasswordRegexp is the regex for password e.g. `<Password>(.*)</Password>`.


### server.authentication.hmac
Old API Definition: `auth_configs["hmac"]`

HMAC contains the configurations related to HMAC authentication mode.


### server.authentication.hmac.enabled
Type: `bool` - <b>required</b><br />

Old API Definition: `enable_signature_checking`

Enabled enables the HMAC authentication mode.


### server.authentication.hmac.allowedAlgorithms
Type: `[]string`<br />

Old API Definition: `hmac_allowed_algorithms`

AllowedAlgorithms is the array of HMAC algorithms which are allowed. Tyk supports the following HMAC algorithms:
- `hmac-sha1`
- `hmac-sha256`
- `hmac-sha384`
- `hmac-sha512`

and reads value from algorithm header.


### server.authentication.hmac.allowedClockSkew
Type: `float64`<br />

Old API Definition: `hmac_allowed_clock_skew`

AllowedClockSkew is the amount of milliseconds that will be tolerated for clock skew. It is used against replay attacks.
The default value is `0`, which deactivates clock skew checks.


### middleware
Middleware contains the configurations related to the proxy middleware.

### middleware.global
Global contains the configurations related to the global middleware.

### middleware.global.cache
Old API Definition: `cache_options`

Cache contains the configurations related to the caching.


### middleware.global.cache.enabled
Type: `bool` - <b>required</b><br />

Old API Definition: `cache_options.enable_cache`

Enabled turns global cache middleware on or off. It is still possible to enable caching on a per-path basis
by explicitly setting the endpoint cache middleware.


### middleware.global.cache.timeout
Type: `int64`<br />

Old API Definition: `cache_options.cache_timeout`

Timeout is the TTL for a cached object in seconds.


### middleware.global.cache.cacheAllSafeRequests
Type: `bool`<br />

Old API Definition: `cache_options.cache_all_safe_requests`

CacheAllSafeRequests caches responses to (`GET`, `HEAD`, `OPTIONS`) requests overrides per-path cache settings in versions,
applies across versions.


### middleware.global.cache.cacheResponseCodes
Type: `[]int`<br />

Old API Definition: `cache_options.cache_response_codes`

CacheResponseCodes is the array of response codes which are safe to cache e.g. `404`.


### middleware.global.cache.cacheByHeaders
Type: `[]string`<br />

Old API Definition: `cache_options.cache_by_headers`

CacheByHeaders allows header values to be used as part of the cache key.


### middleware.global.cache.enableUpstreamCacheControl
Type: `bool`<br />

Old API Definition: `cache_options.enable_upstream_cache_control`

EnableUpstreamCacheControl instructs Tyk Cache to respect upstream cache control headers.


### middleware.global.cache.controlTTLHeaderName
Type: `string`<br />

Old API Definition: `cache_options.cache_control_ttl_header`

ControlTTLHeaderName is the response header which tells Tyk how long it is safe to cache the response for.


