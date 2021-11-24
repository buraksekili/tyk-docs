### listen_port
EV: <b>TYK_MDCB_LISTENPORT</b><br />
Type: `int`<br />

The rpc port which worker gateways will connect to. Open this port to accept connections via your firewall.<br>If this value is not set, the MDCB application will apply a default value of 9091.

### healthcheck_port
EV: <b>TYK_MDCB_HEALTHCHECKPORT</b><br />
Type: `int`<br />

This port lets MDCB allow standard health checks.<br>If this value is not set, the MDCB component will apply a default value of 8181.

### enable_http_profiler
EV: <b>TYK_MDCB_HTTPPROFILE</b><br />
Type: `bool`<br />

Enable debugging of your Tyk MDCB by exposing profiling information.

### server_options.use_ssl
EV: <b>TYK_MDCB_SERVEROPTIONS.USESSL</b><br />
Type: `bool`<br />

If `use_ssl` is set to true, you need to enter the `cert_file` and `key_file` path names for your certificate.

### server_options.certificate
Certificate data to expose the HTTP server

### server_options.certificate.cert_file
EV: <b>TYK_MDCB_SERVEROPTIONS.CERTIFICATE_CERTFILE</b><br />
Type: `string`<br />

Filesystem location for your pem encoded certificate

### server_options.certificate.key_file
EV: <b>TYK_MDCB_SERVEROPTIONS.CERTIFICATE_KEYFILE</b><br />
Type: `string`<br />

Filesystem location for pem encoded private key

### server_options.min_version
EV: <b>TYK_MDCB_SERVEROPTIONS.MINVERSION</b><br />
Type: `uint16`<br />

The `min_version` setting should be the minimum TLS protocol version required from the client.<br> For TLS 1.0 use 769<br>For TLS 1.1 use 770<br>For TLS 1.2 use 771<br>For TLS 1.3 use 772

### server_options.ssl_ciphers
EV: <b>TYK_MDCB_SERVEROPTIONS.CIPHERS</b><br />
Type: `[]string`<br />

This is the list of the supported cipher suites (IANA) for TLS versions up to TLS 1.2. This defaults to a list of secure cipher suites.

### security.private_certificate_encoding_secret
EV: <b>TYK_MDCB_SECURITY.PRIVATECERTIFICATEENCODINGSECRET</b><br />
Type: `string`<br />

Allows MDCB to use Mutual TLS. This requires that `server_options.use_ssl` is set to true. See [Mutual TLS](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/#a-name-mdcb-a-mdcb) for more details.

### storage
This section describes your centralised Redis DB. This will act as your master key store for all of your clusters.

### storage.type
EV: <b>TYK_MDCB_STORAGE_TYPE</b><br />
Type: `string`<br />

Currently, the only storage type supported is Redis.

### storage.host
EV: <b>TYK_MDCB_STORAGE_HOST</b><br />
Type: `string`<br />

Hostname of your Redis server

### storage.port
EV: <b>TYK_MDCB_STORAGE_PORT</b><br />
Type: `int`<br />

The port number your Redis server is listening on.

### storage.master_name
EV: <b>TYK_MDCB_STORAGE_MASTERNAME</b><br />
Type: `string`<br />

Defines the Redis Sentinel master name

### storage.sentinel_password
EV: <b>TYK_MDCB_STORAGE_SENTINELPASSWORD</b><br />
Type: `string`<br />

If set, Redis Sentinel will authenticate using this password.

### storage.username
EV: <b>TYK_MDCB_STORAGE_USERNAME</b><br />
Type: `string`<br />

If set, a Redis connection will be established with this user. If not set then it will defaults to the default Redis user

### storage.password
EV: <b>TYK_MDCB_STORAGE_PASSWORD</b><br />
Type: `string`<br />

Optional auth password for Redis db

### storage.database
EV: <b>TYK_MDCB_STORAGE_DATABASE</b><br />
Type: `int`<br />

By default, the database is 0. Setting the database is not supported with a Redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.

### storage.optimisation_max_idle
EV: <b>TYK_MDCB_STORAGE_MAXIDLE</b><br />
Type: `int`<br />

MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.

### storage.optimisation_max_active
EV: <b>TYK_MDCB_STORAGE_MAXACTIVE</b><br />
Type: `int`<br />

In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.

### storage.enable_cluster
EV: <b>TYK_MDCB_STORAGE_ENABLECLUSTER</b><br />
Type: `bool`<br />

If you are using Redis cluster, enable it here to enable the slots mode.

### storage.hosts
EV: <b>TYK_MDCB_STORAGE_HOSTS</b><br />
Type: `map[string]string`<br />

Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}`

### storage.addrs
EV: <b>TYK_MDCB_STORAGE_ADDRS</b><br />
Type: `[]string`<br />

It can be either a single address or a seed list of host:port addresses of cluster/sentinel nodes. It overrides the value of hosts.

### storage.redis_use_ssl
EV: <b>TYK_MDCB_STORAGE_REDISUSESSL</b><br />
Type: `bool`<br />

If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)

### storage.redis_ssl_insecure_skip_verify
EV: <b>TYK_MDCB_STORAGE_REDISSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows the use of self-signed certificates when connecting to an encrypted Redis database.

### analytics
The configuration of your analytics stores

### analytics.mongo_url
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOURL</b><br />
Type: `string`<br />

Connection string for MongoDB.

### analytics.mongo_use_ssl
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOUSESSL</b><br />
Type: `bool`<br />

A Boolean setting for Mongo SSL support. Set to true to enable SSL.

### analytics.mongo_ssl_insecure_skip_verify
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

This setting allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### analytics.mongo_ssl_allow_invalid_hostnames
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLALLOWINVALIDHOSTNAMES</b><br />
Type: `bool`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling). The rest of the TLS verification will still be performed

### analytics.mongo_ssl_ca_file
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLCAFILE</b><br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### analytics.mongo_ssl_pem_keyfile
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSSLPEMKEYFILE</b><br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is required for Mutual TLS.

### analytics.mongo_session_consistency
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOSESSIONCONSISTENCY</b><br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The other values are:
* eventual
* monotonic

### analytics.mongo_batch_size
EV: <b>TYK_MDCB_ANALYTICSCONFIG_MONGOBATCHSIZE</b><br />
Type: `int`<br />

Sets the batch size for MongoDB results.

### hash_keys
EV: <b>TYK_MDCB_HASHKEYS</b><br />
Type: `bool`<br />

Set to `true` if you are using a hashed configuration installation of Tyk. Otherwise set to `false`.

### session_timeout
EV: <b>TYK_MDCB_SESSIONTIMEOUT</b><br />
Type: `int64`<br />

Number of seconds before the Tyk Gateways are forced to re-login. Default is 86400 (24 hours).

### forward_analytics_to_pump
EV: <b>TYK_MDCB_FORWARDANALYTICSTOPUMP</b><br />
Type: `bool`<br />

Instead of sending analytics directly to MongoDB, MDCB can send analytics to Redis. This will allow [tyk-pump] (https://github.com/TykTechnologies/tyk-pump) to pull analytics from Redis and send to your own data sinks.

### enable_multiple_analytics_keys
EV: <b>TYK_MDCB_ENABLEMULTIPLEANALYTICSKEYS</b><br />
Type: `bool`<br />

Instead of saving all the analytics in one key, this will enable to save the analytics in multiple keys. It's specially useful when you are using Redis cluster. This will work only if `forward_analytics_to_pump` is set to `true` and your Tyk Pump is v1.2.1 or higher.

### dont_store_selective
EV: <b>TYK_MDCB_DONTSTORESELECTIVE</b><br />
Type: `bool`<br />

Set to `true` if you don't want to store selective analytics

### dont_store_aggregate
EV: <b>TYK_MDCB_DONTSTOREAGGREGATES</b><br />
Type: `bool`<br />

Set to `true` to don't store aggregate analytics

### org_session_expiration
EV: <b>TYK_MDCB_ORGCACHEEXPIRATION</b><br />
Type: `int`<br />

Sets the organisation cache expiration in minutes. The default is 60 minutes. This will only work with Tyk-Sync 1.9 or higher.

### org_session_cleanup
EV: <b>TYK_MDCB_ORGCACHECLEANUP</b><br />
Type: `int`<br />

Sets the organisation cache cleanup interval in minutes. The default is 60 minutes. This will only work with Tyk-Sync 1.9 or higher.

### license
EV: <b>TYK_MDCB_LICENSE</b><br />
Type: `string`<br />

Enter your license in this section so MDCB can start.

### track_all_paths
EV: <b>TYK_MDCB_TRACKALLPATHS</b><br />
Type: `bool`<br />

Currently, analytics for an endpoint is stored only if the Track Endpoint plugin is enabled on that endpoint. If `track_all_paths` is enabled, it will store analytics for all the endpoints, irrespective of the Track Endpoint plugin.

### store_analytics_per_minute
EV: <b>TYK_MDCB_STOREANALYTICSPERMINUTE</b><br />
Type: `bool`<br />

Set to `true` to generate aggregated analytics per minute. By default it will generate aggregate data per hour. If this option is enabled, aggregate data will be generated per minute.

### ignore_tag_prefix_list
EV: <b>TYK_MDCB_IGNORETAGPREFIXLIST</b><br />
Type: `[]string`<br />

If set to `true` then it will not store analytics for tags having prefix specified in the list. **Note**: Prefix “key-” is added in the list by default. This tag is added by gateway for keys.

### threshold_len_tag_list
EV: <b>TYK_MDCB_THRESHOLDLENTAGLIST</b><br />
Type: `int`<br />

If the number of tags in a document grows beyond the `threshold_len_tag_list`, your Tyk Pump will throw a warning. This works for the MongoDB aggregate pump. The warning will print the top 5 common tag prefix. The Default value is 1000. To disable alerts set it to -1.

### enable_separate_analytics_store
EV: <b>TYK_MDCB_ENABLESEPERATEANALYTICSSTORE</b><br />
Type: `bool`<br />

Set this to `true` if you are using a separate analytic storage in your master Tyk Gateway. If `forward_analytics_to_pump` is set to `true`, it will forward the analytics to the separated storage specified in `analytics_storage`.

### analytics_storage
This section describes your separated analytic Redis DB. It has the same fields as `storage`. It requires `enable_separate_analytics_store` to be set to `true`.

### analytics_storage.type
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_TYPE</b><br />
Type: `string`<br />

Currently, the only storage type supported is Redis.

### analytics_storage.host
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_HOST</b><br />
Type: `string`<br />

Hostname of your Redis server

### analytics_storage.port
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_PORT</b><br />
Type: `int`<br />

The port the Redis server is listening on.

### analytics_storage.master_name
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_MASTERNAME</b><br />
Type: `string`<br />

This defines the Redis Sentinel master name

### analytics_storage.sentinel_password
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_SENTINELPASSWORD</b><br />
Type: `string`<br />

If set, Redis Sentinel will authenticate using this password.

### analytics_storage.username
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_USERNAME</b><br />
Type: `string`<br />

If set, a Redis connection will be established with this user. If not set then it will connect using the default Redis user

### analytics_storage.password
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_PASSWORD</b><br />
Type: `string`<br />

Optional auth password for Redis db

### analytics_storage.database
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_DATABASE</b><br />
Type: `int`<br />

By default, the database is 0. Setting the database is not supported with Redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.

### analytics_storage.optimisation_max_idle
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_MAXIDLE</b><br />
Type: `int`<br />

MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.

### analytics_storage.optimisation_max_active
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_MAXACTIVE</b><br />
Type: `int`<br />

In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.

### analytics_storage.enable_cluster
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_ENABLECLUSTER</b><br />
Type: `bool`<br />

If you are using Redis cluster, enable it here to enable the slots mode.

### analytics_storage.hosts
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_HOSTS</b><br />
Type: `map[string]string`<br />

Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}`

### analytics_storage.addrs
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_ADDRS</b><br />
Type: `[]string`<br />

This can be either a single address or a seed list of host:port addresses of cluster/sentinel nodes. It overrides the value of hosts.

### analytics_storage.redis_use_ssl
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_REDISUSESSL</b><br />
Type: `bool`<br />

If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)

### analytics_storage.redis_ssl_insecure_skip_verify
EV: <b>TYK_MDCB_ANALYTICSSTORAGE_REDISSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

### log_level
EV: <b>TYK_MDCB_LOGLEVEL</b><br />
Type: `string`<br />

You can now set a logging level (log_level). The following levels can be set: debug, info, warn, error.
If not set or left empty, it will default to `info`.

### enable_key_logging
EV: <b>TYK_MDCB_ENABLEKEYLOGGING</b><br />
Type: `bool`<br />

If set to `true`, this prints the unhashed keys without obfuscating them in the logs

### sync_worker_config
The configuration of the synchronisation worker

### sync_worker_config.enabled
EV: <b>TYK_MDCB_SYNCWORKER_ENABLED</b><br />
Type: `bool`<br />

Enable the synchronisation worker

### sync_worker_config.hash_keys
EV: <b>TYK_MDCB_SYNCWORKER_HASHKEYS</b><br />
Type: `bool`<br />

Allows the worker to synchronise hashed API keys. Set this to true if `hash_keys` is true in your Tyk Dashboard and Gateway configuration.

### sync_worker_config.max_batch_size
EV: <b>TYK_MDCB_SYNCWORKER_MAXBATCHSIZE</b><br />
Type: `int`<br />

The maximum amount of keys that we can fetch per batch. Default value: 1000 keys per batch.

### sync_worker_config.time_between_batches
EV: <b>TYK_MDCB_SYNCWORKER_TIMEBETWEENBATCHES</b><br />
Type: `int`<br />

Specifies a cooldown time between batches in seconds. 0 / disabled by default.

### sync_worker_config.max_workers
EV: <b>TYK_MDCB_SYNCWORKER_MAXWORKERS</b><br />
Type: `int`<br />

To specify the maximum number of groups that can be synced at the same time without affecting the operation of MDCB. It is set to 1000 by default. We recommend only modifying this value if you require more org syncing at the same time.

