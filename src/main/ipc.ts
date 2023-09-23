import { ipcMain } from "electron";
import { nvm } from "./services/nvm";
import { getSettings, setSettings, validateSettings } from "./services/settings";

export const initIPC = () => {
    ipcMain.handle('ping', () => 'pong');
    ipcMain.handle('nvm-version', () => nvm('--version'));
    ipcMain.handle('get-settings', () => getSettings());
    ipcMain.handle('set-settings', (_event, settings) => setSettings(settings));
    ipcMain.handle('validate-settings', (_event, settings) => validateSettings(settings));
};