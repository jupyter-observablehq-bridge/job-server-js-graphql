#!/bin/bash

# undeploy
kubectl delete secret job-secret
kubectl delete cm job-config my-redis-conf
kubectl delete deploy deploy-graphql deploy-redis deploy-gui
kubectl delete svc srv-graphql srv-redis srv-gui
kubectl delete ing ing-job

