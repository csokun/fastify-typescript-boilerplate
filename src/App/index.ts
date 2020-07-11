// Locals
import { Application } from '../types';
import { Healthz } from './Healthz';
import * as Schemas from './schemas';

export async function App(app: Application, options: unknown): Promise<void> {
    // register routes
    app.register(Healthz, options);

    // catch-all
    app.get('*', { schema: Schemas.catchAllSchema }, async () => '');
}