export interface PgsqlConnectionConfig {
    database: string,
    user: string,
    password: string,
    host: string,
    port: number,
    ssl: boolean
}