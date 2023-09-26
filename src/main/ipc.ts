import { ipcMain } from "electron";
import { getLocalNodeVersions, nvm } from "./services/nvm";
import { getSettings, setSettings, validateSettings } from "./services/settings";
import { API } from "../shared/const";

export const initIPC = () => {
    ipcMain.handle(API.PING, () => 'pong');
    ipcMain.handle(API.NVM.VERSION, () => nvm('--version'));
    ipcMain.handle(API.NVM.LS_LOCAL, () => getLocalNodeVersions());
    ipcMain.handle(API.NVM.USE, (_event, version) => nvm(`alias default ${version}`));
    ipcMain.handle(API.SETTINGS.GET, () => getSettings());
    ipcMain.handle(API.SETTINGS.SET, (_event, settings) => setSettings(settings));
    ipcMain.handle(API.SETTINGS.VALIDATE, (_event, settings) => validateSettings(settings));
};