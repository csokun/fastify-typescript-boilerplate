import { SwaggerSchema } from '@Shared/types';

export const usersSchema: SwaggerSchema = {
    summary: 'List all user',
    description: 'Sample endpoint',
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' }
                }
            }
        }
    }
}
