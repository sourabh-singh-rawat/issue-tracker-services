# Setup

```powershell
kubectl port-forward deployment/identity-postgres-deployment 5432:5432
kubectl port-forward deployment/user-postgres-deployment 5433:5432
```

## NATS

```powershell
kubectl exec -it deployments/nats-box -- sh
```
