# JOB server

JOB stands for [Jupyter](https://jupyter.org/)-[ObservableHQ](https://observablehq.com/)-Bridge.

A JOB server has 2 parts:

- a [Redis](https://redis.io/) instance
- an [Apollo server](https://www.apollographql.com/docs/apollo-server/) offering a [GraphQL](https://graphql.org/) API

Two ways to containerize and launch the JOB server:

- [Docker Compose](https://docs.docker.com/compose/) - probably simpler for a local deployment
- [Kubernetes](https://kubernetes.io/) - for a proper cloud deployment

## Build Image

Before running the container their images must be pulled and/or created.

```bash
# redis
docker pull redis:latest

# graphql server
# from folder docker/
IMG_NAME="oscar6echo/job-graphql-server:1.0"
rm ./graphql-server/package.json
cp ../package.json ./graphql-server/package.json
rm -rf ./graphql-server/src
cp -rf ../src ./graphql-server/src
docker image rm $IMG_NAME
docker build -t $IMG_NAME graphql-server
```

## Docker Compose

- Launch:

```bash
# server
cd compose
docker-compose up
```

- Test redis:

```bash
# using redis image
docker run -it --rm --network="host" redis redis-cli -p 6479
# or directly (if installed)
redis-cli -p 6479

# authenticate
auth mysecret
# sample commands
set foo 42
get foo
```

- Test GraphQL server:

Open `http://localhost:4001`.  
You should see a [GraphQL playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/).  
Try sample [requests](../README.md).

- Stop:

```bash
# server
cd compose
docker-compose down
```

At this stage the JOB is up and running.

## Kubernetes

### Setup

In this section, we use [minkube](https://kubernetes.io/docs/setup/learning-environment/minikube/).  
From there it is standard procedure to deploy it on a cloud.

[Here](doc/install-minikube) are the instructions to deploy it on Ubuntu 18.04.

- Start minikube:

```bash
# minikube start
minikube start
# or if no config
minikube start --vm-driver kvm2
```

- Test:

```bash
# minikube test
minikube status
minikube service list

# kubectl test
kubectl version
kubectl cluster-info
kubectl get node
kubectl get pod --all-namespaces

# -- kvm specific

# gui
virt-manager

# virtual bridge
ip a | grep virbr

```

### Deploy

- Enter minikube context:

```bash
# enter minikube context
eval $(minikube -p minikube docker-env)

# leave minikube context
eval $(minikube -p minikube docker-env -u)
```

_NOTE_: Below all commands are assumed to run from directory `kube/`.

- Pull/build images in minikube:

```bash
docker pull redis:latest

# from repo top repo
cp ../job-server-js-graphql/package.json ./graphql-server/package.json
cp -rf ../job-server-js-graphql/src ./graphql-server/src
docker build -t oscar6echo/job-graphql-server:1.0 graphql-server
```

- Create secret for redis password:

```bash
export REDIS_PWD="mysecret"

# create secret
kubectl create secret generic job-secret \
        --from-literal=redis-pwd=$REDIS_PWD
```

- Create configmap for redis conf:

```bash
# create redis conf
kubectl create configmap my-redis-conf --from-file=./redis/conf/redis.conf
```

- Deploy:

```bash
# deploy
kubectl create -f ./kube/kube.yml
```

- Get IPs:

```bash
# external ip
minikube ip
minikube service list
```

- Forward services to localhost:
  - **IMPORTANT** for browser access - see below
  - _NOTE_: Only one service at a time

```bash
# example for graphql-server access on localhost:8002
kubectl port-forward service/srv-graphql 8002:4100

# example for redis access on localhost:8001
# assuming redis direct access ie. version 1 in kube.yaml
kubectl port-forward service/srv-redis 8001:6479
```

- Test:

```bash
# redis - assuming redis direct access ie. version 1 in kube.yaml
docker run -it --rm --network="host" redis redis-cli -h $(minikube ip) -p 30591
# or directly (if installed)
redis-cli -p 8001

# authenticate
auth mysecret
# sample commands
set foo 42
get foo
```

Open `http://localhost:8002`.  
You should see a [GraphQL playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/).  
Try sample [requests](../README.md).

- Undeploy

```bash
# undeploy
kubectl delete secret job-secret
kubectl delete cm bridge-config
kubectl delete deploy deploy-graphql deploy-redis
kubectl delete svc srv-graphql srv-redis
```

### Debug

For convenience the commands below are grouped in shell scripts in folder [scripts](scripts/):

```bash
# debug

# kube dashboard
minikube dashboard

# redis logs
POD=$(kubectl get pod | grep deploy-redis | awk '{print $1}')
kubectl logs -f $POD

# graphql-server logs
POD=$(kubectl get pod | grep deploy-graphql | awk '{print $1}')
kubectl logs -f $POD

# exec

# redis cli
POD=$(kubectl get pod | grep deploy-redis | awk '{print $1}')
kubectl exec -it $POD -- redis-cli

# redis shell
POD=$(kubectl get pod | grep deploy-redis | awk '{print $1}')
kubectl exec -it $POD -- sh

# graphql-server shell
POD=$(kubectl get pod | grep deploy-graphql | awk '{print $1}')
kubectl exec -it $POD -- sh
```
