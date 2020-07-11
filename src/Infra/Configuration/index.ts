import * as nconf from 'nconf';
import * as path from 'path';
import * as fs from 'fs';

const createEnv = () => {
    const name = (process.env.APP_ENV || 'development').toLowerCase();

    switch (name) {
        case 'production':
            return {
                name,
                alias: 'prod',
                [name]: true,
            };

        case 'staging':
            return {
                name,
                alias: 'staging',
                [name]: true,
            };

        default:
            // developer machine configuration
            return {
                name: 'local',
                alias: 'local',
                local: true,
            };
    }
};

export function loadConfig<T>({ configPath = '' }: { configPath: string }): T {
    const { alias: appEnv } = createEnv();
    const envVarsAppPrefix = 'app__';
    const rootPath = path.join(__dirname, configPath);
    if (!fs.existsSync(rootPath)) {
        throw new Error(`Configuration path not found: ${rootPath}`);
    }

    const config = nconf.env({
        separator: '__', // env vars should look like this: app__web__port=8080
        lowerCase: false, // avoid variable re-name (e.g. routePrefix to routeprefix)
        parseValues: true,
        transform: (item) => {
            if ((item.key || '').startsWith(envVarsAppPrefix)) {
                return {
                    ...item,
                    key: item.key.replace(envVarsAppPrefix, ''),
                };
            }
            return null;
        },
    })
        .file('secret', path.join(rootPath, 'secret.json'))
        .file('app-env', path.join(rootPath, `config.${appEnv}.json`))
        .file('common', path.join(rootPath, 'config.json'));

    return {
        ...config.get(),
        appEnv,
    }
}