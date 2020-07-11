// External
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
// Locals
import { Healthz } from './Healthz';
import * as Schemas from './schemas';

export async function App(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>,
    options: unknown
): Promise<void> {
    // register routes
    fastify.register(Healthz, options);

    // catch-all
    fastify.get('*', { schema: Schemas.catchAllSchema }, async () => '');
}