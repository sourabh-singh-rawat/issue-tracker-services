# Add objects to cluster

## Install Ingress Controller

```powershell
kubectl apply -f ./k8s/ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

```powershell
kubectl apply -f ./k8s/services
kubectl apply -f ./k8s/secrets
kubectl apply -f ./k8s/persistent-volumes
kubectl apply -f ./k8s/persistent-volume-claims
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
kubectl apply -f ./k8s/nats/streams/
kubectl apply -f ./k8s/nats/consumers/
```
