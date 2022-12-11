import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

export type Application = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyLoggerInstance
>;
