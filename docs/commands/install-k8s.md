# Install k8s resources

## Install Ingress Controller on GKE

```powershell
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin  --user $(gcloud config get-value account) # Optional for GKE
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
helm install attachment-postgres ./k8s/postgres --values ./k8s/postgres/attachment.values.yaml
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
helm install email-stream ./k8s/nats-stream --set streamName=email
helm install project-stream ./k8s/nats-stream --set streamName=project
helm install issue-stream ./k8s/nats-stream --set streamName=issue
helm install user-stream ./k8s/nats-stream --set streamName=user
helm install workspace-stream ./k8s/nats-stream --set streamName=workspace

# Consumers
# User
helm install user-created-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/user.created.yaml
helm install user-updated-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/user.updated.yaml
# Project
helm install project-created-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/project.created.yaml
helm install project-updated-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/project.updated.yaml
helm install project-member-created-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/project.member-created.yaml

# Issue
helm install issue-created-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/issue.created.yaml

# Email
helm install email-created-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/email.created.yaml

# Workspace
helm install workspace-created-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/workspace.created.yaml
helm install workspace-updated-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/workspace.updated.yaml
helm install workspace-invite-created-consumer ./k8s/nats-consumer --values ./k8s/nats-consumer/values/workspace.invite.yaml
```

## Use google DNS

```powershell
kubectl edit configmap coredns -n kube-system

# Replace forward block with
forward . 8.8.8.8 8.8.4.4 {
    max_concurrent 1000
}

kubectl rollout restart deployment coredns -n kube-system
```

<!-- Docker desktop -->

```powershell
kubectl port-forward activity-postgres-db-m7fv-0 5429:5432
kubectl port-forward attachment-postgres-db-h4zj-0 5430:5432
kubectl port-forward email-postgres-db-787b-0 5431:5432
kubectl port-forward identity-postgres-db-2tw4-0 5432:5432
kubectl port-forward issue-postgres-db-wngz-0 5433:5432
kubectl port-forward project-postgres-db-s2cw-0 5434:5432
kubectl port-forward user-postgres-db-8ljx-0 5435:5432
kubectl port-forward workspace-postgres-db-hrzc-0 5436:5432
```
