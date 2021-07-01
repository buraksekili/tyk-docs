---
date: 2017-03-22T16:57:26Z
title: On Kubernetes
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Helm Chart", "Tyk Operator"]
description: "How to install Tyk in a self-managed environment using Kubernetes"
menu:
  main:
    parent: "Installation"
weight: 2
url: "/tyk-on-premises/kubernetes"
aliases:
  - /getting-started/installation/with-tyk-on-premises/with-kubernetes
  - /tyk-on-premises/with-kubernetes
---

We have two methods of installing a Tyk Self-Managed installation in a Kubernetes cluster.


## Tyk Helm Chart

This is the preferred (and easiest) way to install Tyk Pro on Kubernetes. It will install Tyk in your Kubernetess cluster, where you can then add APIs to manage via either our Tyk Kubernetes Operator,  or as with a normal Tyk Pro Installation managed with a Tyk Dashboard.

See [With Tyk Helm Chart]({{< ref "/content/tyk-on-prem/installation/with-kubernetes/with-kubernetes.md" >}}) for details on installing Tyk Pro with our Helm Chart.

## Tyk Kubernetes Operator and Ingress 

{{< note success >}}
**Note**  

Our Tyk Operator installs Tyk as an Ingress controller. It is currently in BETA and we welcome users to try it out and feedback in our [GitHub repository](https://github.com/TykTechnologies/tyk-operator) or via our normal support channels for existing Tyk Customers.

{{< /note >}}

Our Kubernetes operator enables Tyk to be used for managing API Definitions (including K8s Ingress), security policies and other Tyk features.

See [As an Ingress Controller with Tyk Operator]({{< ref "/content/tyk-on-prem/installation/with-kubernetes/tyk-kubernetes-ingress-controller.md" >}}) for details on installing Tyk Pro as a Kubernetes ingress controller.