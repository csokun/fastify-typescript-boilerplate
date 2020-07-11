// Locals
import { Healthz } from './Healthz';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

export async function App(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>,
    options: unknown
): Promise<void> {
    // register routes
    fastify.register(Healthz, options);

    // catch-all
    fastify.get('*', {}, async () => '');
}