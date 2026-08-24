import type { RemoteGraphQLDataSource } from "@apollo/gateway";
import { readTlsFile } from "@pine/server";
import https from "node:https";

const caCert = readTlsFile(".local/tls/ca/ca.crt");
const httpsAgent = new https.Agent({ ca: caCert });

type GatewayFetcher = NonNullable<
  ConstructorParameters<typeof RemoteGraphQLDataSource>[0]
>["fetcher"];

export const customFetcher: GatewayFetcher = (url, init) => {
  const parsedUrl = new URL(String(url));


  const headers = new Headers(init?.headers);

  return new Promise<Response>((resolve, reject) => {
    const req = https.request(
      {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: `${parsedUrl.pathname}${parsedUrl.search}`,
        method: init?.method ?? "GET",
        headers: Object.fromEntries(headers.entries()),
        agent: httpsAgent,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf8");
          const responseHeaders = new Headers();
          for (const [key, value] of Object.entries(res.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const item of value) {
                responseHeaders.append(key, item);
              }
            } else {
              responseHeaders.set(key, value);
            }
          }
          resolve(
            new Response(body, {
              status: res.statusCode ?? 200,
              statusText: res.statusMessage ?? "",
              headers: responseHeaders,
            }),
          );
        });

      },
    );

    req.on("error", reject);

    if (init?.body) {
      req.write(init.body);
    }

    req.end();
  });
};
