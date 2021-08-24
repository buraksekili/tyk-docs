---
date: 2017-03-27T15:47:05+01:00
title: How To Setup Dashboard Analytics
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 4 
url: /tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config/
aliases:
  - /tyk-configuration-reference/tyk-pump-dashboard-config/
---


## Introduction

To set up your Tyk Dashboard analytics, follow the instructions based on your Dashboard [Platform]({{< ref "/content/tyk-stack/tyk-manager/database-options.md" >}}):

* [MongoDB](#mongodb)
* [SQL](#sql)


## MongoDB

Following these steps will give us analytics in the following Dashboard locations:

* Activity by API
* Activity by Key
* Errors
* Log Browser
* Developer Portal - API Usage

There are 3 steps we need to do.  

1.  Set `enable_analytics` to true in your Gateway `tyk.conf` file
2.  Set `use_sharded_analytics` to true in your Dashboard `tyk_analytics.conf` file
3.  Use the following `pump.conf`:

```{.json}
{
  "analytics_storage_type": "redis",
  "analytics_storage_config": {
    "type": "redis",
    "host": "tyk-redis",
    "port": 6379,
    "hosts": null,
    "username": "",
    "password": "",
    "database": 0,
    "optimisation_max_idle": 100,
    "optimisation_max_active": 100,
    "enable_cluster": false
  },
  "purge_delay": 2,
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
        "use_mixed_collection": true
      }
    },
    "mongo-pump-selective": {
      "name": "mongo-pump-selective",
      "meta": {
        "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
        "use_mixed_collection": true
      }
    }
  },
  "uptime_pump_config": {
    "collection_name": "tyk_uptime_analytics",
    "mongo_url": "mongodb://tyk-mongo:27017/tyk_analytics",
    "max_insert_batch_size_bytes": 500000,
    "max_document_size_bytes": 200000
  },
  "dont_purge_uptime_data": false
}
```

That's it, now we just have to restart the tyk-pump

```
$ docker restart tyk-pump
```

### More

There are 3 different pumps we want to look at:

1. mongo 
2. mongo-pump-selective
3. mongo-pump-aggregate

### Mongo

This Pump simply saves all individual requests across every organisation to a collection called `tyk_analytics`. Each request will be stored as a single document.

The Dashboard will use this collection to show requests from the **API Usage Data > Log Browser** menu, unless [use_sharded_analytics](/docs/tyk-configuration-reference/tyk-dashboard-configuration-options/) are set to true, in which case, `Log Browser` will be populated using the `mongo-pump-selective` pump below.

This collection [should be capped](/docs/tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/#capping-analytics-data) due to the number of individual documents.

```{.json}
{
  ...
  "pumps": { 
    "mongo": {
      "type": "mongo",
      "meta": {
        "collection_name": "tyk_analytics",
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
      }
    }
}
```

### mongo-pump-aggregate
This pump stores data in a collection called `z_tyk_analyticz_aggregate_{ORG ID}`.  

As a minimal number of documents get stored, you don't need to worry about capping this. The documents contain aggregate info across an individual API, such as total requests, errors, and more.

This pump supplies the data for the following sub categories `API Usage Data`:

* Activity by API
* Activity by Key
* Errors

You will need to set the `enable_aggregate_lookups` field to `true` to in the [dashboard configuration file](https://tyk.io/docs/tyk-configuration-reference/tyk-dashboard-configuration-options/) in addition to adding the below pump to your pump conf file:

```{.json}
{
  ...
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true
      }
    }
  }
}
```

The `use_mixed_collection` flag will store aggregate analytics into an analytics, org-less collection called `tyk_analytics_aggregates`. This will be used to query aggregate analytics across the entire Tyk setup, such as the case for a superuser without an organisation.

If you have a high traffic environment, and you want to ignore aggregations to avoid Mongo overloading and/or reduce aggregation documents size, you can do it using the `ignore_aggregations` configuration option. The possible values are:
* APIID
* Errors
* Versions
* APIKeys
* OauthIDs
* Geo
* Tags
* Endpoints
* KeyEndpoint
* OauthEndpoint
* ApiEndpoint

For example, if you want to ignore the API Keys aggregations:
```{.json}
{
  ...
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true,
        "ignore_aggregations": ["APIKeys"]
      }
    }
  }
}
```

### mongo-pump-selective

This pump stores data in collections called `z_tyk_analyticz_{ORG ID}`.

If the Dashboard configuration key `use_sharded_keys` equals `true`, then the Dashboard will use these collections to populate the `Log Browser`.

This collection [should be capped](/docs/analytics-and-reporting/capping-analytics-data-storage/) due to the number of individual documents.
```{.json}
{
  ...
  "pumps": {
    "mongo-pump-selective": {
      "name": "mongo-pump-selective",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true
      }
    }
  }
}
```
## SQL

When using one of our [supported SQL platforms]({{< ref "/content/tyk-stack/tyk-manager/database-options.md#introduction" >}}), you can configure your analytics in the following ways:

* Sharding **raw logs**
* Sharding **aggregated analytics**
* Sharding **uptime tests**

### Configuring a Tyk SQL Pump

```
"sql": {
  "name": "sql",
  "meta": {
    "type": "postgres",
    "connection_string": "host=localhost port=5432 user=admin dbname=postgres_test password=test",
    "table_sharding": false
  }
}
```
`type` - The supported types are `sqlite` and `postgres`. 

`connection_string` - Specifies the connection string to the database. For example, for `sqlite` it will be the path/name of the database, and for `postgres`, specifying the host, port, user, password, and dbname.

`log_level` - Specifies the SQL log verbosity. The possible values are: `info`,`error` and `warning`. By default, the value is `silent`, which means that it won't log any SQL query.

`table_sharding` - Specifies if all the analytics records are going to be stored in one table or in multiple tables (one per day). By default, it is set to `false`.

If `table_sharding` is `false`, all the records are going to be stored in the `tyk_analytics` table. If set to `true`, daily records are stored in a `tyk_analytics_YYYYMMDD` date formatted table.

### Configuring a Tyk SQL aggregate pump

```
"sql_aggregate": {
  "name": "sql_aggregate",
  "meta": {
    "type": "postgres",
    "connection_string": "host=localhost port=5432 user=admin dbname=postgres_test password=test",
    "table_sharding": true
  }
}
```

`type` - The supported types are `sqlite` and `postgres`. 

`connection_string` - Specifies the connection string to the database. For example, for `sqlite` it will be the path/name of the database, and for `postgres`, specifying the host, port, user, password, and dbname.

`log_level` - Specifies the SQL log verbosity. The possible values are: `info`, `error`, and `warning`. By default, the value is `silent`, which means that it won't log any SQL query.

`track_all_paths` - Specifies if it should store aggregated data for all the endpoints. By default, it is set to `false`, which means that it only stores aggregated data for `tracked endpoints`. 

`ignore_tag_prefix_list` - Specifies prefixes of tags that should be ignored.

`table_sharding` - Specifies if all the analytics records are going to be stored in one table or in multiple tables (one per day). By default, it is set to `false`.

If `table_sharding` is `false`, all the records are going to be stored in the `tyk_analytics` table. If set to `true`, daily records are stored in a `tyk_analytics_YYYYMMDD` date formatted table.

### Configuring a Tyk SQL uptime pump

In an `uptime_pump_config` section, you can configure a SQL uptime pump. To do that, you need to add the field `uptime_type` with `sql` value.

```
"uptime_pump_config": {
  "uptime_type": "sql",
  "type": "postgres",
  "connection_string": "host=sql_host port=sql_port user=sql_usr dbname=dbname password=sql_pw",
  "table_sharding": false
},
```
`type` - The supported types are `sqlite` and `postgres`.

`connection_string` - Specifies the connection string to the database. For example, for `sqlite` it will be the path/name of the database, and for `postgres`, specifying the host, port, user, password, and dbname.

`table_sharding` - Specifies if all the analytics records are going to be stored in one table or in multiple tables (one per day). By default, it is set to `false`.

If `table_sharding` is `false`, all the records are going to be stored in the `tyk_analytics` table. If set to `true`, daily records are stored in a `tyk_analytics_YYYYMMDD` date formatted table.

