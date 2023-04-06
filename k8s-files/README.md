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

### Create storage class
If deploying locally use:
```
kubectl apply -f k8s-files/storage/hostpath-storage.yaml
```
If deploying to AWS use: 
```
kubectl apply -f k8s-files/storage/ebs-storage.yaml
```
### Create PV and PVC
```
kubectl apply -f k8s-files/storage/persistent-vol-claim.yaml
```
### Add bitnami mongodb repo
```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```
### Install MongoDB
```
helm install mongodb bitnami/mongodb --version 13.9.4 -f k8s-files/storage/values.yaml
```

### Upgrade
```
helm upgrade mongodb bitnami/mongodb --version 13.9.4 -f k8s-files/storage/values.yaml
```

### Uninstall
```
helm uninstall mongodb bitnami/mongodb
```