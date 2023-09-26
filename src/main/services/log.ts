import { BrowserWindow } from "electron";
import { EVENTS } from "../../shared/const";

let browserWindow: BrowserWindow | undefined = undefined;

export const initLogIPC = (window: BrowserWindow) => {
    browserWindow = window;
}

export const log = (message: Pick<TLogMessage, 'message'|'type'>) => {
    browserWindow?.webContents.send(EVENTS.LOG, {
        ...message,
        timestamp: new Date().toISOString()
    });
};