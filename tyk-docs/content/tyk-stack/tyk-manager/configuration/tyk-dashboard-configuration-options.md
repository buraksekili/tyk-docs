---
date: 2017-03-27T14:55:44+01:00
title: Tyk Dashboard Configuration Options
menu:
  main:
    parent: "Tyk Dashboard"
weight: 2 
url: /tyk-dashboard/configuration
aliases:
    - /tyk-configuration-reference/tyk-dashboard-configuration-options/
    - /configure/tyk-dashboard-configuration-options/
---

You can use environment variables to override the config file for the Tyk Dashboard. The Dashboard configuration file can be found in the `tyk-dashboard` folder and by default is called `tyk_analytics.conf`, though it can be renamed and specified using the `--conf` flag. Environment variables are created from the dot notation versions of the JSON objects contained with the config files.
To understand how the environment variables notation works, see [Environment Variables](/docs/tyk-configuration-reference/environment-variables/).

All the Dashboard environment variables have the prefix `TYK_DB_`. The environment variables will take precedence over the values in the configuration file.

{{< include "dashboard-config" >}}
