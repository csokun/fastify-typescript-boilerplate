import * as pino from 'pino';
import { ILoggerCustomOptions } from '../../../Shared/types';

export function create({
    name = 'sample-app',
    enabled = true,
    redact = [],
    level = 'info',
    prettyPrint = false
}: ILoggerCustomOptions): pino.Logger {
    return pino({
        name,
        enabled,
        level,
        prettyPrint,
        redact: [
            'req.headers.authorization',
            ...redact,
        ],
        serializers: {
            res(reply) {
                // The default
                return {
                    statusCode: reply.statusCode
                }
            },
            req(request) {
                return {
                    method: request.method,
                    url: request.url,
                    path: request.path,
                    parameters: request.parameters,
                    // Including the headers in the log could be in violation
                    // of privacy laws, e.g. GDPR. You should use the "redact" option to
                    // remove sensitive fields. It could also leak authentication data in
                    // the logs.
                    headers: request.headers
                };
            }
        }
    });
}