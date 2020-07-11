// Shared
import { Server, AppConfig } from './Infra';
// App
import { App } from './App';
import { IConfiguration } from './IConfiguration';

const appConfig = AppConfig.loadConfig<IConfiguration>({
    configPath: '../../../config',
});
const {
    web: { port, ip },
    fastify: fastifyConfig,
    logger: loggerConfig
} = appConfig;

const fastify = Server.create({
    ...fastifyConfig,
    loggerConfig,
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
