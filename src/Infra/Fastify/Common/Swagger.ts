import { ISwaggerOptions } from "src/Shared/types";

import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swagger = require('fastify-swagger');

export async function Swagger(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    options: ISwaggerOptions
): Promise<void> {
    const routePrefix = '/documentations';

    if (options.enabled) {
        fastify.register(swagger, {
            swagger: {
                info: {
                    title: 'Test swagger',
                    description: 'testing the fastify swagger api',
                    version: '0.1.0'
                },
            },
            exposeRoute: true,
            routePrefix
        });
        return;
    }

    fastify.get(routePrefix, async (req, reply) => {
        reply.status(404);
    });
}