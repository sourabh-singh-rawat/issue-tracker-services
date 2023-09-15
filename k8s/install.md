# Add objects to cluster

```powershell
kubectl apply -f ./services
```

```powershell
kubectl apply -f ./secrets
```

```powershell
kubectl apply -f ./persistent-volumes
```

```powershell
kubectl apply -f ./persistent-volume-claims
```

## Install Ingress Controller

```powershell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```
