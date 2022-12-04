/* eslint-disable @typescript-eslint/no-var-requires */
const fp = require('fastify-plugin');
const metricsPlugin = require('fastify-metrics');

import { IMetricsOptions, Application } from '@Shared/Types';

async function massivePlugin(app: Application, options: IMetricsOptions): Promise<void> {
    if (!options.enabled) return;
    app.log.info('Metrics plugin enabled');
    app.register(metricsPlugin, { ...options });
}

export const Metrics = fp(massivePlugin, {
    fastify: '4.x',
    name: 'Metrics'
});