/* eslint-disable @typescript-eslint/no-var-requires */
import * as Fastify from 'fastify';
const helmet = require('fastify-helmet');
import { Application } from '../../types';
import { Logger, Swagger, genReqId } from './Common';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function create({
  disableRequestLogging = false,
  loggerConfig,
  swaggerConfig,
}): Application {
  const fastify: Application = Fastify.fastify({
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

