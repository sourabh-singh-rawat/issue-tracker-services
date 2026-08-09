import { httpClient } from "@bootstrap/http-client";

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: ReadonlyArray<{ message: string }>;
};

export const graphQLFetcher = <TData, TVariables>(
  query: string | { toString(): string },
  variables?: TVariables,
  headers?: HeadersInit,
) => {
  return async () => {
    const { data: body } = await httpClient.post<GraphQLResponse<TData>>(
      "/graphql",
      { query: String(query), variables },
      { headers: headers as Record<string, string> | undefined },
    );

    if (body.errors?.length) {
      throw new Error(body.errors.map((error) => error.message).join(", "));
    }

    if (body.data === undefined) {
      throw new Error("GraphQL response did not include data");
    }

    return body.data;
  };
};
