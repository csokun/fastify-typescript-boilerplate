export type IConfiguration = {
    web: {
        port: number,
        ip: string
    },
    fastify: {
        disableRequestLogging: boolean
    },
    logger: {
        name: string,
        enabled: boolean,
        redact?: string[],
        prettyPrint?: boolean
    }
}