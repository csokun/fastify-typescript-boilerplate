import { Application } from '@Shared/Types';
import { FastifyRequest } from 'fastify';
import * as Schemas from './schemas';

export async function Users(app: Application): Promise<void> {
    const userList = [
        { id: 1, name: 'Joe Smith' },
        { id: 2, name: 'Carl Franston' }
    ];

    app.get('/users', { schema: Schemas.usersSchema }, async () => userList);

    app.get('/users/telemetry', { schema: Schemas.usersSchema }, async (request: FastifyRequest) => {
        const {
            activeSpan,
            tracer,
            // context,
            // extract,
            // inject,
        } = request.openTelemetry()
        // Spans started in a wrapped route will automatically be children of the activeSpan.
        const childSpan = tracer.startSpan(`${activeSpan.spanContext.name} - child process`)
        // doSomeWork()
        childSpan.end()
        return userList;
    });
}