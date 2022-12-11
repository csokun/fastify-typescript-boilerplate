import * as pino from 'pino';
import { ILoggerCustomOptions, Logger } from '@Shared/Types';

export function create({
  name = 'sample-app',
  enabled = true,
  redact = [],
  level = 'info',
  prettyPrint = false,
}: ILoggerCustomOptions): Logger {
  const options = {
    name,
    enabled,
    level,
    redact: ['req.headers.authorization', ...redact],
    serializers: {
      res(reply) {
        // The default
        return {
          statusCode: reply.statusCode,
        };
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
          headers: request.headers,
        };
      },
    },
  };

  if (process.env.NODE_ENV !== 'production' && prettyPrint) {
    options['transport'] = {
      target: 'pino-pretty',
    };
  }

  return pino.default(options);
}
