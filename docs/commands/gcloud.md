# Google Kubernetes Engine

```powershell
gcloud container node-pools list --cluster=issue-tracker-cluster-0 --zone=asia-south1-a
gcloud container clusters resize issue-tracker-cluster-0 --num-nodes 0 --zone=asia-south1-a
gcloud container clusters resize issue-tracker-cluster-0 --num-nodes 1 --zone=asia-south1-a
gcloud container clusters get-credentials issue-tracker-cluster-0 --zone asia-south1-a --project issue-tracker-47
```
