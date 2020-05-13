#!/bin/bash

# go to folder docker/
PATH_SCRIPT="$(realpath $0)"
DIR_SCRIPT="$(dirname $PATH_SCRIPT)"
echo "DIR_SCRIPT = \"$DIR_SCRIPT\""
cd $DIR_SCRIPT && cd ..


# deploy
kubectl create -f ./kube/kube.yml

