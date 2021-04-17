# Configuration
https://www.fastify.io/docs/v3.0.x/TypeScript/
https://developer.okta.com/blog/2018/11/15/node-express-typescript

# Bundle Features

- Swagger
- Logger
- PostgreSQL: Migration & Massive integration
- [Feature Flags](https://gitlab.com/m03geek/fastify-feature-flags)
- [Metrics](https://gitlab.com/m03geek/fastify-metrics)


## PostgreSQL Integration

Enable PostgreSQL integration by updating the `pgsql` configuration properties in `config.json`.

```json
{
    "pgsql": {
        "enabled": true,
        "database": "data-name",
        "port": 5432,
        "poolSize": 10,
        "ssl": true
    }
}
```

For security reason use `ENV` variables or `secret.json` to configure the following properties:

```json
{
    "pgsql": {
        "user": "database-username",
        "password": "database-password",
        "host": "localhost",
    }
}
```

Or overwrite the configuration via `ENV` like:

```bash
app__pgsql__user=username \
app__pgsql__password=password \
npm start
```

### Database migration

The boilerplate has [postgres-migrations](https://www.npmjs.com/package/postgres-migrations) bundle.

Add your migration `*.sql` to `priv/migrations` using naming convention `<TIMESTAMP>_<description>.sql`.

```bash
npm run pgsql:migrate
```