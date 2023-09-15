# Commands

## build-docs

```powershell
npx @redocly/cli build-docs ./openapi.yaml --output=../client/src/api/generated/openapi.docs.html
```

## Compiles to client

```powershell
npx @redocly/cli bundle ./openapi.yaml --output ../client/src/api/generated/openapi.yaml --remove-unused-components --d
npx @redocly/cli bundle ./openapi.yaml --output ../client/src/api/generated/openapi.json --format json --remove-unused-components --d
```

## Compiles to identity

```powershell
npx @redocly/cli bundle ./openapi.yaml --output ../identity/src/app/generated/openapi.config.yaml --remove-unused-components --d
```
