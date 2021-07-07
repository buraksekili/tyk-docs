---
date: 2017-03-22T16:57:26Z
title: Kubernetes
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Helm Chart", "Tyk Operator"]
description: "How to install Tyk in a self-managed environment using Kubernetes"
menu:
  main:
    parent: "Installation"
weight: 2
url: "/tyk-on-premises/kubernetes"
aliases:
  - /getting-started/installation/with-tyk-on-premises/kubernetes
  - /tyk-on-premises/kubernetes
---

The two main ways to install *Tyk Self-Managed* in a Kubernetes cluster - via Helm charts and via Kubernetes manifest files.
We will explain in details the installation with Helm charts since it's the most common way to install in Kubernetes.

The repository to install via Kubernetes manifest files is currently [inactive](https://github.com/TykTechnologies/tyk-k8s) but you can get advice and support via the support team or the [community forum](https://community.tyk.io/).


## Tyk Helm Chart

This is the preferred (and easiest) way to install Tyk Pro on Kubernetes. It will install Tyk as an ingress to your Kubernetes cluster, where you can then add APIs to manage via the *Tyk manager* (i.e *tyk-dashboard*) or for bestter devops flow, use the *Tyk Operator*.

See [Tyk Helm Chart]({{< ref "/content/tyk-on-prem/installation/kubernetes/kubernetes.md" >}}) for details on installing *Tyk Self-managed* with our Helm Chart.

## Tyk Operator and Ingress 

*Tyk Operator* offers an Ingress Controller, which dynamically manages Tyk ApiDefinition resources as per the ingress spec. *Tyk Gateway* can be configured as a drop-in replacement for a standard Kubernetes Ingress. 

*Tyk Operator* is also the soon-to-be the preferred way to use Tyk for users who follow gitops standards. It enables Tyk to be used for managing API Definitions, security policies and other Tyk features.


{{< note success >}}
**Note**

*Tyk Operator* is currently in BETA, and we welcome users to try it out and feedback in its [GitHub repository](https://github.com/TykTechnologies/tyk-operator) or via support channel for existing Tyk customers.

{{< /note >}}


See [Ingress Controller with Tyk Operator]({{< ref "/content/tyk-on-prem/installation/kubernetes/tyk-kubernetes-ingress-controller.md" >}}) for details on installing Tyk *Self-managed* as a Kubernetes ingress controller.
