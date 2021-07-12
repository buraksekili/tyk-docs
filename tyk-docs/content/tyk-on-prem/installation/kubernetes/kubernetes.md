---
date: 2017-03-22T16:57:26Z
title: "Kubernetes "
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Helm Chart", "Tyk Operator"]
description: "How to install Tyk in a self-managed environment using Kubernetes"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 2
url: "/tyk-on-premises/kubernetes"
aliases:
  - /getting-started/installation/with-tyk-on-premises/kubernetes
  - /tyk-on-premises/kubernetes
---

There are two main ways to install your Tyk Self-Managed installation in a Kubernetes cluster - via Helm charts and via Kubernetes manifest files.

### Tyk Helm Charts

We will explain in detail the installation using [Helm Charts]({{< ref "/content/tyk-on-prem/installation/kubernetes/helm-chart.md" >}})
since it’s the most common way to install in Kubernetes.

### Kubernetes manifest files

The repository to install via Kubernetes manifest files is currently [inactive](https://github.com/TykTechnologies/tyk-k8s) 
but you can get advice and support via the support team or the [community forum](https://community.tyk.io/).

## Tyk Operator and Ingress 

For a GitOps workflow used with a Tyk Self-managed installation or setting the Tyk Gateway as an Kubernetes ingress controller, 
see our [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) repo. 
