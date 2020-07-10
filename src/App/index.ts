// Locals
import { Healthz } from './Healthz';

export const App = (fastify, options, done) => {
    // register routes
    fastify.register(Healthz, options);

    // catch-all
    fastify.get('*', () => '');
    done()
}