---
title: "Kubernetes"
date: 2021-01-20
tags: ["Tyk Gateway", "Open Source", "Installation", "Kubernetes", "Helm Chart", "Tyk Operator"]
description: "How to install the open source Tyk Gateway using our Kubernetes Helm Chart and the Tyk Operator"
menu:
  main:
    parent: "Open Source Installation" # Child of APIM -> OSS
weight: 2
url: "/tyk-oss/ce-kubernetes/"
---

The main ways to install the Open Source *Tyk Gateway* in a Kubernetes cluster are via Helm charts or via Kubernetes manifest files. 

### Helm Charts

We will explain in details the installation using [Helm charts](/docs/tyk-oss/ce-helm-chart/) since it’s the most common way to install in Kubernetes.

### Kubernetes manifest files

For instruction on this installation choice please refer to our [tyk-oss-k8s-deployment GitHub repo](https://github.com/TykTechnologies/tyk-oss-k8s-deployment).  


### Tyk Operator

For GitOps workflow used with the *Tyk Gateway* or setting it as an ingress controller, 
see our [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) repo. 
