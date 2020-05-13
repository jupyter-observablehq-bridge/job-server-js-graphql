#!/bin/bash

# graphql-server logs
POD=$(kubectl get pod | grep deploy-graphql | awk '{print $1}')
kubectl logs -f $POD

