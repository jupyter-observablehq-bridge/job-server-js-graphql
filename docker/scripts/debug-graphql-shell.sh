#!/bin/bash

# graphql-server shell
POD=$(kubectl get pod | grep deploy-graphql | awk '{print $1}')
kubectl exec -it $POD -- sh
