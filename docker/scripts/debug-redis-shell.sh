#!/bin/bash

# redis shell
POD=$(kubectl get pod | grep deploy-redis | awk '{print $1}')
kubectl exec -it $POD -- sh

