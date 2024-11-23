import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "src/api/**/*.graphql",
  generates: {
    "src/api/codegen/gql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  config: {
    withHOC: false,
    withComponent: false,
    withHooks: true,
  },
};

export default config;
