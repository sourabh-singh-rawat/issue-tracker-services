# Install k8s resources

## Install Ingress Controller

```powershell
kubectl apply -f ./k8s/ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

```powershell
kubectl apply -f ./k8s/secrets
```

## Helm release for postgres resources

```powershell
helm install identity-postgres ./k8s/postgres --values ./k8s/postgres/identity.values.yaml
helm install user-postgres ./k8s/postgres --values ./k8s/postgres/user.values.yaml
helm install workspace-postgres ./k8s/postgres --values ./k8s/postgres/workspace.values.yaml
```

## Helm release for NATS Controller

```powershell
kubectl apply -f https://github.com/nats-io/nack/releases/latest/download/crds.yml
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm install nats nats/nats --values ./k8s/nats/values.yaml
helm install nack nats/nack --set jetstream.nats.url=nats://nats:4222
```

## Create NATS Streams and Consumers

```powershell
# Streams
helm install user-stream ./k8s/nats-stream --set streamName=user
helm install workspace-stream ./k8s/nats-stream --set streamName=workspace  

# Consumers
helm install user-consumer-identity ./k8s/nats-consumer --set serviceName=identity,streamName=user
helm install user-consumer-workspace ./k8s/nats-consumer --set serviceName=workspace,streamName=user
```
