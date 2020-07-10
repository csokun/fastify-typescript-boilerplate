export const Healthz = (fastify, options, done) => {

    // @dev - perform app health-check
    fastify.get('/healthz', () => 'OK');

    done()
}