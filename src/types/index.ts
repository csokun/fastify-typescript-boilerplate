export { Application } from './application';
export { SwaggerSchema } from './swagger';

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
    swagger: ISwaggerOptions
}