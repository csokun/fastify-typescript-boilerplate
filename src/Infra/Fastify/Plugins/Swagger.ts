/* eslint-disable @typescript-eslint/no-var-requires */
const swagger = require('@fastify/swagger');
const fp = require('fastify-plugin');

import { ISwaggerOptions, Application } from '@Shared/Types';

async function swaggerPlugin(
  app: Application,
  options: ISwaggerOptions
): Promise<void> {
  if (!options.enabled) return;
  app.log.info('Swagger plugin enabled');
  const routePrefix = '/documentations';
  app.register(swagger, {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.0',
      },
    },
    exposeRoute: options.enabled,
    staticCSP: true,
    transformStaticCSP: (header) => header,
    routePrefix,
  });
}

export const Swagger = fp(swaggerPlugin, {
  fastify: '4.x',
  name: 'Swagger',
});
