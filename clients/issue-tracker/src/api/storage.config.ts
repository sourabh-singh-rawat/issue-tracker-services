import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const URL = "http://localhost:4003";
const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  credentials: "include",
  referrerPolicy: "origin-when-cross-origin",
});

/**
 * If the intial query returns 401 resend to refresh route
 * @param args
 * @param api
 * @param extraOptions
 * @returns
 */
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let response = await baseQuery(args, api, extraOptions);

  if (response.error && response.error.status == 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResponse = await baseQuery(
          {
            url: "http://localhost:4001/api/v1/refresh-tokens",
            method: "POST",
          },
          api,
          extraOptions,
        );

        if (!refreshResponse.error) {
          response = await baseQuery(args, api, extraOptions);
        }
      } catch (error) {
        console.log(error);
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      response = await baseQuery(args, api, extraOptions);
    }
  }

  return response;
};

export const apiSlice = createApi({
  reducerPath: "storage-api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

export default apiSlice;
