import storage from 'node-persist';
import { invokeWithError, validateNVMPath, validatePathToFile } from './nvm';
import { filterTruthy } from '../func/filterTruthy';

export const getSettings = async (): Promise<TSettings> => {
    return {
        nvmPath: await storage.getItem('nvmPath'),
        shell: await storage.getItem('shell'),
        shellContext: await storage.getItem('shellContext'),
        debugMode: await storage.getItem('debugMode'),
    };
};

export const setSettings = async (settings: TSettings) => {
    const promises = [];
    try {
        const validation = await validateSettings(settings);
        for (const key in validation) {
            if (validation[key as keyof TSettings]) {
                return { error: `${key}: ${validation[key as keyof TSettings]}` };
            }
        }
    
        for (const key in settings) {
            promises.push(storage.setItem(key, settings[key as keyof TSettings]));
        }
        await Promise.all(promises);
        return {};    
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Unknown error.' };
    }
};

export const validateSettings = async (settings: TSettings): Promise<TSettingsValidation> => {
    return filterTruthy({
        nvmPath: await invokeWithError(async () => {
            await validatePathToFile(settings.nvmPath);
            await validateNVMPath(settings.nvmPath);
        }),
        shell: await invokeWithError(async () => {
            await validatePathToFile(settings.shell)
        }),
        shellContext: await invokeWithError(async () => {
            await validatePathToFile(settings.shellContext)
        }),
    });
};