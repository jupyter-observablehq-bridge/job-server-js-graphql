#!/bin/bash

# redis cli
POD=$(kubectl get pod | grep deploy-redis | awk '{print $1}')
kubectl exec -it $POD -- redis-cli
