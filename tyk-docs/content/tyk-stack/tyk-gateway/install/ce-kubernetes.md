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

There are two main ways to install your *Open Source* Tyk Gateway in a Kubernetes cluster - via Helm charts and via Kubernetes manifest files.
We will explain in details the installation with Helm charts since it's the most common way to install in Kubernetes.

The repository to install via Kubernetes manifest files is currently [inactive](https://github.com/TykTechnologies/tyk-k8s) but you can get advice and support via the support team or the [community forum](https://community.tyk.io/).

## Tyk Helm Chart

This is the preferred (and easiest) way to install the Tyk Open Source Gateway on Kubernetes. It will install Tyk as an ingress to your Kubernetes cluster, where you can then add APIs or for better devops flow, use the *Tyk Operator*.

See [Tyk Helm Chart]({{< ref "/content/tyk-stack/tyk-gateway/install/ce-helm-chart.md" >}}) for details on installing *Tyk Open Source* with our Helm Chart.

### Tyk Operator
Don't forget to combine your Tyk Gateway with the [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) in order to get Kubernetes native, GitOps designed workflows using custom CRDs.
