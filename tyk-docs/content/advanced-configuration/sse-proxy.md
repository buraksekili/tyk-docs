---
title: "SSE Proxy"
date: 2021-09-28
tags: [""]
description: ""
menu: 
  main:
    parent: "Advanced Configuration"
url: "/advanced-configuration/sse-proxy"
weight: 6
---

## Using Tyk as a server-sent events (SSE) Proxy

Tyk Gateway supports SSE proxying over HTTP, enabling a client to receive a stream of updates from a server over a long running HTTP connection.

### Prerequisites
- Enable SSE support on the Gateway by setting `http_server_options.enable_websockets` to true in your Gateway config file.
- Set `http_server_options.read_timeout` and `http_server_options.write_timeout` to appropriately high values to prevent the connection between the User and the Gateway from being closed prematurely.  By way of example you could try setting both to `2000`, but this is for you to determine in your environment.
- Set `http_server_options.flush_interval` to an appropriate value, e.g. `1`, to force Tyk to stream the response to the client every `n` seconds.


### Example using Tyk as an SSE proxy
For this we will need:

* An SSE server.  For this example we will use [this server](https://github.com/kljensen/golang-html5-sse-example)
* An instance of Tyk Gateway and optionally Tyk Dashboard

#### Steps:
* Ensure the Gateway configuration options detailed in the prerequisites have been set.
* Run the SSE server as per the example instructions.  By default this runs on port `8000`.
```
go run ./server.go
```
* Publish an API with the following configuration:
    * Set an appropriate listen path: e.g. `/sse`
    * Strip the listen path
    * Now set the `target_url` to be the example SSE server: `<host>:8000`, e.g. `http://host.docker.internal:8000`
    * Hit save, and once the Gateway finishes reloading we can test the solution
* From the command line we can consume the service via tyk gateway using `curl`. Simply type `curl http://localhost:8080/sse/events/` and we should see a stream of updates from the server, similar to the following

```
Message: 20 - the time is 2013-03-08 21:08:01.260967 -0500 EST
Message: 21 - the time is 2013-03-08 21:08:06.262034 -0500 EST
Message: 22 - the time is 2013-03-08 21:08:11.262608 -0500 EST
```
