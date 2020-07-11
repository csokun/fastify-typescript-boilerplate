import { Application } from '../../types';
import * as Schemas from './schemas';

export async function Healthz(app: Application): Promise<void> {
    // @dev - perform app health-check
    app.get('/healthz', { schema: Schemas.healthSchema }, async () => 'OK');
}