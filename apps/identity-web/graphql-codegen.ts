import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../services/api-gateway/dist/supergraph.graphql",
  documents: ["src/graphql/**/*.{gql,graphql}"],
  ignoreNoDocuments: true,
  generates: {
    "src/__generated__/gql/graphql.ts": {
      plugins: ["typescript"],
      config: {
        enumsAsTypes: true,
      },
    },
    "src/__generated__/gql/hooks.ts": {
      plugins: [
        // Import + re-export so fetcher is in scope for hooks and unused when documents are empty.
        {
          add: {
            content:
              "import { graphQLFetcher } from '../../graphql/fetcher';\nexport { graphQLFetcher };",
          },
        },
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        importSchemaTypesFrom: "./src/__generated__/gql/graphql",
        exposeDocument: true,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        addInfiniteQuery: false,
        reactQueryVersion: 5,
        fetcher: {
          func: "graphQLFetcher",
          isReactHook: false,
        },
      },
    },
  },
};

export default config;
