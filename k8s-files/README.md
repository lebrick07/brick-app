## Installing Brickbot UI
### Install
```
kubectl apply -f deploy-brick.yaml
```

### Delete
```
kubectl delete -f deploy-brick.yaml
```

## Installing MongoDB

### Create storage cloass
If deploying locally use:
```
kubectl apply -f hostpath-storage.yaml
```
If deploying to AWS use: 
```
kubectl apply -f ebs-storage.yaml
```
### Create PV and PVC
```
kubectl apply -f persistent-vol-claim.yaml
```
### Add bitnami mongodb repo
```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```
### Install MongoDB
```
helm install mongodb bitnami/mongodb --version 13.9.4 -f values.yaml
```

### Upgrade
```
helm upgrade mongodb bitnami/mongodb --version 13.9.4 -f values.yaml
```

### Uninstall
```
helm uninstall mongodb bitnami/mongodb
```