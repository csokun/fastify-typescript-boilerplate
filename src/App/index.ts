// Locals
import { Healthz } from './Healthz';

export const App = (fastify, options, done): void => {
    // register routes
    fastify.register(Healthz, options);

    // catch-all
    fastify.get('*', () => '');
    done()
}