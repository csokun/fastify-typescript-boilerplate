/* eslint-disable @typescript-eslint/no-var-requires */
import * as massive from 'massive';
const fp = require('fastify-plugin');

import { IPgSQLConnectionOptions, Application } from '@Shared/Types';

async function massivePlugin(app: Application, options: IPgSQLConnectionOptions): Promise<void> {
    if (options.enabled) {
        try {
            app.log.info('Massive plugin enabled');
            const db = await massive(options);
            app.decorate('pg', db);
        } catch (e) {
            app.log.error(e);
            process.exit(1);    // fatal
        }
    } else {
        app.log.trace('PgSQLConnectionOptions is not enabled');
    }
}

export const Massive = fp(massivePlugin, {
    fastify: '4.x',
    name: 'Massive'
});