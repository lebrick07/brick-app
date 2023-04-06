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