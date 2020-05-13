#!/bin/bash

# go to folder docker/
PATH_SCRIPT="$(realpath $0)"
DIR_SCRIPT="$(dirname $PATH_SCRIPT)"
echo "DIR_SCRIPT = \"$DIR_SCRIPT\""
cd $DIR_SCRIPT && cd ..


# replace by your secure password
export REDIS_PWD="mysecret"

# create secret
kubectl create secret generic job-secret \
        --from-literal=redis-pwd=$REDIS_PWD

