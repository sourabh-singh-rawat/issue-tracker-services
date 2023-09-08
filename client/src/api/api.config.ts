import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const URL = "https://localhost/api/v1";
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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status == 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: `${URL}/identity/refresh`, method: "POST" },
          api,
          extraOptions,
        );

        if (!refreshResult.error) {
          result = await baseQuery(args, api, extraOptions);
        }
      } catch (error) {
        console.log(error);
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

export default apiSlice;
