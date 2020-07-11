declare module 'App' {
    export type WebOptions = {
        port: number,
        ip: string
    }
    export type LoggerCustomOptions = {
        name: string,
        level: string,
        enabled: boolean,
        redact?: string[],
        prettyPrint?: boolean
    }
    export type FastifyCustomOptions = {
        disableRequestLogging: boolean
    };
    export type IConfiguration = {
        web: WebOptions,
        fastify: FastifyCustomOptions,
        logger: LoggerCustomOptions
    }
}