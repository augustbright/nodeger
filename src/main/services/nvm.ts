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
            resolve({ error: error.message });
        }
    });
};
