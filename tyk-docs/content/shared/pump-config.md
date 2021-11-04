### purge_delay
EV: **TYK_PMP_PURGEDELAY**<br />
Type: `int`<br />

The number of seconds the Pump waits between checking for analytics data and purge it from
Redis.

### purge_chunk
EV: **TYK_PMP_PURGECHUNK**<br />
Type: `int64`<br />

The maximum number of records to pull from Redis at a time. If it's unset or `0`, all the
analytics records in Redis are pulled. If it's set, `storage_expiration_time` is used to
reset the analytics record TTL.

### storage_expiration_time
EV: **TYK_PMP_STORAGEEXPIRATIONTIME**<br />
Type: `int64`<br />

The number of seconds for the analytics records TTL. It only works if `purge_chunk` is
enabled. Defaults to `60` seconds.

### dont_purge_uptime_data
EV: **TYK_PMP_DONTPURGEUPTIMEDATA**<br />
Type: `bool`<br />

Setting this to `false` will create a pump that pushes uptime data to Uptime Pump, so the
Dashboard can read it. Disable by setting to `true`.

### uptime_pump_config.mongo_url
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL**<br />
Type: `string`<br />

#### Mongo Uptime Pump
In `uptime_pump_config` you can configure a mongo uptime pump. By default, the uptime pump
is going to be `mongo` type, so it's not necessary to specify it here. The minimum required
configurations for uptime pumps are:

* `collection_name` - That determines the uptime collection name in mongo. By default,
`tyk_uptime_analytics`.
* `mongo_url` - The uptime pump mongo connection url. It is usually something like
"mongodb://username:password@{hostname:port},{hostname:port}/{db_name}".

### uptime_pump_config.collection_name
EV: **TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME**<br />
Type: `string`<br />

[ADD COMMENT]

### uptime_pump_config.max_insert_batch_size_bytes
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MAXINSERTBATCHSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### uptime_pump_config.max_document_size_bytes
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MAXDOCUMENTSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### uptime_pump_config.collection_cap_max_size_bytes
EV: **TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONCAPMAXSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### uptime_pump_config.collection_cap_enable
EV: **TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONCAPENABLE**<br />
Type: `bool`<br />

[ADD COMMENT]

### uptime_pump_config.type
EV: **TYK_PMP_UPTIMEPUMPCONFIG_TYPE**<br />
Type: `string`<br />

#### SQL Uptime Pump
*Supported in Tyk Pump v1.5.0+*

In `uptime_pump_config` you can configure a SQL uptime pump. To do that, you need to add the
field `uptime_type` with `sql` value. You can also use different types of SQL Uptime pumps,
like `postgres` or `sqlite` using the `type` field. 

An example of a SQL Postgres uptime pump would be:
```{.json}
"uptime_pump_config": {
    "uptime_type": "sql",
    "type": "postgres",
    "connection_string": "host=sql_host port=sql_port user=sql_usr dbname=dbname password=sql_pw",
    "table_sharding": false
},
```

Take into account that you can also set `log_level` field into the `uptime_pump_config` to `debug`,
`info` or `warning`. By default, the SQL logger verbosity is `silent`.
The supported and tested types are `mysql` and `postgres`. [VALIDATE]

### uptime_pump_config.connection_string
EV: **TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING**<br />
Type: `string`<br />

Specifies the connection string to the database.

### uptime_pump_config.postgres
EV: **TYK_PMP_UPTIMEPUMPCONFIG_POSTGRES**<br />
Type: `PostgresConfig`<br />

Postgres configurations.

### uptime_pump_config.postgres.prefer_simple_protocol
EV: **TYK_PMP_UPTIMEPUMPCONFIG_POSTGRES_PREFERSIMPLEPROTOCOL**<br />
Type: `bool`<br />

Disables implicit prepared statement usage.

### uptime_pump_config.mysql
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MYSQL**<br />
Type: `MysqlConfig`<br />

Mysql configurations.

### uptime_pump_config.uptime_type
EV: **TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE**<br />
Type: `string`<br />

Determines the uptime type. Options are `mongo` and `sql`. Defaults to `mongo`.

### pumps
The default environment variable prefix for each pump follows this format:
`TYK_PMP_PUMPS_{PUMP-NAME}_`, for example `TYK_PMP_PUMPS_KAFKA_`.

You can also set custom names for each pump specifying the pump type. For example, if you
want a Kafka pump which is called `PROD` you need to create `TYK_PMP_PUMPS_PROD_TYPE=kafka`
and configure it using the `TYK_PMP_PUMPS_PROD_` prefix.

### pumps.{PMP_NAME}.name
EV: **TYK_PMP_PUMPS_{PMP_NAME}_NAME**<br />
Type: `string`<br />

Deprecated.

### pumps.{PMP_NAME}.type
EV: **TYK_PMP_PUMPS_{PMP_NAME}_TYPE**<br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.
For more information please see the (pumps)[#pumps] sections.

### pumps.{PMP_NAME}.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.{PMP_NAME}.timeout
EV: **TYK_PMP_PUMPS_{PMP_NAME}_TIMEOUT**<br />
Type: `int`<br />

You can configure a different timeout for each pump with the configuration option `timeout`.
Its default value is `0` seconds, which means that the pump will wait for the writing
operation forever. 

An example of this configuration would be:
```{.json}
"mongo": {
  "type": "mongo",
  "timeout":5,
  "meta": {
    "collection_name": "tyk_analytics",
    "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
  }
}
```

In case that any pump doesn't have a configured timeout, and it takes more seconds to write
than the value configured for the purge loop in the `purge_delay` config option, you will
see the following warning message: `Pump PMP_NAME is taking more time than the value
configured of purge_delay. You should try to set a timeout for this pump.`. 

In case that you have a configured timeout, but it still takes more seconds to write than
the value configured for the purge loop in the `purge_delay` config option, you will see the
following warning message: `Pump PMP_NAME is taking more time than the value configured of
purge_delay. You should try lowering the timeout configured for this pump.`. 

### pumps.{PMP_NAME}.omit_detailed_recording
EV: **TYK_PMP_PUMPS_{PMP_NAME}_OMITDETAILEDRECORDING**<br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.{PMP_NAME}.max_record_size
EV: **TYK_PMP_PUMPS_{PMP_NAME}_MAXRECORDSIZE**<br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.CSV.meta.csv_dir
EV: **TYK_PMP_PUMPS_CSV_META_CSVDIR**<br />
Type: `string`<br />

The directory where the CSV will be stored. [VALIDATE]

### pumps.DogStatsd.meta.namespace
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_NAMESPACE**<br />
Type: `string`<br />

Prefix for your metrics to datadog.

### pumps.DogStatsd.meta.address
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_ADDRESS**<br />
Type: `string`<br />

Address of the datadog agent including host & port.

### pumps.DogStatsd.meta.sample_rate
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_SAMPLERATE**<br />
Type: `float64`<br />

Defaults to `1` which equates to `100%` of requests. To sample at `50%`, set to `0.5`.

### pumps.DogStatsd.meta.async_uds
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_ASYNCUDS**<br />
Type: `bool`<br />

Enable async UDS over UDP https://github.com/Datadog/datadog-go#unix-domain-sockets-client.

### pumps.DogStatsd.meta.async_uds_write_timeout_seconds
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_ASYNCUDSWRITETIMEOUT**<br />
Type: `int`<br />

Integer write timeout in seconds if `async_uds: true`.

### pumps.DogStatsd.meta.buffered
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_BUFFERED**<br />
Type: `bool`<br />

Enable buffering of messages.

### pumps.DogStatsd.meta.buffered_max_messages
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_BUFFEREDMAXMESSAGES**<br />
Type: `int`<br />

Max messages in single datagram if `buffered: true`. Default 16.

### pumps.DogStatsd.meta.tags
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_TAGS**<br />
Type: `[]string`<br />

List of tags to be added to the metric. The possible options are listed in the below example.

If no tag is specified the fallback behavior is to use the below tags:
- `path`
- `method`
- `response_code`
- `api_version`
- `api_name`
- `api_id`
- `org_id`
- `tracked`
- `oauth_id`

Note that this configuration can generate significant charges due to the unbound nature of
the `path` tag.

```{.json}
"dogstatsd": {
  "type": "dogstatsd",
  "meta": {
    "address": "localhost:8125",
    "namespace": "pump",
    "async_uds": true,
    "async_uds_write_timeout_seconds": 2,
    "buffered": true,
    "buffered_max_messages": 32,
    "sample_rate": 0.5,
    "tags": [
      "method",
      "response_code",
      "api_version",
      "api_name",
      "api_id",
      "org_id",
      "tracked",
      "path",
      "oauth_id"
    ]
  }
},
```

On startup, you should see the loaded configs when initializing the dogstatsd pump
```
[May 10 15:23:44]  INFO dogstatsd: initializing pump
[May 10 15:23:44]  INFO dogstatsd: namespace: pump.
[May 10 15:23:44]  INFO dogstatsd: sample_rate: 50%
[May 10 15:23:44]  INFO dogstatsd: buffered: true, max_messages: 32
[May 10 15:23:44]  INFO dogstatsd: async_uds: true, write_timeout: 2s
```

### pumps.Elasticsearch.meta.index_name
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_INDEXNAME**<br />
Type: `string`<br />

The name of the index that all the analytics data will be placed in. Defaults to
"tyk_analytics".

### pumps.Elasticsearch.meta.elasticsearch_url
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_ELASTICSEARCHURL**<br />
Type: `string`<br />

If sniffing is disabled, the URL that all data will be sent to. Defaults to
"http://localhost:9200".

### pumps.Elasticsearch.meta.use_sniffing
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_ENABLESNIFFING**<br />
Type: `bool`<br />

If sniffing is enabled, the "elasticsearch_url" will be used to make a request to get a
list of all the nodes in the cluster, the returned addresses will then be used. Defaults to
`false`.

### pumps.Elasticsearch.meta.document_type
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_DOCUMENTTYPE**<br />
Type: `string`<br />

The type of the document that is created in ES. Defaults to "tyk_analytics".

### pumps.Elasticsearch.meta.rolling_index
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_ROLLINGINDEX**<br />
Type: `bool`<br />

Appends the date to the end of the index name, so each days data is split into a different
index name. E.g. tyk_analytics-2016.02.28. Defaults to `false`.

### pumps.Elasticsearch.meta.extended_stats
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_EXTENDEDSTATISTICS**<br />
Type: `bool`<br />

If set to `true` will include the following additional fields: Raw Request, Raw Response and
User Agent.

### pumps.Elasticsearch.meta.generate_id
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_GENERATEID**<br />
Type: `bool`<br />

When enabled, generate _id for outgoing records. This prevents duplicate records when
retrying ES. [VALIDATE]

### pumps.Elasticsearch.meta.decode_base64
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_DECODEBASE64**<br />
Type: `bool`<br />

Allows for the base64 bits to be decode before being passed to ES.

### pumps.Elasticsearch.meta.version
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_VERSION**<br />
Type: `string`<br />

Specifies the ES version. Use "3" for ES 3.X, "5" for ES 5.X, "6" for ES 6.X, "7" for ES
7.X . Defaults to "3".

### pumps.Elasticsearch.meta.disable_bulk
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_DISABLEBULK**<br />
Type: `bool`<br />

Disable batch writing. Defaults to false.

### pumps.Elasticsearch.meta.bulk_config
Batch writing trigger configuration. Each option is an OR with eachother:

### pumps.Elasticsearch.meta.bulk_config.workers
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_WORKERS**<br />
Type: `int`<br />

Number of workers. Defaults to 1.

### pumps.Elasticsearch.meta.bulk_config.flush_interval
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_FLUSHINTERVAL**<br />
Type: `int`<br />

Specifies the time in seconds to flush the data and send it to ES. Default disabled.

### pumps.Elasticsearch.meta.bulk_config.bulk_actions
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_BULKACTIONS**<br />
Type: `int`<br />

Specifies the number of requests needed to flush the data and send it to ES. Defaults to
1000 requests. If it is needed, can be disabled with -1.

### pumps.Elasticsearch.meta.bulk_config.bulk_size
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_BULKSIZE**<br />
Type: `int`<br />

Specifies the size (in bytes) needed to flush the data and send it to ES. Defaults to 5MB.
If it is needed, can be disabled with -1.

### pumps.Elasticsearch.meta.auth_api_key_id
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_AUTHAPIKEYID**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Elasticsearch.meta.auth_api_key
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_AUTHAPIKEY**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Elasticsearch.meta.auth_basic_username
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_USERNAME**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Elasticsearch.meta.auth_basic_password
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_PASSWORD**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Graylog.meta.host
EV: **TYK_PMP_PUMPS_GRAYLOG_META_GRAYLOGHOST**<br />
Type: `string`<br />

Graylog host.

### pumps.Graylog.meta.port
EV: **TYK_PMP_PUMPS_GRAYLOG_META_GRAYLOGPORT**<br />
Type: `int`<br />

Graylog port.

### pumps.Graylog.meta.tags
EV: **TYK_PMP_PUMPS_GRAYLOG_META_TAGS**<br />
Type: `[]string`<br />

List of tags to be added to the metric. The possible options are listed in the below example.

If no tag is specified the fallback behavior is to use the below tags:
- `path`
- `method`
- `response_code`
- `api_version`
- `api_name`
- `api_id`
- `org_id`
- `tracked`
- `oauth_id` [VALIDATE]

### pumps.Influx.meta.database_name
EV: **TYK_PMP_PUMPS_INFLUX_META_DATABASENAME**<br />
Type: `string`<br />

InfluxDB pump database name.

### pumps.Influx.meta.address
EV: **TYK_PMP_PUMPS_INFLUX_META_ADDR**<br />
Type: `string`<br />

InfluxDB pump host.

### pumps.Influx.meta.username
EV: **TYK_PMP_PUMPS_INFLUX_META_USERNAME**<br />
Type: `string`<br />

InfluxDB pump database username. [VALIDATE]

### pumps.Influx.meta.password
EV: **TYK_PMP_PUMPS_INFLUX_META_PASSWORD**<br />
Type: `string`<br />

InfluxDB pump database password. [VALIDATE]

### pumps.Influx.meta.fields
EV: **TYK_PMP_PUMPS_INFLUX_META_FIELDS**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.Influx.meta.tags
EV: **TYK_PMP_PUMPS_INFLUX_META_TAGS**<br />
Type: `[]string`<br />

List of tags to be added to the metric. The possible options are listed in the below example.

If no tag is specified the fallback behavior is to use the below tags:
- `path`
- `method`
- `response_code`
- `api_version`
- `api_name`
- `api_id`
- `org_id`
- `tracked`
- `oauth_id` [VALIDATE]

### pumps.Kafka.meta.broker
EV: **TYK_PMP_PUMPS_KAFKA_META_BROKER**<br />
Type: `[]string`<br />

The list of brokers used to discover the partitions available on the kafka cluster. E.g.
"localhost:9092".

### pumps.Kafka.meta.client_id
EV: **TYK_PMP_PUMPS_KAFKA_META_CLIENTID**<br />
Type: `string`<br />

Unique identifier for client connections established with Kafka.

### pumps.Kafka.meta.topic
EV: **TYK_PMP_PUMPS_KAFKA_META_TOPIC**<br />
Type: `string`<br />

The topic that the writer will produce messages to.

### pumps.Kafka.meta.timeout
EV: **TYK_PMP_PUMPS_KAFKA_META_TIMEOUT**<br />
Type: `time.Duration`<br />

Timeout is the maximum amount of time will wait for a connect or write to complete.

### pumps.Kafka.meta.compressed
EV: **TYK_PMP_PUMPS_KAFKA_META_COMPRESSED**<br />
Type: `bool`<br />

Enable "github.com/golang/snappy" codec to be used to compress Kafka messages. By default
is `false`.

### pumps.Kafka.meta.meta_data
EV: **TYK_PMP_PUMPS_KAFKA_META_METADATA**<br />
Type: `map[string]string`<br />

Can be used to set custom metadata inside the kafka message.

### pumps.Kafka.meta.use_ssl
EV: **TYK_PMP_PUMPS_KAFKA_META_USESSL**<br />
Type: `bool`<br />

Enables SSL connection.

### pumps.Kafka.meta.ssl_insecure_skip_verify
EV: **TYK_PMP_PUMPS_KAFKA_META_SSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

Controls whether the pump client verifies the kafka server's certificate chain and host
name.

### pumps.Kafka.meta.ssl_cert_file
EV: **TYK_PMP_PUMPS_KAFKA_META_SSLCERTFILE**<br />
Type: `string`<br />

Can be used to set custom certificate file for authentication with kafka.

### pumps.Kafka.meta.ssl_key_file
EV: **TYK_PMP_PUMPS_KAFKA_META_SSLKEYFILE**<br />
Type: `string`<br />

Can be used to set custom key file for authentication with kafka.

### pumps.Kafka.meta.sasl_mechanism
EV: **TYK_PMP_PUMPS_KAFKA_META_SASLMECHANISM**<br />
Type: `string`<br />

SASL mechanism configuration - standard mechanism names are listed
(here)[https://www.iana.org/assignments/sasl-mechanisms/sasl-mechanisms.xhtml]. [VALIDATE]

### pumps.Kafka.meta.sasl_username
EV: **TYK_PMP_PUMPS_KAFKA_META_USERNAME**<br />
Type: `string`<br />

SASL username.

### pumps.Kafka.meta.sasl_password
EV: **TYK_PMP_PUMPS_KAFKA_META_PASSWORD**<br />
Type: `string`<br />

SASL password.

### pumps.Kafka.meta.sasl_algorithm
EV: **TYK_PMP_PUMPS_KAFKA_META_ALGORITHM**<br />
Type: `string`<br />

SASL algorithm.

### pumps.Logzio.meta.check_disk_space
EV: **TYK_PMP_PUMPS_LOGZIO_META_CHECKDISKSPACE**<br />
Type: `bool`<br />

Set the sender to check if it crosses the maximum allowed disk usage. Default value is
`true`.

### pumps.Logzio.meta.disk_threshold
EV: **TYK_PMP_PUMPS_LOGZIO_META_DISKTHRESHOLD**<br />
Type: `int`<br />

Set disk queue threshold, once the threshold is crossed the sender will not enqueue the
received logs. Default value is `98` (percentage of disk).

### pumps.Logzio.meta.drain_duration
EV: **TYK_PMP_PUMPS_LOGZIO_META_DRAINDURATION**<br />
Type: `string`<br />

Set drain duration (flush logs on disk). Default value is `3s`.

### pumps.Logzio.meta.queue_dir
EV: **TYK_PMP_PUMPS_LOGZIO_META_QUEUEDIR**<br />
Type: `string`<br />

The directory for the queue.

### pumps.Logzio.meta.token
EV: **TYK_PMP_PUMPS_LOGZIO_META_TOKEN**<br />
Type: `string`<br />

Token for sending data to your logzio account.

### pumps.Logzio.meta.url
EV: **TYK_PMP_PUMPS_LOGZIO_META_URL**<br />
Type: `string`<br />

If you do not want to use the default Logzio url i.e. when using a proxy. Default is
`https://listener.logz.io:8071`.

### pumps.Moesif.meta.application_id
EV: **TYK_PMP_PUMPS_MOESIF_META_APPLICATIONID**<br />
Type: `string`<br />

Moesif Application Id. You can find your Moesif Application Id from
[_Moesif Dashboard_](https://www.moesif.com/) -> _Top Right Menu_ -> _API Keys_ . Moesif
recommends creating separate Application Ids for each environment such as Production,
Staging, and Development to keep data isolated. 

### pumps.Moesif.meta.request_header_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_REQUESTHEADERMASKS**<br />
Type: `[]string`<br />

An option to mask a specific request header field.

### pumps.Moesif.meta.response_header_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_RESPONSEHEADERMASKS**<br />
Type: `[]string`<br />

An option to mask a specific response header field.

### pumps.Moesif.meta.request_body_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_REQUESTBODYMASKS**<br />
Type: `[]string`<br />

An option to mask a specific - request body field.

### pumps.Moesif.meta.response_body_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_RESPONSEBODYMASKS**<br />
Type: `[]string`<br />

An option to mask a specific response body field.

### pumps.Moesif.meta.disable_capture_request_body
EV: **TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTUREREQUESTBODY**<br />
Type: `bool`<br />

An option to disable logging of request body. Default value is `false`.

### pumps.Moesif.meta.disable_capture_response_body
EV: **TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTURERESPONSEBODY**<br />
Type: `bool`<br />

An option to disable logging of response body. Default value is `false`.

### pumps.Moesif.meta.user_id_header
EV: **TYK_PMP_PUMPS_MOESIF_META_USERIDHEADER**<br />
Type: `string`<br />

An optional field name to identify User from a request or response header.

### pumps.Moesif.meta.company_id_header
EV: **TYK_PMP_PUMPS_MOESIF_META_COMPANYIDHEADER**<br />
Type: `string`<br />

An optional field name to identify Company (Account) from a request or response header.

### pumps.Moesif.meta.enable_bulk
EV: **TYK_PMP_PUMPS_MOESIF_META_ENABLEBULK**<br />
Type: `bool`<br />

Set this to `true` to enable `bulk_config`.

### pumps.Moesif.meta.bulk_config
EV: **TYK_PMP_PUMPS_MOESIF_META_BULKCONFIG**<br />
Type: `map[string]interface{}`<br />

Batch writing trigger configuration.
  * `"event_queue_size"` - (optional) An optional field name which specify the maximum
number of events to hold in queue before sending to Moesif. In case of network issues when
not able to connect/send event to Moesif, skips adding new events to the queue to prevent
memory overflow. Type: int. Default value is `10000`.
  * `"batch_size"` - (optional) An optional field name which specify the maximum batch size
when sending to Moesif. Type: int. Default value is `200`.
  * `"timer_wake_up_seconds"` - (optional) An optional field which specifies a time (every n
seconds) how often background thread runs to send events to moesif. Type: int. Default value
is `2` seconds.

### pumps.Moesif.meta.authorization_header_name
EV: **TYK_PMP_PUMPS_MOESIF_META_AUTHORIZATIONHEADERNAME**<br />
Type: `string`<br />

An optional request header field name to used to identify the User in Moesif. Default value
is `authorization`.

### pumps.Moesif.meta.authorization_user_id_field
EV: **TYK_PMP_PUMPS_MOESIF_META_AUTHORIZATIONUSERIDFIELD**<br />
Type: `string`<br />

An optional field name use to parse the User from authorization header in Moesif. Default
value is `sub`.

### pumps.Mongo.meta.collection_name
EV: **TYK_PMP_PUMPS_MONGO_META_COLLECTIONNAME**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Mongo.meta.max_insert_batch_size_bytes
EV: **TYK_PMP_PUMPS_MONGO_META_MAXINSERTBATCHSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.Mongo.meta.max_document_size_bytes
EV: **TYK_PMP_PUMPS_MONGO_META_MAXDOCUMENTSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.Mongo.meta.collection_cap_max_size_bytes
EV: **TYK_PMP_PUMPS_MONGO_META_COLLECTIONCAPMAXSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.Mongo.meta.collection_cap_enable
EV: **TYK_PMP_PUMPS_MONGO_META_COLLECTIONCAPENABLE**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.MongoAggregate.meta.use_mixed_collection
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_USEMIXEDCOLLECTION**<br />
Type: `bool`<br />

If set to `true` your pump will store analytics to both your organisation defined
collections z_tyk_analyticz_aggregate_{ORG ID} and your org-less tyk_analytics_aggregates
collection. When set to 'false' your pump will only store analytics to your org defined
collection.

### pumps.MongoAggregate.meta.track_all_paths
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_TRACKALLPATHS**<br />
Type: `bool`<br />

Specifies if it should store aggregated data for all the endpoints. By default, `false`
which means that only store aggregated data for `tracked endpoints`.

### pumps.MongoAggregate.meta.ignore_tag_prefix_list
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_IGNORETAGPREFIXLIST**<br />
Type: `[]string`<br />

Specifies prefixes of tags that should be ignored.

### pumps.MongoAggregate.meta.threshold_len_tag_list
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_THRESHOLDLENTAGLIST**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.MongoAggregate.meta.store_analytics_per_minute
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_STOREANALYTICSPERMINUTE**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.MongoAggregate.meta.ignore_aggregations
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_IGNOREAGGREGATIONSLIST**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.MongoSelective.meta.max_insert_batch_size_bytes
EV: **TYK_PMP_PUMPS_MONGOSELECTIVE_META_MAXINSERTBATCHSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.MongoSelective.meta.max_document_size_bytes
EV: **TYK_PMP_PUMPS_MONGOSELECTIVE_META_MAXDOCUMENTSIZEBYTES**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.Prometheus.meta.listen_address
EV: **TYK_PMP_PUMPS_PROMETHEUS_META_ADDR**<br />
Type: `string`<br />

The full URL to your Prometheus instance, {HOST}:{PORT}. For example `localhost:9090`.

### pumps.Prometheus.meta.path
EV: **TYK_PMP_PUMPS_PROMETHEUS_META_PATH**<br />
Type: `string`<br />

The path to the Prometheus collection. For example `/metrics`.

### pumps.Splunk.meta.collector_token
EV: **TYK_PMP_PUMPS_SPLUNK_META_COLLECTORTOKEN**<br />
Type: `string`<br />

Address of the datadog agent including host & port.

### pumps.Splunk.meta.collector_url
EV: **TYK_PMP_PUMPS_SPLUNK_META_COLLECTORURL**<br />
Type: `string`<br />

Endpoint the Pump will send analytics too.  Should look something like:
`https://splunk:8088/services/collector/event`.

### pumps.Splunk.meta.ssl_insecure_skip_verify
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

Controls whether the pump client verifies the Splunk server's certificate chain and host name.

### pumps.Splunk.meta.ssl_cert_file
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLCERTFILE**<br />
Type: `string`<br />

SSL cert file location. [VALIDATE]

### pumps.Splunk.meta.ssl_key_file
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLKEYFILE**<br />
Type: `string`<br />

SSL cert key location. [VALIDATE]

### pumps.Splunk.meta.ssl_server_name
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLSERVERNAME**<br />
Type: `string`<br />

URL to Splunk server. [VALIDATE]

### pumps.Splunk.meta.obfuscate_api_keys
EV: **TYK_PMP_PUMPS_SPLUNK_META_OBFUSCATEAPIKEYS**<br />
Type: `bool`<br />

Controls whether the pump client should hide the API key. In case you still need substring
of the value, check the next option. Default value is `false`.

### pumps.Splunk.meta.obfuscate_api_keys_length
EV: **TYK_PMP_PUMPS_SPLUNK_META_OBFUSCATEAPIKEYSLENGTH**<br />
Type: `int`<br />

Define the number of the characters from the end of the API key. The `obfuscate_api_keys`
should be set to `true`. Default value is `0`.

### pumps.Splunk.meta.fields
EV: **TYK_PMP_PUMPS_SPLUNK_META_FIELDS**<br />
Type: `[]string`<br />

Define which Analytics fields should participate in the Splunk event. Check the available
fields in the example below. Default value is `["method",
"path", "response_code", "api_key", "time_stamp", "api_version", "api_name", "api_id",
"org_id", "oauth_id", "raw_request", "request_time", "raw_response", "ip_address"]`.

### pumps.Splunk.meta.ignore_tag_prefix_list
EV: **TYK_PMP_PUMPS_SPLUNK_META_IGNORETAGPREFIXLIST**<br />
Type: `[]string`<br />

Choose which tags to be ignored by the Splunk Pump. Keep in mind that the tag name and value
are hyphenated. Default value is `[]`.

### pumps.Splunk.meta.enable_batch
EV: **TYK_PMP_PUMPS_SPLUNK_META_ENABLEBATCH**<br />
Type: `bool`<br />

If this is set to `true`, pump is going to send the analytics records in batch to Splunk.
Default value is `false`.

### pumps.SQL.meta.type
EV: **TYK_PMP_PUMPS_SQL_META_TYPE**<br />
Type: `string`<br />

The supported and tested types are `mysql` and `postgres`. [VALIDATE]

### pumps.SQL.meta.connection_string
EV: **TYK_PMP_PUMPS_SQL_META_CONNECTIONSTRING**<br />
Type: `string`<br />

Specifies the connection string to the database.

### pumps.SQL.meta.postgres
Postgres configurations.

### pumps.SQL.meta.postgres.prefer_simple_protocol
EV: **TYK_PMP_PUMPS_SQL_META_POSTGRES_PREFERSIMPLEPROTOCOL**<br />
Type: `bool`<br />

Disables implicit prepared statement usage.

### pumps.SQL.meta.mysql
Mysql configurations.

### pumps.SQL.meta.table_sharding
EV: **TYK_PMP_PUMPS_SQL_META_TABLESHARDING**<br />
Type: `bool`<br />

Specifies if all the analytics records are going to be stored in one table or in multiple
tables (one per day). By default, `false`. If `false`, all the records are going to be
stored in `tyk_aggregated` table. Instead, if it's `true`, all the records of the day are
going to be stored in `tyk_aggregated_YYYYMMDD` table, where `YYYYMMDD` is going to change
depending on the date.

### pumps.SQL.meta.log_level
EV: **TYK_PMP_PUMPS_SQL_META_LOGLEVEL**<br />
Type: `string`<br />

Specifies the SQL log verbosity. The possible values are: `info`,`error` and `warning`. By
default, the value is `silent`, which means that it won't log any SQL query.

### pumps.SQL.meta.batch_size
EV: **TYK_PMP_PUMPS_SQL_META_BATCHSIZE**<br />
Type: `int`<br />

Specifies the amount of records that are going to be written each batch. Type int. By
default, it writes 1000 records max per batch.

### pumps.SQLAggregate.meta.postgres.prefer_simple_protocol
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_POSTGRES_PREFERSIMPLEPROTOCOL**<br />
Type: `bool`<br />

disables implicit prepared statement usage

### pumps.SQLAggregate.meta.mysql.default_string_size
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DEFAULTSTRINGSIZE**<br />
Type: `uint`<br />

default size for string fields. By default set to: 256

### pumps.SQLAggregate.meta.mysql.disable_datetime_precision
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DISABLEDATETIMEPRECISION**<br />
Type: `bool`<br />

disable datetime precision, which not supported before MySQL 5.6

### pumps.SQLAggregate.meta.mysql.dont_support_rename_index
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DONTSUPPORTRENAMEINDEX**<br />
Type: `bool`<br />

drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB

### pumps.SQLAggregate.meta.mysql.dont_support_rename_column
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DONTSUPPORTRENAMECOLUMN**<br />
Type: `bool`<br />

`change` when rename column, rename column not supported before MySQL 8, MariaDB

### pumps.SQLAggregate.meta.mysql.skip_initialize_with_version
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_SKIPINITIALIZEWITHVERSION**<br />
Type: `bool`<br />

auto configure based on currently MySQL version

### pumps.SQLAggregate.meta.track_all_paths
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_TRACKALLPATHS**<br />
Type: `bool`<br />

Specifies if it should store aggregated data for all the endpoints. By default, `false`
which means that only store aggregated data for `tracked endpoints`.

### pumps.SQLAggregate.meta.ignore_tag_prefix_list
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_IGNORETAGPREFIXLIST**<br />
Type: `[]string`<br />

Specifies prefixes of tags that should be ignored.

### pumps.SQLAggregate.meta.threshold_len_tag_list
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_THRESHOLDLENTAGLIST**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.SQLAggregate.meta.store_analytics_per_minute
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_STOREANALYTICSPERMINUTE**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.SQLAggregate.meta.ignore_aggregations
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_IGNOREAGGREGATIONSLIST**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.Statsd.meta.address
EV: **TYK_PMP_PUMPS_STATSD_META_ADDRESS**<br />
Type: `string`<br />

Address of statsd including host & port.

### pumps.Statsd.meta.fields
EV: **TYK_PMP_PUMPS_STATSD_META_FIELDS**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.Statsd.meta.tags
EV: **TYK_PMP_PUMPS_STATSD_META_TAGS**<br />
Type: `[]string`<br />

List of tags to be added to the metric. The possible options are listed in the below example.

If no tag is specified the fallback behavior is to use the below tags:
- `path`
- `method`
- `response_code`
- `api_version`
- `api_name`
- `api_id`
- `org_id`
- `tracked`
- `oauth_id` [VALIDATE]

### pumps.StdOut.meta.format
EV: **TYK_PMP_PUMPS_STDOUT_META_FORMAT**<br />
Type: `string`<br />

Format of the analytics logs. Default is `text` if `json` is not explicitly specified. When
JSON logging is used all pump logs to stdout will be JSON.

### pumps.StdOut.meta.log_field_name
EV: **TYK_PMP_PUMPS_STDOUT_META_LOGFIELDNAME**<br />
Type: `string`<br />

Root name of the JSON object the analytics record is nested in.

### pumps.Syslog.meta.transport
EV: **TYK_PMP_PUMPS_SYSLOG_META_TRANSPORT**<br />
Type: `string`<br />

Possible values are `udp, tcp, tls` in string form.

### pumps.Syslog.meta.network_addr
EV: **TYK_PMP_PUMPS_SYSLOG_META_NETWORKADDR**<br />
Type: `string`<br />

Host & Port combination of your syslog daemon ie: `"localhost:5140"`.

### pumps.Syslog.meta.log_level
EV: **TYK_PMP_PUMPS_SYSLOG_META_LOGLEVEL**<br />
Type: `int`<br />

The severity level, an integer from 0-7, based off the Standard: 
[Syslog Severity Levels](https://en.wikipedia.org/wiki/Syslog#Severity_level).

### pumps.Syslog.meta.tag
EV: **TYK_PMP_PUMPS_SYSLOG_META_TAG**<br />
Type: `string`<br />

Prefix tag

When working with FluentD, you should provide a 
[FluentD Parser](https://docs.fluentd.org/input/syslog) based on the OS you are using so
that FluentD can correctly read the logs.

```{.json}
"syslog": {
  "name": "syslog",
  "meta": {
    "transport": "udp",
    "network_addr": "localhost:5140",
    "log_level": 6,
    "tag": "syslog-pump"
  }
```

### analytics_storage_type
EV: **TYK_PMP_ANALYTICSSTORAGETYPE**<br />
Type: `string`<br />

Sets the analytics storage type. Where the pump will be fetching data from. Currently, only
the `redis` option is supported. [VALIDATE]

### analytics_storage_config
Example Redis storage configuration:
```{.json}
  "analytics_storage_config": {
    "type": "redis",
    "host": "localhost",
    "port": 6379,
    "hosts": null,
    "username": "",
    "password": "",
    "database": 0,
    "optimisation_max_idle": 100,
    "optimisation_max_active": 0,
    "enable_cluster": false,
    "redis_use_ssl": false,
    "redis_ssl_insecure_skip_verify": false
  },
```

### statsd_connection_string
EV: **TYK_PMP_STATSDCONNECTIONSTRING**<br />
Type: `string`<br />

Deprecated. Statdsd pump connection string. [VALIDATE]

### statsd_prefix
EV: **TYK_PMP_STATSDPREFIX**<br />
Type: `string`<br />

Deprecated. Statdsd pump key name prefix. [VALIDATE]

### log_level
EV: **TYK_PMP_LOGLEVEL**<br />
Type: `string`<br />

Set the logger details for tyk-pump. The posible values are: `info`,`debug`,`error` and
`warn`. By default, the log level is `info`.

### log_format
EV: **TYK_PMP_LOGFORMAT**<br />
Type: `string`<br />

Set the logger format. The possible values are: `text` and `json`. By default, the log
format is `text`.

### health_check_endpoint_name
EV: **TYK_PMP_HEALTHCHECKENDPOINTNAME**<br />
Type: `string`<br />

### Health Check

From v2.9.4, we have introduced a `/health` endpoint to confirm the Pump is running. You
need to configure the following settings. This returns a HTTP 200 OK response if the Pump is
running.

The default is "hello".

### health_check_endpoint_port
EV: **TYK_PMP_HEALTHCHECKENDPOINTPORT**<br />
Type: `int`<br />

The default port is 8083.

### omit_detailed_recording
EV: **TYK_PMP_OMITDETAILEDRECORDING**<br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to false.

### max_record_size
EV: **TYK_PMP_MAXRECORDSIZE**<br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

