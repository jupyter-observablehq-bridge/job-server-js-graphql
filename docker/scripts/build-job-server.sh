#!/bin/bash

# go to folder docker/
PATH_SCRIPT="$(realpath $0)"
DIR_SCRIPT="$(dirname $PATH_SCRIPT)"
echo "DIR_SCRIPT = \"$DIR_SCRIPT\""
cd $DIR_SCRIPT && cd ..

IMG_NAME="oscar6echo/job-graphql-server:1.0"
rm ./graphql-server/package.json
cp ../package.json ./graphql-server/package.json
rm -rf ./graphql-server/src
cp -rf ../src ./graphql-server/src
docker image rm $IMG_NAME
docker build -t $IMG_NAME graphql-server