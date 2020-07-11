import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as Schemas from './schemas';

// ref. https://github.com/google/node-fastify-auto-push/blob/master/ts/src/index.ts
export async function Healthz(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
): Promise<void> {
    // @dev - perform app health-check
    fastify.get('/healthz', { schema: Schemas.healthSchema }, async () => 'OK');
}