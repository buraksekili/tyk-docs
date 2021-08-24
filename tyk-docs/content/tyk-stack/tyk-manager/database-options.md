---
title: "Database Options"
date: 2021-08-04
tags: ["Database", "Options", "MongoDB", "SQL", "PostgreSQL", "Dashboard"]
description: ""
weight: 2
menu: 
    main:
        parent: "Tyk Dashboard"
url: "/tyk-dashboard/database-options"
---

## Introduction
From Tyk v4.0, you now have the following options for storing your Tyk Dashboard data:

* MongoDB - our default option. We support versions 3.x to 4.4.x
* SQL - we now support the following SQL platforms in v4.0
  * PostgreSQL - versions 13.3, 12.7, 11.12, 10.17, 9.6.22
  * SQLite - version 3.35.5

## Other v4.0 Database features

As well as SQL platform support, we have introduced 4 separate data storage layers. You can configure each layer separately to use one of our supported database platforms, or use a single platfor for all layers. The data storage layers are as follows:
1. `main` storage for APIs, Policies, Users, User Groups.
2. `analytics` used for displaying all charts and analytics screens.
3. `logs` log storage as used in the log browser page.
4. `uptime` storing uptime tests analytics.

All data stored in SQL platforms will be identical to our existing MongoDB support.

## MDCB Support
As of v4.0, we do not support SQL in an MDCB installation.

## Which platform should you use?

We recommend the following:

* For PoC installations, you can use any of our supported platforms (SQLite, PostgreSQL or MongoDB).
* For production installations, we recommend PostgreSQL

## Configuring SQL

See the following pages for configuring your SQL installation with Tyk:

* [Configuring Tyk Dashboard]({{< ref "/content/planning-for-production/database-settings/sql-configuration.md" >}})
* Configuring Tyk Pumps [Configuring Tyk Pumps]({{< ref "/content/planning-for-production/database-settings/sql-configuration.md" >}})