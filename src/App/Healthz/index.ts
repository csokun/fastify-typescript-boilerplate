import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
// ref. https://github.com/google/node-fastify-auto-push/blob/master/ts/src/index.ts
export async function Healthz(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
): Promise<void> {
    // @dev - perform app health-check
    fastify.get('/healthz', {}, async () => 'OK');
}