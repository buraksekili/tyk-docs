### purge_delay
EV: **TYK_PMP_PURGEDELAY**<br />
Type: `int`<br />

The number of seconds the Pump waits between checking for analytics data and purge it from Redis.

### purge_chunk
EV: **TYK_PMP_PURGECHUNK**<br />
Type: `int64`<br />

The maximum number of records to pull from Redis at a time. If it's unset or 0, all the analytics records in Redis are pulled. If it's setted, `storage_expiration_time` is used to reset the analytics record TTL.

### storage_expiration_time
EV: **TYK_PMP_STORAGEEXPIRATIONTIME**<br />
Type: `int64`<br />

The number of seconds for the analytics records TTL. It only works if `purge_chunk` is enabled. Defaults to 60 seconds.

### dont_purge_uptime_data
EV: **TYK_PMP_DONTPURGEUPTIMEDATA**<br />
Type: `bool`<br />

Setting this to false will create a pump that pushes uptime data to Uptime Pump, so the Dashboard can read it. Disable by setting to true

### uptime_pump_config
[ADD COMMENT]

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

[ADD COMMENT]

### uptime_pump_config.connection_string
EV: **TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING**<br />
Type: `string`<br />

[ADD COMMENT]

### uptime_pump_config.postgres
EV: **TYK_PMP_UPTIMEPUMPCONFIG_POSTGRES**<br />
Type: `PostgresConfig`<br />

[ADD COMMENT]

### uptime_pump_config.postgres.prefer_simple_protocol
EV: **TYK_PMP_UPTIMEPUMPCONFIG_POSTGRES_PREFERSIMPLEPROTOCOL**<br />
Type: `bool`<br />

disables implicit prepared statement usage

### uptime_pump_config.mysql
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MYSQL**<br />
Type: `MysqlConfig`<br />

[ADD COMMENT]

### uptime_pump_config.mysql.default_string_size
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DEFAULTSTRINGSIZE**<br />
Type: `uint`<br />

default size for string fields. By default set to: 256

### uptime_pump_config.mysql.disable_datetime_precision
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DISABLEDATETIMEPRECISION**<br />
Type: `bool`<br />

disable datetime precision, which not supported before MySQL 5.6

### uptime_pump_config.mysql.dont_support_rename_index
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DONTSUPPORTRENAMEINDEX**<br />
Type: `bool`<br />

drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB

### uptime_pump_config.mysql.dont_support_rename_column
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DONTSUPPORTRENAMECOLUMN**<br />
Type: `bool`<br />

`change` when rename column, rename column not supported before MySQL 8, MariaDB

### uptime_pump_config.mysql.skip_initialize_with_version
EV: **TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_SKIPINITIALIZEWITHVERSION**<br />
Type: `bool`<br />

auto configure based on currently MySQL version

### uptime_pump_config.table_sharding
EV: **TYK_PMP_UPTIMEPUMPCONFIG_TABLESHARDING**<br />
Type: `bool`<br />

[ADD COMMENT]

### uptime_pump_config.log_level
EV: **TYK_PMP_UPTIMEPUMPCONFIG_LOGLEVEL**<br />
Type: `string`<br />

[ADD COMMENT]

### uptime_pump_config.batch_size
EV: **TYK_PMP_UPTIMEPUMPCONFIG_BATCHSIZE**<br />
Type: `int`<br />

[ADD COMMENT]

### uptime_pump_config.uptime_type
EV: **TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps
[ADD COMMENT]

### pumps.{PMP_NAME}.name
EV: **TYK_PMP_PUMPS_{PMP_NAME}_NAME**<br />
Type: `string`<br />

Deprecated. [ADD COMMENT]

### pumps.{PMP_NAME}.type
EV: **TYK_PMP_PUMPS_{PMP_NAME}_TYPE**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.{PMP_NAME}.filters
This feature adds a new configuration field in each pump called filters and its structure is the following:
```json
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we want to send the analytics records) and the fields skip_api_ids, skip_org_ids and skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```json
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

You can configure a different timeout for each pump with the configuration option `timeout`. Its default value is 0 seconds, which means that the pump will wait for the writing operation forever. 

An example of this configuration would be:
```json
"mongo": {
  "type": "mongo",
  "timeout":5,
  "meta": {
    "collection_name": "tyk_analytics",
    "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
  }
}
```

In case that any pump doesn't have a configured timeout, and it takes more seconds to write than the value configured for the purge loop in the `purge_delay` config option, you will see the following warning message: `Pump PMP_NAME is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`. 

In case that you have a configured timeout, but it still takes more seconds to write than the value configured for the purge loop in the `purge_delay` config option, you will see the following warning message: `Pump PMP_NAME is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`. 

### pumps.{PMP_NAME}.omit_detailed_recording
EV: **TYK_PMP_PUMPS_{PMP_NAME}_OMITDETAILEDRECORDING**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.{PMP_NAME}.max_record_size
EV: **TYK_PMP_PUMPS_{PMP_NAME}_MAXRECORDSIZE**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.CSV.meta.csv_dir
EV: **TYK_PMP_PUMPS_CSV_META_CSVDIR**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.DogStatsd.meta.namespace
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_NAMESPACE**<br />
Type: `string`<br />

prefix for your metrics to datadog

### pumps.DogStatsd.meta.address
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_ADDRESS**<br />
Type: `string`<br />

address of the datadog agent including host & port

### pumps.DogStatsd.meta.async_uds
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_ASYNCUDS**<br />
Type: `bool`<br />

Enable async UDS over UDP https://github.com/Datadog/datadog-go#unix-domain-sockets-client

### pumps.DogStatsd.meta.async_uds_write_timeout_seconds
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_ASYNCUDSWRITETIMEOUT**<br />
Type: `int`<br />

Integer write timeout in seconds if `async_uds: true`

### pumps.DogStatsd.meta.buffered
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_BUFFERED**<br />
Type: `bool`<br />

Enable buffering of messages

### pumps.DogStatsd.meta.buffered_max_messages
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_BUFFEREDMAXMESSAGES**<br />
Type: `int`<br />

Max messages in single datagram if `buffered: true`. Default 16

### pumps.DogStatsd.meta.tags
EV: **TYK_PMP_PUMPS_DOGSTATSD_META_TAGS**<br />
Type: `[]string`<br />

List of tags to be added to the metric. The possible options are listed in the below example

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

Note that this configuration can generate significant charges due to the unbound nature of the `path` tag.

```.json
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

The name of the index that all the analytics data will be placed in. Defaults to "tyk_analytics"

### pumps.Elasticsearch.meta.elasticsearch_url
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_ELASTICSEARCHURL**<br />
Type: `string`<br />

If sniffing is disabled, the URL that all data will be sent to. Defaults to "http://localhost:9200"

### pumps.Elasticsearch.meta.use_sniffing
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_ENABLESNIFFING**<br />
Type: `bool`<br />

If sniffing is enabled, the "elasticsearch_url" will be used to make a request to get a list of all the nodes in the cluster, the returned addresses will then be used. Defaults to false

### pumps.Elasticsearch.meta.document_type
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_DOCUMENTTYPE**<br />
Type: `string`<br />

The type of the document that is created in ES. Defaults to "tyk_analytics"

### pumps.Elasticsearch.meta.rolling_index
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_ROLLINGINDEX**<br />
Type: `bool`<br />

Appends the date to the end of the index name, so each days data is split into a different index name. E.g. tyk_analytics-2016.02.28 Defaults to false

### pumps.Elasticsearch.meta.extended_stats
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_EXTENDEDSTATISTICS**<br />
Type: `bool`<br />

If set to true will include the following additional fields: Raw Request, Raw Response and User Agent.

### pumps.Elasticsearch.meta.generate_id
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_GENERATEID**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.Elasticsearch.meta.decode_base64
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_DECODEBASE64**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.Elasticsearch.meta.version
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_VERSION**<br />
Type: `string`<br />

Specifies the ES version. Use "3" for ES 3.X, "5" for ES 5.X, "6" for ES 6.X, "7" for ES 7.X . Defaults to "3"

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

Specifies the number of requests needed to flush the data and send it to ES. Defaults to 1000 requests. If it is needed, can be disabled with -1.

### pumps.Elasticsearch.meta.bulk_config.bulk_size
EV: **TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_BULKSIZE**<br />
Type: `int`<br />

Specifies the size (in bytes) needed to flush the data and send it to ES. Defaults to 5MB. If it is needed, can be disabled with -1.

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

[ADD COMMENT]

### pumps.Graylog.meta.port
EV: **TYK_PMP_PUMPS_GRAYLOG_META_GRAYLOGPORT**<br />
Type: `int`<br />

[ADD COMMENT]

### pumps.Graylog.meta.tags
EV: **TYK_PMP_PUMPS_GRAYLOG_META_TAGS**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.Influx.meta.database_name
EV: **TYK_PMP_PUMPS_INFLUX_META_DATABASENAME**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Influx.meta.address
EV: **TYK_PMP_PUMPS_INFLUX_META_ADDR**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Influx.meta.username
EV: **TYK_PMP_PUMPS_INFLUX_META_USERNAME**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Influx.meta.password
EV: **TYK_PMP_PUMPS_INFLUX_META_PASSWORD**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Influx.meta.fields
EV: **TYK_PMP_PUMPS_INFLUX_META_FIELDS**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.Influx.meta.tags
EV: **TYK_PMP_PUMPS_INFLUX_META_TAGS**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.Kafka.meta.broker
EV: **TYK_PMP_PUMPS_KAFKA_META_BROKER**<br />
Type: `[]string`<br />

The list of brokers used to discover the partitions available on the kafka cluster. E.g. "localhost:9092"

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

Enable "github.com/golang/snappy" codec to be used to compress Kafka messages. By default is false

### pumps.Kafka.meta.meta_data
EV: **TYK_PMP_PUMPS_KAFKA_META_METADATA**<br />
Type: `map[string]string`<br />

Can be used to set custom metadata inside the kafka message

### pumps.Kafka.meta.use_ssl
EV: **TYK_PMP_PUMPS_KAFKA_META_USESSL**<br />
Type: `bool`<br />

Enables SSL connection.

### pumps.Kafka.meta.ssl_insecure_skip_verify
EV: **TYK_PMP_PUMPS_KAFKA_META_SSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

Controls whether the pump client verifies the kafka server's certificate chain and host name.

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

[ADD COMMENT]

### pumps.Kafka.meta.sasl_username
EV: **TYK_PMP_PUMPS_KAFKA_META_USERNAME**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Kafka.meta.sasl_password
EV: **TYK_PMP_PUMPS_KAFKA_META_PASSWORD**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Kafka.meta.sasl_algorithm
EV: **TYK_PMP_PUMPS_KAFKA_META_ALGORITHM**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Logzio.meta.check_disk_space
EV: **TYK_PMP_PUMPS_LOGZIO_META_CHECKDISKSPACE**<br />
Type: `bool`<br />

Set the sender to check if it crosses the maximum allowed disk usage. Default value is `true`.

### pumps.Logzio.meta.disk_threshold
EV: **TYK_PMP_PUMPS_LOGZIO_META_DISKTHRESHOLD**<br />
Type: `int`<br />

Set disk queue threshold, once the threshold is crossed the sender will not enqueue the received logs. Default value is `98` (percentage of disk).

### pumps.Logzio.meta.drain_duration
EV: **TYK_PMP_PUMPS_LOGZIO_META_DRAINDURATION**<br />
Type: `string`<br />

Set drain duration (flush logs on disk). Default value is `3s`

### pumps.Logzio.meta.queue_dir
EV: **TYK_PMP_PUMPS_LOGZIO_META_QUEUEDIR**<br />
Type: `string`<br />

The directory for the queue.

### pumps.Logzio.meta.token
EV: **TYK_PMP_PUMPS_LOGZIO_META_TOKEN**<br />
Type: `string`<br />

Token for sending data to your logzio account

### pumps.Logzio.meta.url
EV: **TYK_PMP_PUMPS_LOGZIO_META_URL**<br />
Type: `string`<br />

If you do not want to use the default Logzio url i.e. when using a proxy. Default is `https://listener.logz.io:8071`

### pumps.Moesif.meta.application_id
EV: **TYK_PMP_PUMPS_MOESIF_META_APPLICATIONID**<br />
Type: `string`<br />

Moesif Application Id. You can find your Moesif Application Id from [_Moesif Dashboard_](https://www.moesif.com/) -> _Top Right Menu_ -> _API Keys_ . Moesif recommends creating separate Application Ids for each environment such as Production, Staging, and Development to keep data isolated. 

### pumps.Moesif.meta.request_header_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_REQUESTHEADERMASKS**<br />
Type: `[]string`<br />

An option to mask a specific request header field. Type: String Array `[] string`.

### pumps.Moesif.meta.response_header_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_RESPONSEHEADERMASKS**<br />
Type: `[]string`<br />

An option to mask a specific response header field. Type: String Array `[] string`.

### pumps.Moesif.meta.request_body_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_REQUESTBODYMASKS**<br />
Type: `[]string`<br />

An option to mask a specific - request body field. Type: String Array `[] string`.

### pumps.Moesif.meta.response_body_masks
EV: **TYK_PMP_PUMPS_MOESIF_META_RESPONSEBODYMASKS**<br />
Type: `[]string`<br />

An option to mask a specific response body field. Type: String Array `[] string`.

### pumps.Moesif.meta.disable_capture_request_body
EV: **TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTUREREQUESTBODY**<br />
Type: `bool`<br />

An option to disable logging of request body. Type: Boolean. Default value is `false`.

### pumps.Moesif.meta.disable_capture_response_body
EV: **TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTURERESPONSEBODY**<br />
Type: `bool`<br />

An option to disable logging of response body. Type: Boolean. Default value is `false`.

### pumps.Moesif.meta.user_id_header
EV: **TYK_PMP_PUMPS_MOESIF_META_USERIDHEADER**<br />
Type: `string`<br />

An optional field name to identify User from a request or response header. Type: String.

### pumps.Moesif.meta.company_id_header
EV: **TYK_PMP_PUMPS_MOESIF_META_COMPANYIDHEADER**<br />
Type: `string`<br />

An optional field name to identify Company (Account) from a request or response header. Type: String.

### pumps.Moesif.meta.enable_bulk
EV: **TYK_PMP_PUMPS_MOESIF_META_ENABLEBULK**<br />
Type: `bool`<br />

Set this to `true` to enable `bulk_config`.

### pumps.Moesif.meta.bulk_config
EV: **TYK_PMP_PUMPS_MOESIF_META_BULKCONFIG**<br />
Type: `map[string]interface{}`<br />

Batch writing trigger configuration.
  * `"event_queue_size"` - (optional) An optional field name which specify the maximum number of events to hold in queue before sending to Moesif. In case of network issues when not able to connect/send event to Moesif, skips adding new events to the queue to prevent memory overflow. Type: int. Default value is `10000`.
  * `"batch_size"` - (optional) An optional field name which specify the maximum batch size when sending to Moesif. Type: int. Default value is `200`.
  * `"timer_wake_up_seconds"` - (optional) An optional field which specifies a time (every n seconds) how often background thread runs to send events to moesif. Type: int. Default value is `2` seconds.

### pumps.Moesif.meta.authorization_header_name
EV: **TYK_PMP_PUMPS_MOESIF_META_AUTHORIZATIONHEADERNAME**<br />
Type: `string`<br />

An optional request header field name to used to identify the User in Moesif. Type: String. Default value is `authorization`.

### pumps.Moesif.meta.authorization_user_id_field
EV: **TYK_PMP_PUMPS_MOESIF_META_AUTHORIZATIONUSERIDFIELD**<br />
Type: `string`<br />

An optional field name use to parse the User from authorization header in Moesif. Type: String. Default value is `sub`.

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

[ADD COMMENT]

### pumps.MongoAggregate.meta.track_all_paths
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_TRACKALLPATHS**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.MongoAggregate.meta.ignore_tag_prefix_list
EV: **TYK_PMP_PUMPS_MONGOAGGREGATE_META_IGNORETAGPREFIXLIST**<br />
Type: `[]string`<br />

[ADD COMMENT]

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

[ADD COMMENT]

### pumps.Prometheus.meta.path
EV: **TYK_PMP_PUMPS_PROMETHEUS_META_PATH**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Splunk.meta.collector_token
EV: **TYK_PMP_PUMPS_SPLUNK_META_COLLECTORTOKEN**<br />
Type: `string`<br />

address of the datadog agent including host & port

### pumps.Splunk.meta.collector_url
EV: **TYK_PMP_PUMPS_SPLUNK_META_COLLECTORURL**<br />
Type: `string`<br />

endpoint the Pump will send analytics too.  Should look something like:

`https://splunk:8088/services/collector/event`

### pumps.Splunk.meta.ssl_insecure_skip_verify
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLINSECURESKIPVERIFY**<br />
Type: `bool`<br />

Controls whether the pump client verifies the Splunk server's certificate chain and host name.

### pumps.Splunk.meta.ssl_cert_file
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLCERTFILE**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Splunk.meta.ssl_key_file
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLKEYFILE**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Splunk.meta.ssl_server_name
EV: **TYK_PMP_PUMPS_SPLUNK_META_SSLSERVERNAME**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.Splunk.meta.obfuscate_api_keys
EV: **TYK_PMP_PUMPS_SPLUNK_META_OBFUSCATEAPIKEYS**<br />
Type: `bool`<br />

Controls whether the pump client should hide the API key. In case you still need substring of the value, check the next option. Type: Boolean. Default value is `false`.

### pumps.Splunk.meta.obfuscate_api_keys_length
EV: **TYK_PMP_PUMPS_SPLUNK_META_OBFUSCATEAPIKEYSLENGTH**<br />
Type: `int`<br />

Define the number of the characters from the end of the API key. The `obfuscate_api_keys` should be set to `true`. Type: Integer. Default value is `0`.

### pumps.Splunk.meta.fields
EV: **TYK_PMP_PUMPS_SPLUNK_META_FIELDS**<br />
Type: `[]string`<br />

Define which Analytics fields should participate in the Splunk event. Check the available fields in the example below. Type: String Array `[] string`. Default value is `["method", "path", "response_code", "api_key", "time_stamp", "api_version", "api_name", "api_id", "org_id", "oauth_id", "raw_request", "request_time", "raw_response", "ip_address"]`

### pumps.Splunk.meta.ignore_tag_prefix_list
EV: **TYK_PMP_PUMPS_SPLUNK_META_IGNORETAGPREFIXLIST**<br />
Type: `[]string`<br />

Choose which tags to be ignored by the Splunk Pump. Keep in mind that the tag name and value are hyphenated. Type:  Type: String Array `[] string`. Default value is `[]`

### pumps.Splunk.meta.enable_batch
EV: **TYK_PMP_PUMPS_SPLUNK_META_ENABLEBATCH**<br />
Type: `bool`<br />

If this is set to `true`, pump is going to send the analytics records in batch to Splunk. Type: Boolean. Default value is `false`.

### pumps.SQL.meta.type
EV: **TYK_PMP_PUMPS_SQL_META_TYPE**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.SQL.meta.connection_string
EV: **TYK_PMP_PUMPS_SQL_META_CONNECTIONSTRING**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.SQL.meta.postgres
[ADD COMMENT]

### pumps.SQL.meta.postgres.prefer_simple_protocol
EV: **TYK_PMP_PUMPS_SQL_META_POSTGRES_PREFERSIMPLEPROTOCOL**<br />
Type: `bool`<br />

disables implicit prepared statement usage

### pumps.SQL.meta.mysql
[ADD COMMENT]

### pumps.SQL.meta.mysql.default_string_size
EV: **TYK_PMP_PUMPS_SQL_META_MYSQL_DEFAULTSTRINGSIZE**<br />
Type: `uint`<br />

default size for string fields. By default set to: 256

### pumps.SQL.meta.mysql.disable_datetime_precision
EV: **TYK_PMP_PUMPS_SQL_META_MYSQL_DISABLEDATETIMEPRECISION**<br />
Type: `bool`<br />

disable datetime precision, which not supported before MySQL 5.6

### pumps.SQL.meta.mysql.dont_support_rename_index
EV: **TYK_PMP_PUMPS_SQL_META_MYSQL_DONTSUPPORTRENAMEINDEX**<br />
Type: `bool`<br />

drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB

### pumps.SQL.meta.mysql.dont_support_rename_column
EV: **TYK_PMP_PUMPS_SQL_META_MYSQL_DONTSUPPORTRENAMECOLUMN**<br />
Type: `bool`<br />

`change` when rename column, rename column not supported before MySQL 8, MariaDB

### pumps.SQL.meta.mysql.skip_initialize_with_version
EV: **TYK_PMP_PUMPS_SQL_META_MYSQL_SKIPINITIALIZEWITHVERSION**<br />
Type: `bool`<br />

auto configure based on currently MySQL version

### pumps.SQL.meta.table_sharding
EV: **TYK_PMP_PUMPS_SQL_META_TABLESHARDING**<br />
Type: `bool`<br />

[ADD COMMENT]

### pumps.SQL.meta.log_level
EV: **TYK_PMP_PUMPS_SQL_META_LOGLEVEL**<br />
Type: `string`<br />

[ADD COMMENT]

### pumps.SQL.meta.batch_size
EV: **TYK_PMP_PUMPS_SQL_META_BATCHSIZE**<br />
Type: `int`<br />

[ADD COMMENT]

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

[ADD COMMENT]

### pumps.SQLAggregate.meta.ignore_tag_prefix_list
EV: **TYK_PMP_PUMPS_SQLAGGREGATE_META_IGNORETAGPREFIXLIST**<br />
Type: `[]string`<br />

[ADD COMMENT]

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

[ADD COMMENT]

### pumps.Statsd.meta.fields
EV: **TYK_PMP_PUMPS_STATSD_META_FIELDS**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.Statsd.meta.tags
EV: **TYK_PMP_PUMPS_STATSD_META_TAGS**<br />
Type: `[]string`<br />

[ADD COMMENT]

### pumps.StdOut.meta.format
EV: **TYK_PMP_PUMPS_STDOUT_META_FORMAT**<br />
Type: `string`<br />

Format of the analytics logs. Default is `text` if `json` is not explicitly specified. When JSON logging is used all pump logs to stdout will be JSON.

### pumps.StdOut.meta.log_field_name
EV: **TYK_PMP_PUMPS_STDOUT_META_LOGFIELDNAME**<br />
Type: `string`<br />

Root name of the JSON object the analytics record is nested in

### pumps.Syslog.meta.transport
EV: **TYK_PMP_PUMPS_SYSLOG_META_TRANSPORT**<br />
Type: `string`<br />

Possible values are `udp, tcp, tls` in string form

### pumps.Syslog.meta.network_addr
EV: **TYK_PMP_PUMPS_SYSLOG_META_NETWORKADDR**<br />
Type: `string`<br />

Host & Port combination of your syslog daemon ie: `"localhost:5140"`

### pumps.Syslog.meta.log_level
EV: **TYK_PMP_PUMPS_SYSLOG_META_LOGLEVEL**<br />
Type: `int`<br />

The severity level, an integer from 0-7, based off the Standard: [Syslog Severity Levels](https://en.wikipedia.org/wiki/Syslog#Severity_level)

### pumps.Syslog.meta.tag
EV: **TYK_PMP_PUMPS_SYSLOG_META_TAG**<br />
Type: `string`<br />

Prefix tag

When working with FluentD, you should provide a [FluentD Parser](https://docs.fluentd.org/input/syslog) based on the OS you are using so that FluentD can correctly read the logs

```.json
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

[ADD COMMENT]

### analytics_storage_config
[ADD COMMENT]

### statsd_connection_string
EV: **TYK_PMP_STATSDCONNECTIONSTRING**<br />
Type: `string`<br />

[ADD COMMENT]

### statsd_prefix
EV: **TYK_PMP_STATSDPREFIX**<br />
Type: `string`<br />

[ADD COMMENT]

### log_level
EV: **TYK_PMP_LOGLEVEL**<br />
Type: `string`<br />

Set the logger details for tyk-pump. The posible values are: `info`,`debug`,`error` and `warn`. By default, the log level is `info`. 

### log_format
EV: **TYK_PMP_LOGFORMAT**<br />
Type: `string`<br />

Set the logger format. The possible values are: `text` and `json`. By default, the log format is `text`.

### health_check_endpoint_name
EV: **TYK_PMP_HEALTHCHECKENDPOINTNAME**<br />
Type: `string`<br />

[ADD COMMENT]

### health_check_endpoint_port
EV: **TYK_PMP_HEALTHCHECKENDPOINTPORT**<br />
Type: `int`<br />

[ADD COMMENT]

### omit_detailed_recording
EV: **TYK_PMP_OMITDETAILEDRECORDING**<br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request in pumps. Defaults to false.

### max_record_size
EV: **TYK_PMP_MAXRECORDSIZE**<br />
Type: `int`<br />

`max_record_size` defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults to 0. Is not set then tyk-pump will not trim any data and will store the full information.
This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

