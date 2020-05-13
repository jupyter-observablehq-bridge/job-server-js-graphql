#!/bin/bash

# redis logs
POD=$(kubectl get pod | grep deploy-redis | awk '{print $1}')
kubectl logs -f $POD

