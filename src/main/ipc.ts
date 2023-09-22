import { ipcMain } from "electron";

export const initIPC = () => {
    ipcMain.handle('ping', () => 'pong')
};