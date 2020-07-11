/* eslint-disable @typescript-eslint/no-var-requires */
import * as Fastify from 'fastify';
const helmet = require('fastify-helmet');
import { Application, Logger, ISwaggerOptions } from '@Shared/types';
import { Swagger, genReqId } from './Common';

type fastifyCreateOptions = {
  disableRequestLogging: boolean,
  logger: Logger,
  swaggerConfig: ISwaggerOptions
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function create({
  disableRequestLogging = true,
  logger,
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
  fastify.register(helmet, {});
  fastify.register(Swagger, swaggerConfig);

  return fastify;
}

