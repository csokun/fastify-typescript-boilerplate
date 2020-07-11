export interface IPgSQLConnectionOptions {
    enabled: boolean,
    database: string,
    user: string,
    password: string,
    host: string,
    port: number,
    poolSize: number,
    ssl: boolean
}