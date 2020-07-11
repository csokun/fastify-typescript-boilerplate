import { FastifySchema } from "fastify";

export interface FastifySwaggerSchema extends FastifySchema {
    summary?: string,
    description?: string
}

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

export interface IConfiguration {
    web: IWebOptions,
    fastify: IFastifyCustomOptions,
    logger: ILoggerCustomOptions
}