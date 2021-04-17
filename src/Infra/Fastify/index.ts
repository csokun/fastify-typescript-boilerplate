/* eslint-disable @typescript-eslint/no-var-requires */
import * as Fastify from 'fastify';
const helmet = require('fastify-helmet');
import { genReqId } from './Common';
import {
  Swagger,
  Massive,
  Metrics,
  OpenTelemetry,
} from './Plugins';
import {
  Application,
  Logger,
  ISwaggerOptions,
  IPgSQLConnectionOptions,
  IMetricsOptions,
  IOpenTelemetryConfig
} from '@Shared/Types';

type fastifyCreateOptions = {
  disableRequestLogging: boolean,
  logger: Logger,
  metricsConfig?: IMetricsOptions,
  pgsqlConfig?: IPgSQLConnectionOptions,
  swaggerConfig?: ISwaggerOptions
  telemetryConfig?: IOpenTelemetryConfig
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function create({
  disableRequestLogging = true,
  logger,
  metricsConfig,
  pgsqlConfig,
  swaggerConfig,
  telemetryConfig,
}: fastifyCreateOptions): Application {
  const fastify: Application = Fastify.fastify({
    logger,
    disableRequestLogging,
    requestIdHeader: 'correlationId',
    requestIdLogLabel: 'correlationId',
    genReqId,
  });

  // global plugin
  // ref. https://github.com/fastify/fastify-helmet
  fastify
    .register(helmet, {})
    .register(Swagger, swaggerConfig)
    .register(Massive, pgsqlConfig)
    .register(Metrics, metricsConfig);

  // openTelemetry
  if (telemetryConfig.enabled) {
    fastify.register(OpenTelemetry, telemetryConfig)
  }

  return fastify;
}

