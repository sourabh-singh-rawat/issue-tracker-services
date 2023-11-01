# Install k8s resources

## Install Ingress Controller

```powershell
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin  --user $(gcloud config get-value account)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f ./k8s/ingress
```

```powershell
kubectl apply -f ./k8s/secrets
```

## Install PGO

```powershell
helm install pgo ./k8s/pgo
```

## Helm release for Postgres resources

```powershell
helm install activity-postgres ./k8s/postgres --values ./k8s/postgres/activity.values.yaml
helm install email-postgres ./k8s/postgres --values ./k8s/postgres/email.values.yaml
helm install identity-postgres ./k8s/postgres --values ./k8s/postgres/identity.values.yaml
helm install issue-postgres ./k8s/postgres --values ./k8s/postgres/issue.values.yaml
helm install project-postgres ./k8s/postgres --values ./k8s/postgres/project.values.yaml
helm install user-postgres ./k8s/postgres --values ./k8s/postgres/user.values.yaml
helm install workspace-postgres ./k8s/postgres --values ./k8s/postgres/workspace.values.yaml
```

## Helm release for Nats Controller

```powershell
kubectl apply -f https://github.com/nats-io/nack/releases/latest/download/crds.yml
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm install nats nats/nats --values ./k8s/nats/values.yaml
helm install nack nats/nack --set jetstream.nats.url=nats://nats:4222
```

## Create Nats Streams and Consumers

```powershell
# Streams
helm install project-stream ./k8s/nats-stream --set streamName=project
helm install user-stream ./k8s/nats-stream --set streamName=user
helm install workspace-stream ./k8s/nats-stream --set streamName=workspace

# Consumers
helm install user-consumer-identity ./k8s/nats-consumer --set serviceName=identity,streamName=user
helm install user-consumer-issue ./k8s/nats-consumer --set serviceName=issue,streamName=user
helm install user-consumer-project ./k8s/nats-consumer --set serviceName=project,streamName=user
helm install user-consumer-workspace ./k8s/nats-consumer --set serviceName=workspace,streamName=user

helm install user-consumer-activity ./k8s/nats-consumer --set serviceName=activity,streamName=user
helm install project-consumer-activity ./k8s/nats-consumer --set serviceName=activity,streamName=project

helm install workspace-consumer-project ./k8s/nats-consumer --set serviceName=project,streamName=workspace
helm install workspace-invite-created-consumer-email ./k8s/nats-consumer --set serviceName=email,streamName=workspace
```

<!-- Docker desktop -->
```powershell
kubectl port-forward activity-postgres-db-xbt5-0 5430:5432
kubectl port-forward email-postgres-db-z2h8-0 5431:5432
kubectl port-forward identity-postgres-db-8vj7-0 5432:5432
kubectl port-forward issue-postgres-db-4j86-0 5433:5432
kubectl port-forward project-postgres-db-k62h-0 5434:5432
kubectl port-forward user-postgres-db-9nfv-0 5435:5432
kubectl port-forward workspace-postgres-db-76hh-0 5436:5432


# GKE
kubectl port-forward activity-postgres-db-bhms-0 5430:5432
kubectl port-forward email-postgres-db-qjp9-0 5431:5432
kubectl port-forward identity-postgres-db-b8ng-0 5432:5432
kubectl port-forward issue-postgres-db-rpgq-0 5433:5432
kubectl port-forward project-postgres-db-lg64-0 5434:5432
kubectl port-forward user-postgres-db-h69j-0 5435:5432
kubectl port-forward workspace-postgres-db-n69c-0 5436:5432
```
