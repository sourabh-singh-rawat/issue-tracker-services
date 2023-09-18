# Add objects to cluster

## Dashboard UI (WIP)

```powershell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl proxy

# Create service account in default namespace
kubectl create serviceaccount dashboard -n default
# Create a cluster role binding
kubectl create clusterrolebinding dashboard-admin -n default --clusterrole=cluster-admin --serviceaccount=default:dashboard

# Optional: Install base64 decoder also will display the base64 decoded access token
scoop install main/base64
#  Get the access token
kubectl get secret $(kubectl get serviceaccount dashboard -o jsonpath="{.secrets[0].name}") -o jsonpath="{.data.token}" | base64 --decode
```

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
