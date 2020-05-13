#!/bin/bash

# undeploy deploy svc
kubectl delete cm job-config
kubectl delete deploy deploy-graphql deploy-redis deploy-gui
kubectl delete svc srv-graphql srv-redis srv-gui
kubectl delete ing ing-job

