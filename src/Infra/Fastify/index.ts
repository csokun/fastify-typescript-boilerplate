/* eslint-disable @typescript-eslint/no-var-requires */
import * as Fastify from 'fastify';
const helmet = require('fastify-helmet');
import { genReqId } from './Common';
import { Swagger, Massive } from './Plugins';
import {
  Application,
  Logger,
  ISwaggerOptions,
  IPgSQLConnectionOptions
} from '@Shared/types';

type fastifyCreateOptions = {
  disableRequestLogging: boolean,
  logger: Logger,
  pgsqlConfig?: IPgSQLConnectionOptions,
  swaggerConfig: ISwaggerOptions
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function create({
  disableRequestLogging = true,
  logger,
  pgsqlConfig,
  swaggerConfig,
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
    .register(Massive, pgsqlConfig);

  return fastify;
}

