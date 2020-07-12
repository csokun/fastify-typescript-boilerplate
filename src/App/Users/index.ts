import { Application } from '@Shared/Types';
import * as Schemas from './schemas';

export async function Users(app: Application): Promise<void> {
    // @dev - perform app health-check
    app.get('/users', { schema: Schemas.usersSchema }, async () => [
        { id: 1, name: 'Joe Smith' },
        { id: 2, name: 'Carl Franston' }
    ]);
}