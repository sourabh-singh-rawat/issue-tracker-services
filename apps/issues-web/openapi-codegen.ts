import type { UserConfig } from "@hey-api/openapi-ts";

const config: UserConfig = {
  input: "../../services/api-gateway/dist/platform.openapi.json",
  output: {
    path: "src/__generated__/api",
    clean: true,
  },
  plugins: [
    {
      name: "@hey-api/client-axios",
      runtimeConfigPath: "./src/bootstrap/hey-api.ts",
    },
    "@hey-api/typescript",
    "@hey-api/sdk",
    {
      name: "@tanstack/react-query",
      queryOptions: true,
      queryKeys: true,
      mutationOptions: true,
      useQuery: true,
      useMutation: true,
    },
  ],
};

export default config;
