# Deploying NATS on our k8s cluster using helm

Checkout <https://github.com/nats-io/nack>

or following installation process a below

Install Jetstream Common Resources on your k8s cluster.

```powershell
kubectl apply -f https://github.com/nats-io/nack/releases/latest/download/crds.yml
```

Install official NATS's helm repository where charts are stored.

```powershell
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
```

Install `nats with jetstream` from downloaded repository

```powershell
helm install nats nats/nats --set config.jetstream.enabled=true
```

Install `nack` i.e. nats controller from downloaded repository

```powershell
helm install nack nats/nack --set jetstream.nats.url=nats://nats:4222
```
