import * as nconf from 'nconf';
import * as path from 'path';
import * as fs from 'fs';

export function loadConfig<T>({ configPath = '' }: { configPath: string }): T {
    const appEnv = 'local';
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