import { ClientError, GraphQLClient } from "graphql-request";
import type { RequestDocument, Variables } from "graphql-request";

export class GraphQLRequestError extends Error {
  readonly status?: number;
  readonly errors?: ReadonlyArray<{
    message: string;
    path?: readonly (string | number)[];
  }>;

  constructor(
    message: string,
    opts?: {
      status?: number;
      errors?: GraphQLRequestError["errors"];
    },
  ) {
    super(message);
    this.name = "GraphQLRequestError";
    this.status = opts?.status;
    this.errors = opts?.errors;
  }
}

export const graphQLClient = new GraphQLClient(
  import.meta.env.VITE_SUPERGRAPH_URL,
  {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  },
);

/** Typed GraphQL request — only domain data-access hooks should call this. */
export async function gqlRequest<
  TResult,
  TVariables extends Variables = Variables,
>(document: RequestDocument, variables?: TVariables): Promise<TResult> {
  try {
    return await graphQLClient.request<TResult>(document, variables);
  } catch (err) {
    if (err instanceof ClientError) {
      const message =
        err.response.errors?.map((e) => e.message).join(", ") ||
        err.message ||
        "GraphQL request failed";
      throw new GraphQLRequestError(message, {
        status: err.response.status,
        errors: err.response.errors,
      });
    }
    throw err;
  }
}

/** Custom fetcher compatible with @graphql-codegen/typescript-react-query signature */
export function customFetcher<TData, TVariables extends Variables = Variables>(
  query: RequestDocument,
  variables?: TVariables,
  headers?: RequestInit["headers"],
): () => Promise<TData> {
  return async () => {
    try {
      return await graphQLClient.request<TData>(query, variables, headers);
    } catch (err) {
      if (err instanceof ClientError) {
        const message =
          err.response.errors?.map((e) => e.message).join(", ") ||
          err.message ||
          "GraphQL request failed";
        throw new GraphQLRequestError(message, {
          status: err.response.status,
          errors: err.response.errors,
        });
      }
      throw err;
    }
  };
}

