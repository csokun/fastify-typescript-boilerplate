import { IPgSQLConnectionOptions } from './pgsql';
import { IMetricsOptions } from './metric';

export { Application } from './application';
export { SwaggerSchema } from './swagger';
export { IPgSQLConnectionOptions } from './pgsql';
export { Logger } from './logger';
export { IMetricsOptions } from './metric';

export interface IWebOptions {
    port: number,
    ip: string
}
export interface ILoggerCustomOptions {
    name: string,
    level: string,
    enabled: boolean,
    redact?: string[],
    prettyPrint?: boolean
}

export interface IFastifyCustomOptions {
    disableRequestLogging: boolean
}

export interface ISwaggerOptions {
    title?: string,
    enabled: boolean,
}
export interface IAppConfig {
    web: IWebOptions,
    fastify: IFastifyCustomOptions,
    logger: ILoggerCustomOptions,
    swagger: ISwaggerOptions,
    pgsql: IPgSQLConnectionOptions,
    metrics: IMetricsOptions
}