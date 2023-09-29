import storage from 'node-persist';
import { exec } from 'child_process';
import fs from 'fs';
import { resolve as pathResolve } from 'path';
import { getSettings } from './settings';
import { sendOutput } from './output';
import { promisify } from 'util';
import { log } from './log';

const stat = promisify(fs.stat);
const open = promisify(fs.open);
const read = promisify(fs.read);

export const validatePathToFile = async (path: string): Promise<void> => {
    if (!path) return undefined;

    const stats = await stat(pathResolve(path))

    if (stats.isDirectory()) {
        throw new Error(`Path is a directory.`);
    }

    if (!stats.isFile()) {
        throw new Error(`Path is not a file.`);
    }
};

export const validateNVMPath = async (path: string): Promise<void> => {
    if (!path) return undefined;

    const result = await nvm('--version', path);
    if (result.error) {
        throw new Error(`Path is not a valid NVM installation.`);
    }
}

/**
 * invokes callback and returns error message as string if any error is thrown
 */
export const invokeWithError = async (callback: () => Promise<void>): Promise<string | undefined> => {
    try {
        await callback();
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
        return 'Unknown error.';
    }
}

const parsePlainVersions = (versions: string): string[] =>
    versions
        .split('\n')
        .filter(Boolean)
        .map(line => line.match(/.*(v\d+\.\d+\.\d+).*/))
        .map((match) => match && match[1] || '')

const parseRemoteVersions = (versions: string): TRemoteNodeVersion[] => {
    return versions.split('\n')
        .map(s => s.replace('->', ''))
        .map(s => s.trim())
        .filter(Boolean)
        .map(line => {
            const matchVersion = line.match(/.*(v\d+\.\d+\.\d+).*/);
            const matchCodename = line.match(/\(.*LTS:\s+(.*)\)/);
            const matchLatestLTS = line.match(/Latest LTS/);

            return {
                id: matchVersion && matchVersion[1] || '',
                codename: matchCodename && matchCodename[1],
                latestLTS: !!matchLatestLTS,
            };
        });
}

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

export const getLocalNodeVersions = async (): Promise<TInvokeResponse<TLocalNodeVersion[]>> => {
    try {
        const versionResponse = await getCurrentNodeVersion();
        if (versionResponse.error) return { error: versionResponse.error };

        const response = await nvm('ls --no-alias --no-colors');

        if (response.error) return { error: response.error };
        const versionsPlainList = parsePlainVersions(response.result || '');

        const versions = versionsPlainList.map(version => ({
            id: version,
            aliases: [],
        }));

        return { result: versions };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Unknown error.' };
    }
}

export const syncRemoteNodeVersions = async (): Promise<TInvokeResponse> => {
    const result = await nvm('ls-remote --no-colors > nvm-ls-remote.txt');
    storage.setItem('lastSync', Date.now());

    if (result.error) return { error: result.error };
    return { result: 'OK' };
};

export const getLastSync = async (): Promise<TInvokeResponse<number>> => {
    const lastSync = await storage.getItem('lastSync');
    return { result: lastSync || 0 };
}

export const getRemoteNodeVersions = async (): Promise<TInvokeResponse<TRemoteNodeVersion[]>> => {
    const { result: lastSync } = await getLastSync();
    if (!lastSync) {
        return { error: 'No remote versions available. Please sync first.' };
    }

    try {
        const file = await open(pathResolve('nvm-ls-remote.txt'), 'r');
        const data = await read(file);
        const versions = parseRemoteVersions(data.buffer.toString());
        return { result: versions };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Unknown error.' };
    }

}

export const install = async (version: string): Promise<TInvokeResponse> => {
    try {
        const result = await nvm(`install ${version}`);
        if (result.error) return { error: result.error };
        return { result: 'OK' };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Unknown error.' };
    }
};

export const uninstall = async (version: string): Promise<TInvokeResponse> => {
    try {
        const result = await nvm(`uninstall ${version}`);
        if (result.error) return { error: result.error };
        return { result: 'OK' };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Unknown error.' };
    }
};

export const nvm = async (params: string, customPath?: string): Promise<TInvokeResponse> => {
    const { nvmPath, shell, shellContext } = await getSettings();
    const path = customPath ?? nvmPath;
    if (!path) return { error: 'Path is not set.' };

    const cmd = `${shellContext ? `source ${shellContext};` : ''} nvm ${params}`;
    log({
        message: `Executing command: ${cmd}`,
        type: 'info',
    });

    return new Promise<TInvokeResponse>((resolve) => {
        try {
            const process = exec(cmd, { shell }, (error, stdout) => {
                if (error) {
                    resolve({ error: error.message });
                    sendOutput({
                        type: 'error',
                        message: error.message,
                        pid: process.pid,
                        command: cmd,
                    });
                    return;
                }
                resolve({ result: stdout });
                sendOutput({
                    type: 'info',
                    message: stdout,
                    pid: process.pid,
                    command: cmd,
                });
            });
        } catch (error) {
            let message = 'Unknown error.';
            if (error instanceof Error) {
                message = error.message;
                return { error: message };
            }
            sendOutput({
                type: 'error',
                message,
                pid: undefined,
                command: cmd,
            });
            return { error: message };
        }
    });
};
