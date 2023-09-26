import { exec } from 'child_process';
import fs from 'fs';
import { resolve as pathResolve } from 'path';
import { getSettings } from './settings';
import { sendOutput } from './output';
import { promisify } from 'util';

const stat = promisify(fs.stat);

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

export const nvm = async (params: string, customPath?: string): Promise<TInvokeResponse> => {
    const { nvmPath, shell, shellContext } = await getSettings();
    const path = customPath ?? nvmPath;
    if (!path) return { error: 'Path is not set.' };

    const cmd = `${shellContext ? `source ${shellContext};` : ''} nvm ${params} --no-colors`;

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
