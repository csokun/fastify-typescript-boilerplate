import * as Fastify from 'fastify';
import { Logger } from './Common';
import * as uuid from 'uuid';
const helmet = require('fastify-helmet');

const genReqId = (req) => {
  let correlatonId = req.headers['x-correaltionid']
    || req.headers['x-correlation-id']
    || req.headers['request-id']
    || uuid.v4();

  return correlatonId;
}

export function create({
  disableRequestLogging = false,
  loggerConfig,
}) {
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

