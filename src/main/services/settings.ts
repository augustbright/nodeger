import storage from 'node-persist';
import { validateNVMPath } from './nvm';
import { filterTruthy } from '../func/filterTruthy';

export const getSettings = async (): Promise<TSettings> => {
    return {
        nvmPath: await storage.getItem('nvmPath'),
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
        return { error: error.message };
    }
};

export const validateSettings = async (settings: TSettings): Promise<TSettingsValidation> => {
    return filterTruthy({
        nvmPath: await validateNVMPath(settings.nvmPath),
    });
};