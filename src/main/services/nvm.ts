import { exec } from 'child_process';
import fs from 'fs';
import { getSettings } from './settings';

export const validateNVMPath = async (path: string): Promise<string | undefined> => {
    if (!path) return undefined;

    return new Promise((resolve) => {
        fs.stat(path, async (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(`File does not exist.`)
                    return;
                }
                resolve(err.message);
                return;
            }

            if (stats.isDirectory()) {
                resolve(`Path is a directory.`);
                return;
            }

            if (!stats.isFile()) {
                resolve(`Path is not a file.`);
                return;
            }

            const result = await nvm('--version', path);

            if (result.error) {
                resolve(result.error);
                return;
            }

            resolve(undefined);
        });
    });
};

const parsePlainVersions = (versions: string): string[] =>
    versions
        .split('\n')
        .filter(Boolean)
        .map(line => line.match(/.*(v\d+\.\d+\.\d+).*/))
        .map((match) => match && match[1] || '')

export const getCurrentNodeVersion = async (): Promise<TInvokeResponse<string>> => {
    //TODO: check if current is set
    try {
        const response = await nvm('current');
        if (response.error) return { error: response.error };

        const version = (response.result || '').trim();
        return { result: version };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Unknown error.' };
    }
};

export const getLocalNodeVersions = async (): Promise<TInvokeResponse<TNodeVersion[]>> => {
    try {
        const versionResponse = await getCurrentNodeVersion();
        if (versionResponse.error) return { error: versionResponse.error };

        const currentVersion = versionResponse.result;
        const response = await nvm('ls --no-alias');

        if (response.error) return { error: response.error };
        const versionsPlainList = parsePlainVersions(response.result || '');

        const versions = versionsPlainList.map(version => ({
            id: version,
            aliases: [],
            current: version === currentVersion,
        }));

        return { result: versions };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Unknown error.' };
    }
}

export const useNodeVersion = async (version: string): Promise<TInvokeResponse> => {
    const response = await nvm(`use ${version}`);
    if (response.error) return { error: response.error };

    return {};
};

export const nvm = async (params: string, customPath?: string): Promise<TInvokeResponse> => {
    const path = customPath ?? (await getSettings()).nvmPath;
    if (!path) return { error: 'Path is not set.' };

    const cmd = `[ -s "${path}" ] && . "${path}"; nvm ${params}`;

    return new Promise<TInvokeResponse>((resolve) => {
        try {
            exec(cmd, (error, stdout) => {
                if (error) {
                    resolve({ error: error.message });
                    return;
                }
                resolve({ result: stdout });
            });
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }
            return { error: 'Unknown error.' };
        }
    });
};
