// Shared
import { Server, AppConfig } from './Infra';
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
    swagger: swaggerConfig
} = appConfig;

const fastify = Server.create({
    ...fastifyConfig,
    loggerConfig,
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
