# djhsakjd

## Setup

```
oc login
oc new-project snapscreen

oc create -f openshift/mongo-service.yaml
oc create -f openshift/mongo-controller.yaml

oc create -f openshift/server-imagestream.yaml
oc create -f openshift/server-service.yaml
oc create -f openshift/server-build-config.yaml
oc create -f openshift/server-deployment-config.yaml
```