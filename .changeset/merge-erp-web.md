---
"@pine/erp-web": minor
"@pine/api-gateway": patch
"@pine/issues-service": patch
"@pine/inventory-service": patch
"@pine/attachment-service": patch
---

feat(web): merge issues-web and inventory-web into a single erp-web app

Product UI lives in `@pine/erp-web` (port 3001) with OIDC PKCE auth and an inventory route shell. Backend CORS and invite URLs use `ERP_WEB_URL` instead of separate issues/inventory web origins.
