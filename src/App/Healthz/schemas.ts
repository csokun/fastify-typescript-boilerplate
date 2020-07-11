import { FastifySwaggerSchema } from '../../Shared/types';

export const healthSchema: FastifySwaggerSchema = {
    summary: 'Health Check',
    description: 'Checking if the app still alive',
    response: {
    }
}
