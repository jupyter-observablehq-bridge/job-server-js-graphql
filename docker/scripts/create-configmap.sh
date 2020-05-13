#!/bin/bash

# go to folder docker/
PATH_SCRIPT="$(realpath $0)"
DIR_SCRIPT="$(dirname $PATH_SCRIPT)"
echo "DIR_SCRIPT = \"$DIR_SCRIPT\""
cd $DIR_SCRIPT && cd ..


export REDIS_CONF="./redis/conf/redis.conf"

# create redis conf
kubectl create configmap my-redis-conf --from-file=$REDIS_CONF
