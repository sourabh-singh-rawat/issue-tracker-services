# Commands

## build-docs

```powershell
npx @redocly/cli build-docs ./openapi.yaml --output=./dist/api.html
```

## bundle

```powershell
npx @redocly/cli bundle ./openapi.yaml --output ./dist/openapi.yaml --remove-unused-components
npx @redocly/cli bundle ./openapi.yaml --output ./dist/openapi.json --format json --remove-unused-components
```

## split

```powershell
npx @redocly/cli split ./dist/openapi.yaml --outDir ./dist/split
```
