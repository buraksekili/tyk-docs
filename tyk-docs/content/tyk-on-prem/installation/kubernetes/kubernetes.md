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

There are two main ways to install your *Tyk Self-Managed* installation in a Kubernetes cluster - via Helm charts and via Kubernetes manifest files.
We will explain in details the installation with Helm charts since it's the most common way to install in Kubernetes.

### Tyk Helm Charts

We will explain in details the installation with Helm charts since it's the most common way to install in Kubernetes.

We will explain in details the installation using [Helm charts](/docs/tyk-self-managed/tyk-helm-chart/)) 
since it’s the most common way to install in Kubernetes.

### Kubernetes manifest files

The repository to install via Kubernetes manifest files is currently [inactive](https://github.com/TykTechnologies/tyk-k8s) 
but you can get advice and support via the support team or the [community forum](https://community.tyk.io/).

## Tyk Operator and Ingress 

For GitOps workflow used with the Tyk *Self-managed* or setting the *Tyk gateway* as an ingress controller, 
go to [Tyk Operator](/docs/tyk-on-prem/kubernetes-ingress/). 
