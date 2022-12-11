import * as path from 'path';
import { Logger, AppConfig } from '../../Infra';
import { PgsqlMigration } from './PgsqlMigration';
// 1. connection string
// 2. migration directory
import { IAppConfig } from '@Shared/Types';

const { pgsql: pgsqlConfig, logger: loggerConfig } =
  AppConfig.loadConfig<IAppConfig>({
    configPath: '../../../config',
  });
const logger = Logger.create(loggerConfig);
// const args = process.argv;
(async () => {
  const tool = new PgsqlMigration(pgsqlConfig, logger);
  await tool.create();
  const scriptPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'priv',
    'migrations'
  );
  await tool.migrate(scriptPath);
})();
