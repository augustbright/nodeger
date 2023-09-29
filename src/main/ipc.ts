import { ipcMain } from "electron";
import { getCurrentNodeVersion, getLastSync, getLocalNodeVersions, getRemoteNodeVersions, install, nvm, syncRemoteNodeVersions, uninstall } from "./services/nvm";
import { getSettings, setSettings, validateSettings } from "./services/settings";
import { API } from "../shared/const";

export const initIPC = () => {
    ipcMain.handle(API.PING, () => 'pong');
    ipcMain.handle(API.NVM.VERSION, () => getCurrentNodeVersion());
    ipcMain.handle(API.NVM.LS_LOCAL, () => getLocalNodeVersions());
    ipcMain.handle(API.NVM.LS_REMOTE, () => getRemoteNodeVersions());
    ipcMain.handle(API.NVM.SYNC, () => syncRemoteNodeVersions());
    ipcMain.handle(API.NVM.LAST_SYNC, () => getLastSync());
    ipcMain.handle(API.NVM.USE, (_event, version) => nvm(`alias default ${version}`));
    ipcMain.handle(API.NVM.INSTALL, (_event, version) => install(version));
    ipcMain.handle(API.NVM.UNINSTALL, (_event, version) => uninstall(version));
    ipcMain.handle(API.SETTINGS.GET, () => getSettings());
    ipcMain.handle(API.SETTINGS.SET, (_event, settings) => setSettings(settings));
    ipcMain.handle(API.SETTINGS.VALIDATE, (_event, settings) => validateSettings(settings));
};