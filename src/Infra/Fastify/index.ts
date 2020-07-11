import * as Fastify from 'fastify';
import { Logger } from './Common';
import * as uuid from 'uuid';
import { Server, IncomingMessage, ServerResponse } from 'http';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('fastify-helmet');

const genReqId = (req): string => {
  const correlatonId = req.headers['x-correaltionid']
    || req.headers['x-correlation-id']
    || req.headers['request-id']
    || uuid.v4();

  return correlatonId;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function create({
  disableRequestLogging = false,
  loggerConfig
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

  return fastify;
}

