/* eslint-disable @typescript-eslint/no-var-requires */
import * as Fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
const helmet = require('fastify-helmet');

import { Logger, Swagger, genReqId } from './Common';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function create({
  disableRequestLogging = false,
  loggerConfig,
  swaggerConfig,
}): Fastify.FastifyInstance<Server, IncomingMessage, ServerResponse, Fastify.FastifyLoggerInstance> {
  const fastify: Fastify.FastifyInstance = Fastify.fastify({
    logger: Logger.create({ ...loggerConfig }),
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

