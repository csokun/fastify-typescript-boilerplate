import { createDb, migrate } from 'postgres-migrations';
import { PgsqlConnectionConfig, Logger } from '@Shared/types'

// ref. https://www.npmjs.com/package/postgres-migrations
export class PgsqlMigration {
    constructor(private dbConfig: PgsqlConnectionConfig, private log: Logger) { }

    async create(): Promise<void> {
        try {
            const dbName = 'test';
            await createDb(dbName, this.dbConfig)
        } catch (e) {
            e.message = `Unable to create database: ${e.message}`;
            this.log.error(e);
        }
    }

    async execute(scriptPath: string): Promise<void> {
        try {
            await migrate(this.dbConfig, scriptPath)
        } catch (e) {
            e.message = `Failed to migrate database: ${e.message}`;
            this.log.error(e);
        }
    }
}