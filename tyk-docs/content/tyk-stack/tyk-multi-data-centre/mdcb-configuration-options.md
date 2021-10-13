---
title: MDCB Configuration options
weight: 1
menu:
    main: 
        parent: "Tyk Multi Data Centre"
url: /tyk-multi-data-centre/mdcb-configuration-options/
---

## Tyk MDCB Configuration

The Tyk MDCB server is configured primarily via the `tyk_sink.conf` file, this file resides in `/opt/tyk-sink` on most systems, but can also live anywhere and be directly targeted with the `-c` flag.

### Environment Variables

Environment variables (env var) can be used to override the settings defined in the configuration file. Where an environment variable is specified, its value will take precedence over the value in the configuration file.

### Default Ports

| Application             | Port           |
|-------------------------|----------------|
|MongoDB                  |      27017     |
|Redis                    |      6379      |
|**Tyk Dashboard**        |                |
|Developer Portal         |      3000      |
|Admin Dashboard          |      3000      |
|Admin Dashboard API      |      3000      |
|**Tyk Gateway**          |                |
|Management API           |      8080      |
|**MDCB**                 |                |
|RPC Listen               |      9091      |
|Healthcheck              |      8181      |


### Configuration Reference

### listen_port

EV: **TYK_MDCB_LISTENPORT**<br />
Type: `int`<br />

The rpc port which worker gateways will connect to. Open this port to accept connections via your firewall.<br>If this value is not set, the MDCB application will apply a default value of 9091.

### healthcheck_port

EV: **TYK_MDCB_HEALTHCHECKPORT**<br />
Type: `int`<br />

This port lets MDCB allow standard health checks.<br>If this value is not set, the MDCB component will apply a default value of 8181.

### enable_http_profiler

EV: **TYK_MDCB_HTTPPROFILE**<br />
Type: `bool`<br />

### enable_http_profiler

EV: **TYK_MDCB_HTTPPROFILE**<br />
Type: `bool`<br />

Enable debugging of your Tyk MDCB by exposing profiling information.
	
### server_options.use_ssl

EV: **TYK_MDCB_SERVEROPTIONS_USESSL**<br />
Type: `bool`<br />

If use_ssl is set to true, you need to enter the cert_file and key_file path names for certificate.

### server_options.min_version

EV: **TYK_MDCB_SERVEROPTIONS_MINVERSION**<br />
Type: `int`<br />

The `min_version` setting should be the minimum TLS protocol version required from the client.<br> For TLS 1.0 use 769<br>For TLS 1.1 use 770<br>For TLS 1.2 use 771<br>For TLS 1.3 use 772

### server_options.certificate.cert_file

EV: **TYK_MDCB_SERVEROPTIONS_CERTIFICATE_CERTFILE**<br />
Type: `string`<br />

Filesystem location for pem encoded certificate

### server_options.certificate.key_file

EV: **TYK_MDCB_SERVEROPTIONS_CERTIFICATE_KEYFILE**<br />
Type: `string`<br />

Filesystem location for pem encoded private key

### server_options.ssl_ciphers

EV: **TYK_MDCB_SERVEROPTIONS_CIPHERS**<br />
Type: `list`<br />
Example: `export TYK_MDCB_SERVEROPTIONS_CIPHERS="TLS_RSA_WITH_RC4_128_SHA,TLS_RSA_WITH_AES_128_CBC_SHA256"'

Is the list of names supported cipher suites (IANA) for TLS versions up to TLS 1.2. This defaults to a list of secure cipher suites.

### storage

Type: `object`<br />

This section describes your centralised Redis DB. This will act as your master key store for all of your clusters.

### storage.type

EV: **TYK_MDCB_STORAGE_TYPE**<br />
Type: `string`<br />

Currently, the only storage type supported is Redis.

### storage.host

EV: **TYK_MDCB_STORAGE_HOST**<br />
Type: `string`<br />

Hostname of your Redis server

### storage.port

EV: **TYK_MDCB_STORAGE_PORT**<br />
Type: `int`<br />

The port the Redis server is listening on.

### storage.password

EV: **TYK_MDCB_STORAGE_PASSWORD**<br />
Type: `string`<br />

Optional auth password for Redis db

### storage.database

EV: **TYK_MDCB_STORAGE_DATABASE**<br />
Type: `int`<br />

By default, the database is 0. Setting the database is not supported with redis cluster. As such, if you have `storage.redis_cluster:true`, then this value should be omitted or explicitly set to 0.

### storage.optimisation_max_idle

EV: **TYK_MDCB_STORAGE_MAXIDLE**<br />
Type: `int`<br />

MDCB will open a pool of connections to Redis. This setting will configure how many connections are maintained in the pool when idle (no traffic). Set the `max_idle` value to something large, we usually leave it at around 2000 for HA deployments.

### storage.optimisation_max_active

EV: **TYK_MDCB_STORAGE_MAXACTIVE**<br />
Type: `int`<br />

In order to not over commit connections to the Redis server, we may limit the total number of active connections to Redis. We recommend for production use to set this to around 4000.

### storage.enable_cluster

EV: **TYK_MDCB_STORAGE_ENABLECLUSTER**<br />
Type: `bool`<br />

If you are using Redis cluster, enable it here to enable the slots mode.

### storage.hosts

EV: **TYK_MDCB_STORAGE_HOSTS**<br />
Type: `object`<br />

Add your Redis hosts here as a map of hostname:port. This field is required when storage.enable_cluster is set to true. example:<br>`{`<br>  `"server1": "6379",`<br>  `"server2": "6380",`<br>  `"server3": "6381"`<br>`}` 

### storage.redis_use_ssl

EV: **TYK_MDCB_STORAGE_REDISUSESSL**<br />
Type: `bool`<br />

If set, MDCB will assume the connection to Redis is encrypted. (use with Redis providers that support in-transit encryption)

### storage.redis_ssl_insecure_skip_verify

EV: **TYK_MDCB_STORAGE_REDISSSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

Allows usage of self-signed certificates when connecting to an encrypted Redis database.

### storage.master_name

EV: **TYK_MDCB_STORAGE_MASTERNAME**<br />
Type: `string`<br />

It defines the sentinel master name

### storage.sentinel_password

EV: **TYK_MDCB_STORAGE_SENTINELPASSWORD**<br />
Type: `string`<br />

If set, redis sentinel will authenticate using this password.

### storage.username

EV: **TYK_MDCB_STORAGE_USERNAME**<br />
Type: `string`<br />

If set, a redis connection will be established with this user. If not set then it will defaults to the default redis user

### storage.addrs

EV: **TYK_MDCB_STORAGE_ADDRS**<br />
Type: `list`<br />

It can be either a single address or a seed list of host:port addresses of cluster/sentinel nodes. It overrides the value of hosts.

### storage.master_name

EV: **TYK_MDCB_STORAGE_SENTINELPASSWORD**<br />
Type: `string`<br />

### storage.master_name

EV: **TYK_MDCB_STORAGE_SENTINELPASSWORD**<br />
Type: `string`<br />

### security

Type: `object`<br />

### security.private_certificate_encoding_secret

EV: **TYK_MDCB_SECURITY_PRIVATECERTIFICATEENCODINGSECRET**<br />
Type: `string`<br />

Allows MDCB to use Mutual TLS. This requires that `server_options.use_ssl` is set to true. See [Mutual TLS](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/#a-name-mdcb-a-mdcb) for more details.

### hash_keys

EV: **TYK_MDCB_HASHKEYS**<br />
Type: `bool`<br />

Set to true if you are using a hashed configuration installation of Tyk, otherwise set to false.

### session_timeout

EV: **TYK_MDCB_SESSIONTIMEOUT**<br />
Type: `int`<br />

Number of seconds before the gateways are forced to re-login. Default is 86400 (24 hours).

### forward_analytics_to_pump

EV: **TYK_MDCB_FORWARDANALYTICSTOPUMP**<br />
Type: `bool`<br />

Instead of sending analytics directly to MongoDB, MDCB can send analytics to Redis. This will allow [tyk-pump] (https://github.com/TykTechnologies/tyk-pump) to pull analytics from Redis and send to your own data sinks.

### enable_multiple_analytics_keys

EV: **TYK_MDCB_ENABLEMULTIPLEANALYTICSKEYS**<br />
Type: `bool`<br />

Instead of saving all the analytics in one key, this will enable to save the analytics in multiple keys. It's specially useful when you are using Redis cluster. This will work only if `forward_analytics_to_pump` is true and tyk-pump is v1.2.1+ .

### ignore_tag_prefix_list

EV: **TYK_MDCB_IGNORETAGPREFIXLIST**<br />
Type: `String Array`<br />

If custom analytics tags are used (`tag_header`), you may disable generating aggregate analytics for these tags. E.g.<br>`["Request-Id", "Secret-Key"]` will stop aggregating data for headers that *starts* with `Request-Id*` and `Secret-Key*`. <br> This field is replacing  `aggregates_ignore_tags` which is now deprecated

### enable_separate_analytics_store

EV: **TYK_MDCB_ENABLESEPERATEANALYTICSSTORE**<br />
Type: `bool`<br />

Set it to true if you are using a separated analytic storage in the master gateway. If `forward_analytics_to_pump` is true, it will forward the analytics to the separated storage specified in `analytics_storage`.

### analytics_storage

Type: `object`<br />

This section describes your separated analytic Redis DB. It has the same fields as `storage`. It requires `enable_separate_analytics_store` set to true. 

### analytics_storage.type

EV: **TYK_MDCB_ANALYTICSSTORAGE_TYPE**<br />
Type: `string`<br />

### analytics_storage.host

EV: **TYK_MDCB_ANALYTICSSTORAGE_HOST**<br />
Type: `string`<br />

### analytics_storage.hosts

EV: **TYK_MDCB_ANALYTICSSTORAGE_HOSTS**<br />
Type: `map`<br />
Example: `export TYK_MDCB_ANALYTICSSTORAGE_HOSTS="host1:port1,host2:port2""`

### analytics_storage.port

EV: **TYK_MDCB_ANALYTICSSTORAGE_PORT**<br />
Type: `int`<br />

### analytics_storage.master_name

EV: **TYK_MDCB_ANALYTICSSTORAGE_MASTERNAME**<br />
Type: `string`<br />

### analytics_storage.sentinel_password

EV: **TYK_MDCB_ANALYTICSSTORAGE_SENTINELPASSWORD**<br />
Type: `string`<br />

### analytics_storage.username

EV: **TYK_MDCB_ANALYTICSSTORAGE_USERNAME**<br />
Type: `string`<br />

### analytics_storage.password

EV: **TYK_MDCB_ANALYTICSSTORAGE_PASSWORD**<br />
Type: `string`<br />

### analytics_storage.database

EV: **TYK_MDCB_ANALYTICSSTORAGE_DATABASE**<br />
Type: `int`<br />

### analytics_storage.optimisation_max_idle

EV: **TYK_MDCB_ANALYTICSSTORAGE_MAXIDLE**<br />
Type: `int`<br />

### analytics_storage.optimisation_max_active

EV: **TYK_MDCB_ANALYTICSSTORAGE_MAXACTIVE**<br />
Type: `int`<br />

### analytics_storage.enable_cluster

EV: **TYK_MDCB_ANALYTICSSTORAGE_ENABLECLUSTER**<br />
Type: `bool`<br />

### analytics_storage.addrs

EV: **TYK_MDCB_ANALYTICSSTORAGE_ADDRS**<br />
Type: `array`<br />
Example: `export TYK_MDCB_ANALYTICSSTORAGE_ADDRS="addr1,addr2""`

### analytics_storage.redis_use_ssl

EV: **TYK_MDCB_ANALYTICSSTORAGE_REDISUSESSL**<br />
Type: `bool`<br />

### analytics_storage.redis_ssl_insecure_skip_verify

EV: **TYK_MDCB_ANALYTICSSTORAGE_REDISSSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

### analytics_storage.debug

EV: **TYK_MDCB_ANALYTICSSTORAGE_DEBUG**<br />
Type: `bool`<br />

### analytics

Type: `object`<br />

### analytics.mongo_url

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOURL**<br />
Type: `string`<br />

Connection string for MongoDB.

### analytics.mongo_use_ssl

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOUSESSL**<br />
Type: `string`<br />

A Boolean setting for Mongo SSL support. Set to true to enable SSL.

### analytics.mongo_ssl_insecure_skip_verify

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLINSECURESKIPVERIFY**<br />
Type: `string`<br />

This setting allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### analytics.mongo_ssl_allow_invalid_hostnames

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLALLOWINVALIDHOSTNAMES**<br />
Type: `string`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling). The rest of the TLS verification will still be performed

### analytics.mongo_ssl_ca_file

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLCAFILE**<br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### analytics.mongo_ssl_pem_keyfile

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSSLPEMKEYFILE**<br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is required for Mutual TLS.

### analytics.mongo_batch_size

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOBATCHSIZE**<br />
Type: `string`<br />

Sets the batch size for mongo results.

### analytics.mongo_session_consistency

EV: **TYK_MDCB_ANALYTICSCONFIG_MONGOSESSIONCONSISTENCY**<br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The valid values are:
- eventual
- monotonic

### dont_store_selective

EV: **TYK_MDCB_DONTSTORESELECTIVE**<br />
Type: `bool`<br />

### dont_store_aggregate

EV: **TYK_MDCB_DONTSTOREAGGREGATES**<br />
Type: `bool`<br />

### org_session_expiration

EV: **TYK_MDCB_ORGCACHEEXPIRATION**<br />
Type: `int`<br />

Sets the organization cache expiration in minutes. By default, 60 minutes. This will only work with tyk-sink 1.9+

### org_session_cleanup

EV: **TYK_MDCB_ORGCACHECLEANUP**<br />
Type: `int`<br />

Sets the organization cache cleanup interval in minutes. By default, 60 minutes. This will only work with tyk-sink 1.9+.

### aggregates_ignore_tags

EV: **TYK_MDCB_AGGREGATESIGNORETAGS**<br />
Type: `list`<br />

### track_all_paths

EV: **TYK_MDCB_TRACKALLPATHS**<br />
Type: `bool`<br />

### store_analytics_per_minute

EV: **TYK_MDCB_STOREANALYTICSPERMINUTE**<br />
Type: `true`<br />

### threshold_len_tag_list

EV: **TYK_MDCB_THRESHOLDLENTAGLIST**<br />
Type: `int`<br />

### license

EV: **TYK_MDCB_LICENSE**### dont_store_selective<br />
Type: `string`<br />### dont_store_selective

Enter your license in this section so MDCB can start.