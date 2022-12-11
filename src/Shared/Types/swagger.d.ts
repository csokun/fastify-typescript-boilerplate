import { FastifySchema } from 'fastify';
export interface SwaggerSchema extends FastifySchema {
  summary?: string;
  description?: string;
}
