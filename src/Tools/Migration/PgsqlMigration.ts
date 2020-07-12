import * as PgSQL from 'postgres-migrations';
import { IPgSQLConnectionOptions, Logger } from '@Shared/Types'

// ref. https://www.npmjs.com/package/postgres-migrations
export class PgsqlMigration {
    constructor(private dbConfig: IPgSQLConnectionOptions, private log: Logger) { }

    async create(): Promise<void> {
        try {
            const { database } = this.dbConfig;
            await PgSQL.createDb(database, {
                ...this.dbConfig,
                defaultDatabase: 'postgres',
            })
        } catch (e) {
            e.message = `Unable to create database: ${e.message}`;
            this.log.error(e);
        }
    }

    async migrate(scriptPath: string): Promise<void> {
        try {
            this.log.info(`Migrating path: ${scriptPath}`);
            await PgSQL.migrate(this.dbConfig, scriptPath)
            this.log.info('Migration completed');
        } catch (e) {
            e.message = `Failed to migrate database: ${e.message}`;
            this.log.error(e);
        }
    }
}