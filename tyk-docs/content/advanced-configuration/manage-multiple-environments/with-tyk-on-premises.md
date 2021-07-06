---
date: 2020-08-04T11:56:24Z
title: On-Premises
menu: 
  main:
    parent: "Manage Multiple Environments"
    identifier: multiple-environments-on-premises
weight: 3
---

## Gateway & API Sharding
Tyk Gateway has a very powerful functionality that allows you to selectively choose which APIs are to be loaded on which Gateways.

Imagine the case where you have two sets of APIs, Internal & External.  You want to prevent your Internal APIs from being accessed or visible outside your protected network.  Well, [sharding](/docs/advanced-configuration/manage-multiple-environments/#api-sharding) makes it extremely easy to configure your Tyk Gateways from the Dashboard.

# Instructions

## 1. Configure a Gateway as a shard

Setting up a gateway to be a shard, or a zone, is very easy. All you do is tell the node in the tyk.conf file what tags to respect and that it is segmented:

```{.copyWrapper}
...
"db_app_conf_options": {
  "node_is_segmented": true,
  "tags": ["internal", "node-1"]
},
...
```

Tags are always treated as OR conditions, so this node will pick up all APIs that are marked as `internal` or `node-1`.

## 2. Tag an API for a shard using the Dashboard

To add an API Tag to a an API configuration in the dashboard, first ensure you are in the API Editor, and have selected the *Advanced Options* tab:

![Advanced options tab location](/docs/img/2.10/advanced_options_designer.png)

Once you have reached this section, scroll down to the *Segment Tags* section:

![Segement tags section](/docs/img/2.10/segment_tags.png)

In this section, set the tag name you want to apply, and click the *Add* button.

When you save the API, the tags will become immediately active, and if any gateways are configured to only load tagged API Definitions then this configuration will only be loaded by the relevant gateway.

## Target an API Definition via JSON

In your API definition, add a tags section to the root of the API Definition:

```{.copyWrapper}
"tags": ["internal"]
```

This will also set the tags for the API and when API requests are made through this gateway, these tags will be transferred in to the analytics data set.

# API Tagging with On-Premises

API Sharding with On-Premises is very flexible, but it behaves a little differently to sharding with Tyk Multi-Cloud. The key difference is that with Tyk Multi-Cloud you can have multiple isolated environments with their own databases all sharing the same configurations and keys by setting the `group_id` option in the Gateway slave options, but with Tyk On-Premises the zoning is limited to tags only, and must share a single Redis database.

To isolate On-Premises installations across data centers you will need to use our Multi Data Center Bridge component. This system powers the functionality of Tyk Multi-Cloud in our cloud and is available to our Enterprise customers as an add-on.
