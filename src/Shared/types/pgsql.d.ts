export interface IPgSQLConnectionOptions {
    database: string,
    user: string,
    password: string,
    host: string,
    port: number,
    poolSize: number,
    ssl: boolean
}