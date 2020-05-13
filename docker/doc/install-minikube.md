# Install Minikube on Ubuntu 18.04

Using the hypervisor [KMV](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine).  
It can also be installed on [Virtualbox](https://en.wikipedia.org/wiki/VirtualBox), which is more documented.

## KMV

- Install:

```bash
# kvm install
sudo apt update
sudo apt install qemu qemu-kvm libvirt-bin  bridge-utils  virt-manager
```

- Test:

```bash
# kvm test
sudo kvm-ok
sudo virt-host-validate
```

## KVM Drivers

- Install:

```bash
# kvm2 drivers
sudo apt install libvirt-clients libvirt-daemon-system qemu-kvm
```

## Minikube

- Install:

```bash
# minikube install
curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-kvm2 && sudo install docker-machine-driver-kvm2 /usr/local/bin/
```

- Test:

```bash
# minikube test
minikube version --client
```

- Config:

```bash
# minikube config
minikube config set vm-driver kvm2
```

## Kubectl

- Install (straight from [official doc](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-using-native-package-management)):

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https gnupg2
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

- Test:

```bash
kubectl version --client
```

- Suggestion:

```bash
# set up alias
alias k=kubectl
```

