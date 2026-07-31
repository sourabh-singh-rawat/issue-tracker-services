import FastifyOtelInstrumentation from "@fastify/otel";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { logs, metrics, NodeSDK, type NodeSDKConfiguration } from "@opentelemetry/sdk-node";

export type CreateNodeSdkOptions = Partial<
  Pick<NodeSDKConfiguration, "serviceName" | "resource">
> & {
  otlpEndpoint: string;
};

export const createNodeSdk = (options: CreateNodeSdkOptions): NodeSDK => {
  const { otlpEndpoint, ...sdkOptions } = options;
  const exporterConfig = { url: otlpEndpoint };

  return new NodeSDK({
    ...sdkOptions,
    instrumentations: [
      new HttpInstrumentation(),
      new FastifyOtelInstrumentation({ registerOnInitialization: true }),
      new GraphQLInstrumentation(),
      new PgInstrumentation(),
    ],
    traceExporter: new OTLPTraceExporter(exporterConfig),
    metricReaders: [
      new metrics.PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(exporterConfig),
      }),
    ],
    logRecordProcessors: [
      new logs.BatchLogRecordProcessor({
        exporter: new OTLPLogExporter(exporterConfig),
      }),
    ],
  });
};
