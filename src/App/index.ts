// Locals
import { Application } from '@Shared/Types';
import { Healthz } from './Healthz';
import { Users } from './Users';

import * as Schemas from './schemas';

export async function App(app: Application, options: unknown): Promise<void> {
    // register routes
    app
        .register(Healthz, options)
        .register(Users, options);

    // catch-all
    app.get('*', { schema: Schemas.catchAllSchema }, async () => '');
}