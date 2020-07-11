// Shared
import { Server, AppConfig, Logger } from './Infra';
// App
import { App } from './App';
import { IAppConfig } from '@Shared/types';

const appConfig = AppConfig.loadConfig<IAppConfig>({
    configPath: '../../../config',
});
const {
    web: { port, ip },
    fastify: fastifyConfig,
    logger: loggerConfig,
    pgsql: pgsqlConfig,
    swagger: swaggerConfig
} = appConfig;

const fastify = Server.create({
    ...fastifyConfig,
    logger: Logger.create({ ...loggerConfig }),
    pgsqlConfig,
    swaggerConfig,
});

fastify.register(App, {});

process.on("uncaughtException", error => {
    fastify.log.error(error);
});

process.on("unhandledRejection", error => {
    fastify.log.error(error);
});

fastify.listen(port, ip, (err) => {
    if (err) fastify.log.error(err);
});
